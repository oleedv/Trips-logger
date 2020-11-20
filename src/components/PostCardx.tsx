import React from 'react';
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import IPost from "../models/IPost";

const PostCard = ({description, id, title, user}: IPost) => {
    return (
        <IonCard>
            <img alt="Placeholder"
                 src={"https://images.unsplash.com/photo-1605616008746-5e6cc857a72a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"}/>
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
        </IonCard>
    )
};

export default PostCard;
