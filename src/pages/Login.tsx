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
import {Formik} from "formik";
import * as Yup from "yup";

const loginBackgroundString = encodeURIComponent(renderToStaticMarkup(<LoginBackground/>))

const Login = () => {
    let history = useHistory();
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    //Check if user is trying to login or not
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const authUser = async () => {
        setIsAuth(true)
        try {
            await auth.login(emailAddress, password);
            setIsAuth(false)
            history.replace("/feed")
        } catch (e) {
            console.log(e) //Sends errors to object in console, todo add better feedback
            setIsAuth(false)
        }
    }
// todo forelesning 7 35:18
    useIonViewWillEnter(() => {
        if (auth.isAuthenticated()) {
            history.replace("/feed")
        }
    });

    let validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Must be a valid email address")
            .max(255, "Must be shorter than 255 chars")
            .required("Must enter a email"),
        password: Yup.string()
            .min(6, "Too short")
            .max(255, "Must be shorter than 255 chars")
            .required("Must enter a password")
    })

    return (
        <IonPage>
            <IonContentStyled>
                <CenterContainer>
                    <PageTitle>Trip logger</PageTitle>
                    <LoginCard>
                        <div>
                            <h1>Login</h1>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        alert(JSON.stringify(values, null, 2));
                                        setSubmitting(false);
                                    }, 400);
                                }}
                            >
                                {({
                                      values,
                                      errors,
                                      touched,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      isSubmitting,
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <IonInput
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            placeholder="Email"
                                            onIonInput={(e: any) => setEmailAddress(e.target.value)}
                                        />
                                        {errors.email && touched.email && errors.email}
                                        <IonInput
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            placeholder="Password"
                                            onIonInput={(e: any) => setPassword(e.target.value)}
                                        />
                                        {errors.password && touched.password && errors.password}
                                        <LoginBtn type="submit" disabled={isSubmitting} onClick={authUser}>
                                            {
                                                //if authing then show spinner if not show icon
                                                isAuth ? <IonSpinner name="crescent"/> : <IonIcon icon={arrowForwardCircle}/>
                                            }
                                        </LoginBtn>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </LoginCard>
                </CenterContainer>*/}
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