import React, {useState} from "react";
import {
    IonInput,
    IonPage,
    useIonViewWillEnter,
    IonIcon,
    IonSpinner,
    IonContent,
    IonButton,
    IonTitle,
    IonList,
    IonItem,
    IonToast,
    IonCardTitle,
    IonCardSubtitle,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton
} from "@ionic/react";
import {auth} from "../utils/nhost";
import {useHistory} from "react-router-dom";
import {arrowForwardCircle, personAddOutline} from "ionicons/icons";
import {renderToStaticMarkup} from "react-dom/server";
import LoginBackground from "../components/LoginBackground";
import CenterContainer from "../components/styled/CenterContainer";
import PageTitle from "../components/styled/PageTitle";
import LoginCard from "../components/styled/LoginCard";
import LoginBtn from "../components/styled/LoginBtn";
import styled from "styled-components";
import * as Yup from "yup";

const loginBackgroundString = encodeURIComponent(renderToStaticMarkup(<LoginBackground/>))

const Login = () => {
    let history = useHistory();
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    //Check if user is trying to login or not
    const [isAuth, setIsAuth] = useState<boolean>(false);
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
            setShowErrorToast(true);
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
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContentStyled scrollY={false}>
                <CenterContainer>
                    <PageTitle>Trip logger</PageTitle>
                    <LoginCard>
                        <IonListStyled>
                            <IonItemStyled>
                                <IonInput placeholder="Email"
                                          onIonInput={(e: any) => setEmailAddress(e.target.value)}
                                value="test@test.com"/>
                            </IonItemStyled>
                            <IonItemStyled>
                                <IonInput placeholder="Password" type="password"
                                          onIonInput={(e: any) => setPassword(e.target.value)}
                                value="123"/>
                            </IonItemStyled>
                        </IonListStyled>
                        <LoginBtn onClick={authUser}>
                            {
                                isAuth ?
                                    <IonSpinner name="crescent"/> :
                                    <IonIcon icon={arrowForwardCircle}/>
                            }
                        </LoginBtn>
                    </LoginCard>
                    <IonButtonStyled routerLink="/signup">
                        Sign up <IonIconStyled icon={personAddOutline}  />
                    </IonButtonStyled>
                </CenterContainer>
                <IonToast
                    isOpen={showErrorToast}
                    onDidDismiss={() => setShowErrorToast(false)}
                    message="Wrong username or password"
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
const IonIconStyled = styled(IonIcon)`
    padding-left: 2%;
`;
const IonButtonStyled = styled(IonButton)`
    --background: #2A3C24;
    margin: 0;
`;
const IonItemStyled = styled(IonItem)`
    --background: none;
`;
const IonListStyled = styled(IonList)`
    background-color: transparent;
`;


export default Login;