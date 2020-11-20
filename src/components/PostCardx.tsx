import React from 'react';
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonFooter} from "@ionic/react";
import IPost from "../models/IPost";

const PostCard = ({description, id, title, user, created_date, image_filename}: IPost) => {
    return (
        <IonCard>
            <img alt="Placeholder"
                 src={`https://backend-ytb9qog2.nhost.app/storage/o/public/${image_filename}`}/>
            <IonCardHeader>
                <IonCardSubtitle>
                    @ {user.display_name} &bull; ? likes // todo likes!
                </IonCardSubtitle>
                <IonCardTitle>
                    {title}
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {description}
            </IonCardContent>
            <IonFooter>
                <IonCardSubtitle>
                   Uploaded at {created_date}
                </IonCardSubtitle>
            </IonFooter>
        </IonCard>
    )
};

export default PostCard;
