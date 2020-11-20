import React from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {useCamera} from "@capacitor-community/react-hooks/camera";
import {CameraResultType} from "@capacitor/core";
import {storage} from "../utils/nhost";

const AddPost = () => {

    const {photo, getPhoto} =useCamera();

    const triggerCamera = async () => {
        await getPhoto({
            resultType: CameraResultType.DataUrl,
            allowEditing: false,
            quality: 100,
            correctOrientation: true,
            promptLabelHeader: "Test"
        });
    };

    const uploadImage = async () => {
      await storage.putString(`/public/testImage.jpeg`, photo?.dataUrl as string,
          "data_url", null, (pe: ProgressEvent) => {
            console.log(pe.loaded)
          })
    };

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
                    <img alt="PWA" src={photo?.dataUrl}/>
                    <IonButton onClick={triggerCamera}>Take picture</IonButton>
                    <IonButton onClick={uploadImage}>Upload picture</IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default AddPost;