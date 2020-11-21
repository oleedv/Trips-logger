import React, {useState} from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader, IonInput,
    IonPage, IonTextarea,
    IonTitle,
    IonToolbar,
    IonProgressBar,
    IonLabel, IonToast
} from "@ionic/react";
import {useCamera} from "@capacitor-community/react-hooks/camera";
import {CameraResultType} from "@capacitor/core";
import {auth, storage} from "../utils/nhost";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import LoginCard from "../components/styled/LoginCard";
import styled from "styled-components";

const INSERT_POST = gql`
    mutation InsertPost($post: posts_insert_input!) {
  insert_posts_one(object: $post){
    title
    user_id
    description
    image_filename
  }
}
`;
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


const AddPost = () => {

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
        setsubmittedCheck(true)
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add post</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"/>
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
                    <IonButton onClick={triggerCamera}>Photo</IonButton>
                    <IonButton onClick={InsertPost}>Submit</IonButton>

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

export default AddPost;