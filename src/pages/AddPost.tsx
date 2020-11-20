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
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default AddPost;