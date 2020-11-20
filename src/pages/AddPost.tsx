import React from "react";
import {IonButton, IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";

const AddPost = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add post</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonButton>Take picture</IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default AddPost;