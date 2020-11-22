// import React from "react";
import * as React from 'react'
import {
    IonBackButton,
    IonButton, IonButtons,
    IonCard,
    IonCardContent, IonCardHeader,
    IonCardSubtitle, IonCardTitle,
    IonContent,
    IonHeader, IonIcon, IonInput, IonItem,
    IonPage, IonSpinner,
    IonTitle, IonToast,
    IonToolbar
} from "@ionic/react";
import CenterContainer from "../components/styled/CenterContainer";
import SignupForm from "../components/SignupForm";
import styled from "styled-components";
import {useState} from "react";
import {arrowForwardCircle, personAddOutline} from "ionicons/icons";
import LoginBtn from "../components/styled/LoginBtn";
import LoginCard from "../components/styled/LoginCard";
import {auth} from "../utils/nhost";
import {useHistory} from "react-router-dom";
import {renderToStaticMarkup} from "react-dom/server";
import LoginBackground from "../components/LoginBackground";
import SignupBackground from "../components/SignupBackground";

const signupBackgroundString = encodeURIComponent(renderToStaticMarkup(<SignupBackground/>))

const Signup = () => {
    let history = useHistory();
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

    const registerUser = async () => {
        try {
            await auth.register(emailAddress, password);
            history.replace("/login")
        } catch (exception) {
            console.log(exception)
            setShowErrorToast(true);
        }
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Sign up
                    </IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/feed"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContentStyled fullscreen>
                <CenterContainer>
                    <IonCard>
                        <IonCardContent>
                            <IonItemStyled>
                                <IonInput placeholder="Epostadresse"
                                          onIonInput={(e: any) => setEmailAddress(e.target.value)}/>
                            </IonItemStyled>
                            <IonItemStyled>
                                <IonInput placeholder="Passord" type="password"
                                          onIonInput={(e: any) => setPassword(e.target.value)}/>
                            </IonItemStyled>
                        </IonCardContent>
                        <LoginBtn onClick={registerUser}>
                            <IonIcon icon={arrowForwardCircle}/>
                        </LoginBtn>
                    </IonCard>
                </CenterContainer>
                <IonToast
                    isOpen={showErrorToast}
                    onDidDismiss={() => setShowErrorToast(false)}
                    message="Failed to register user"
                    duration={2000}
                    color="warning"
                />
            </IonContentStyled>
        </IonPage>
    )
};
const IonContentStyled = styled(IonContent)`
    --background: none;
    background: url("data:image/svg+xml,${signupBackgroundString}") no-repeat fixed;
    background-size: cover;
`;

const IonItemStyled = styled(IonItem)`
    --background: none;
`;
export default Signup;