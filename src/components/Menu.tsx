import React from "react";
import {IonMenu, IonToolbar, IonHeader, IonContent, IonList, IonItem, IonTitle} from "@ionic/react";

const Menu = () => {
    return (
        <IonMenu side="start" menuId="first">
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Start Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>Menu Item</IonItem>
                    <IonItem>Menu Item</IonItem>
                    <IonItem>Menu Item</IonItem>
                    <IonItem>Menu Item</IonItem>
                    <IonItem>Menu Item</IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    )
    
}
export default Menu;