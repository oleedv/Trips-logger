import React, {useState} from "react";
import {
    IonInput,
    IonItem,
    IonList,
    IonPage,
    useIonViewWillEnter,
    IonIcon,
    IonSpinner,
    IonToast,
    IonContent
} from "@ionic/react";
import {auth} from "../utils/nhost";
import {useHistory} from "react-router-dom";
import {arrowForwardCircle} from "ionicons/icons";
import {renderToStaticMarkup} from "react-dom/server";
import LoginBackground from "../components/LoginBackground";
import CenterContainer from "../components/styled/CenterContainer";
import PageTitle from "../components/styled/PageTitle";
import LoginCard from "../components/styled/LoginCard";
import LoginBtn from "../components/styled/LoginBtn";
import styled from "styled-components";

const loginBackgroundString = encodeURIComponent(renderToStaticMarkup(<LoginBackground/>))

const Login = () => {
    let history = useHistory();
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    //Check if user is trying to login or not
    const [isAuth, setIsAuth] = useState<boolean>(false);
    //for checking if username or password is incorrect, show toast
    const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

    const authUser = async () => {
        setIsAuth(true)
        try {
            await auth.login(emailAddress, password);
            setIsAuth(false)
            history.replace("/feed")
        } catch (e) {
            console.log(e) //Sends errors to object in console, todo add better feedback
            setIsAuth(false)
            setShowErrorToast(true)
        }
    }
// todo forelesning 7 35:18
    useIonViewWillEnter(() => {
        if (auth.isAuthenticated()) {
            history.replace("/feed")
        }
    });

    return (
        <IonPage>
            <IonContentStyled>
                <CenterContainer>
                    <PageTitle>Trip logger</PageTitle>
                    <LoginCard>
                        <IonList>
                            <IonItem>
                                <IonInput placeholder="Email"
                                          onIonInput={(e: any) => setEmailAddress(e.target.value)}/>
                            </IonItem>
                            <IonItem>
                                <IonInput placeholder="Password" type="password"
                                          onIonInput={(e: any) => setPassword(e.target.value)}/>
                            </IonItem>
                        </IonList>
                    </LoginCard>
                    <LoginBtn onClick={authUser}>
                        {
                            //if authing then show spinner if not show icon
                            isAuth ? <IonSpinner name="crescent"/> : <IonIcon icon={arrowForwardCircle}/>
                        }
                    </LoginBtn>
                </CenterContainer>
                <IonToast
                    isOpen={showErrorToast}
                    onDidDismiss={() => setShowErrorToast(false)}
                    message="Wrong username or password."
                    duration={2000}
                    color="warning"
                />
            </IonContentStyled>
        </IonPage>
    )
}

const IonContentStyled = styled(IonContent)`
    --background: none;
    background: url("data:image/svg+xml,${loginBackgroundString}") no-repeat fixed;
    background-size: cover;
`;

export default Login;