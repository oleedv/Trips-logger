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
    IonToolbar
} from "@ionic/react";
import {useCamera} from "@capacitor-community/react-hooks/camera";
import {CameraResultType} from "@capacitor/core";
import {auth, storage} from "../utils/nhost";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";

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

const AddPost = () => {

    const {photo, getPhoto} = useCamera();
    const [insertPostMutation] = useMutation(INSERT_POST);
    const [title, setTitle] = useState<string>("")
    const [desc, setDesc] = useState<string>("")

    let ImageFilename = ""

    const triggerCamera = async () => {
        await getPhoto({
            resultType: CameraResultType.DataUrl,
            allowEditing: false,
            quality: 20,
        });
    };

    const uploadImage = async () => {
        ImageFilename = `${Date.now().toString()}.jpeg`;
        await storage.putString(`/public/${ImageFilename}`,
            (photo?.dataUrl as string), "data_url",
            null, (pe: ProgressEvent) => {
                console.log(pe.loaded)
            });
    }

    const InsertPost = async () => {
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

        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle slot="end">Add post</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <img alt="No photo" src={photo?.dataUrl}/>
                    <IonInput placeholder="Title" onIonInput={(e: any) => {setTitle(e.target.value)}}/>
                    <IonTextarea placeholder="Description" onIonInput={(e: any) => {setDesc(e.target.value)}}/>
                    <IonButton onClick={triggerCamera}>Take picture</IonButton>
                    <IonButton onClick={uploadImage}>Upload picture</IonButton>
                    <IonButton onClick={InsertPost}>Send Post</IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default AddPost;