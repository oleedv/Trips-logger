import React, {useState} from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonPage,
    IonTextarea,
    IonTitle,
    IonToolbar,
    IonProgressBar,
    IonLabel,
    IonToast, IonRange, IonItem, IonIcon
} from "@ionic/react";
import {useCamera} from "@capacitor-community/react-hooks/camera";
import {CameraResultType} from "@capacitor/core";
import {auth, storage} from "../utils/nhost";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import LoginCard from "../components/styled/LoginCard";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import INSERT_POST from "../queries/INSERT_POST";
import {cameraOutline, logOutOutline} from "ionicons/icons";
import IonButtonStyled from "../components/styled/IonButtonStyled";

// Formik
const useImageUpload = () => {
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const startUploading = async ({base64string, filenameWithExtension}:{base64string:string, filenameWithExtension:string}) => {
        try{
            await storage.putString(`/public/${filenameWithExtension}`,
                base64string, "data_url", null, (pe: ProgressEvent) => {
                setUploadProgress((pe.loaded / pe.total) * 100);
            });
        } catch(e){
            console.warn(e)
        }
    };
    return{
        uploadProgress,
        startUploading
    }
};


const NewTrip = () => {
    let history = useHistory();
    const {photo, getPhoto} = useCamera();
    const [insertPostMutation] = useMutation(INSERT_POST);
    const [title, setTitle] = useState<string>("")
    const [desc, setDesc] = useState<string>("")
    const [ImageFilename, setImageFilename] = useState<string>("")
    const {startUploading, uploadProgress} = useImageUpload();
    const [submittedCheck, setsubmittedCheck] = useState<boolean>(false)


    const triggerCamera = async () => {
        await getPhoto({
            resultType: CameraResultType.DataUrl,
            allowEditing: false,
            quality: 20,
        });
        setImageFilename(`${Date.now().toString()}.jpeg`)
    };

    const InsertPost = async () => {
        if (photo?.dataUrl){
            await startUploading({
                base64string: photo.dataUrl,
                filenameWithExtension: ImageFilename
            })
        } else {
            alert("Please take a photo!")
        }
        try {
            await insertPostMutation({
                variables: {
                    post: {
                        title: title,
                        description: desc,
                        image_filename: ImageFilename,
                        user_id: auth.getClaim(`x-hasura-user-id`)
                    }
                }
            })
        } catch (e) {
            console.warn(e)
        }
        //after everything is sent
        setsubmittedCheck(true)
        history.replace("/feed")
    }


    const ratingCounter = () => {
      let counter = 1;

    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add post</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/feed"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonProgressBar value={uploadProgress}/>
                <LoginCard>
                    <img src={photo?.dataUrl}/>
                    <IonLabel>Title</IonLabel>
                    <IonInput onIonInput={(e: any) => {setTitle(e.target.value)}}/>
                    <IonLabel>Description</IonLabel>
                    <IonTextareaStyled onIonInput={(e: any) => {setDesc(e.target.value)}}/>

                        <IonRange min={1} max={10} step={1} snaps={true} color="secondary" />

                    <IonButtonStyled onClick={triggerCamera}>
                        <IonIcon icon={cameraOutline}/>
                    </IonButtonStyled>
                    <IonButton type="submit" onClick={InsertPost}>Publish</IonButton>

                </LoginCard>
                <IonToast
                    isOpen={submittedCheck}
                    onDidDismiss={() => setsubmittedCheck(false)}
                    message="Post sumbitted"
                    duration={2000}
                    color="success"
                />
            </IonContent>
        </IonPage>
    );
}

const IonTextareaStyled = styled(IonTextarea)`
    height: 100px;
`;
const IonItemStyled = styled(IonItem)`
    --background: none;
`;

export default NewTrip;