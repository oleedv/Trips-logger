import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonLabel,
    IonIcon, IonCard
} from '@ionic/react';
import React from 'react';
import {Link, useHistory} from "react-router-dom";
import PostCard from "../components/PostCardx";
import {useSubscription} from "@apollo/client";
import IPostList from "../models/IPostList";
import {addCircleOutline, logOutOutline, personOutline} from "ionicons/icons";
import {auth} from "../utils/nhost";
import styled from "styled-components";
import GET_POSTS from "../queries/GET_POST";
import IonButtonStyled from '../components/styled/IonButtonStyled';



const Feed = () => {
    let history = useHistory();
    const {loading, data} = useSubscription<IPostList>(GET_POSTS);
    if (loading) {
        return <IonLabel>Loading..</IonLabel>
    }
    // if (data) {
    //     console.log(data)
    // }

    const logout = async () => {
         try {
             await auth.logout();
             history.replace("/login")
         } catch (e) {
            console.log(e)
         }
    };

    return (
        <IonPageStyled>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonButtonStyled slot="start" onClick={logout}>
                            <IonIcon icon={logOutOutline}/>
                        </IonButtonStyled>
                    </IonButtons>
                    <IonTitle>Trips app</IonTitle>
                    <IonButtons slot="end">
                        <IonButtonStyled>
                            <IonIcon icon={personOutline}/>
                        </IonButtonStyled>
                        <IonButton routerLink="/newtrip">
                            <IonIcon icon={addCircleOutline}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {
                    data?.posts.map(post => (
                        <Link key={post.id} style={{textDecoration: "none"}} to={{
                            pathname: `/detailView/${post.id}`,
                            state: {post} // post:post -- Sends the card data with the link
                        }}>
                            <PostCard {...post} />
                        </Link>
                    ))
                }
            </IonContent>
        </IonPageStyled>
    );
};
const IonPageStyled = styled(IonPage)`
    --ion-background-color:#111D12;
`;

export default Feed;
