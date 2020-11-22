import React from 'react';
import {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle, IonHeader,
    IonNote
} from "@ionic/react";
import IPost from "../models/IPost";
import IonChipStyled from "./styled/IonChipStyled";
import {Link} from "react-router-dom";
import IonCardStyled from "./styled/IonCardStyled";

const PostCard = ({description, title, user, created_date, image_filename}: IPost) => {
    return (
        <IonCardStyled>
            <IonHeader>
                {
                    <IonChipStyled>
                        <IonAvatar>
                            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                        </IonAvatar>
                        <IonCardSubtitle>
                            @ {user.display_name}
                        </IonCardSubtitle>
                    </IonChipStyled>
                }
            </IonHeader>
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
        </IonCardStyled>
    )
};

export default PostCard;
