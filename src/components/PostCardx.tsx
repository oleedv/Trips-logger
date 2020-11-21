import React from 'react';
import {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonNote
} from "@ionic/react";
import IPost from "../models/IPost";
import IonChipStyled from "./styled/IonChipStyled";
import {Link} from "react-router-dom";

const PostCard = ({description, title, user, created_date, image_filename}: IPost) => {
    return (
        <IonCard>
            <Link style={{textDecoration: "none"}} to={{pathname: `/profile`}}>
                <IonChipStyled>
                <IonAvatar>
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonAvatar>
                <IonCardSubtitle>
                    @ {user.display_name}
                </IonCardSubtitle>
                </IonChipStyled>
                </Link>
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

export default PostCard;
