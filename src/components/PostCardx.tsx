import React from 'react';
import {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonChip, IonContent,
    IonFooter, IonItem, IonNote
} from "@ionic/react";
import IPost from "../models/IPost";
import styled from "styled-components";

const PostCard = ({description, id, title, user, created_date, image_filename}: IPost) => {
    return (
        <IonCard>
                <IonChipStyled>
                <IonAvatar>
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonAvatar>
                <IonCardSubtitle>
                    @ {user.display_name}
                </IonCardSubtitle>
                </IonChipStyled>
            <img src={`https://backend-ytb9qog2.nhost.app/storage/o/public/${image_filename}`}/>
            <IonCardContent>
                    <IonCardSubtitle>
                                Uploaded {created_date}
                    </IonCardSubtitle>
                <IonCardTitle>
                    {title}
                </IonCardTitle>
                <IonNote slot="end">{description}</IonNote>
            </IonCardContent>
        </IonCard>
    )
};

const IonChipStyled = styled(IonChip)`
    background-color: transparent;
`;



export default PostCard;
