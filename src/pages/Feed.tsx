import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonLabel,
    IonIcon
} from '@ionic/react';
import React from 'react';
import {Link, useHistory} from "react-router-dom";
import PostCard from "../components/PostCardx";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import IPostList from "../models/IPostList";
import {exitOutline} from "ionicons/icons";
import {auth} from "../utils/nhost";
import Menu from "../components/Menu";

const GET_POSTS = gql`
query {
  posts {
    id
    title
    description
    image_filename
    created_date
    user {display_name}
  }
}
`;


const Feed = () => {
    let history = useHistory();
    const {loading, data} = useQuery<IPostList>(GET_POSTS);
    if (loading) {
        return <IonLabel>Loading..</IonLabel>
    }
    if (data) {
        console.log(data)
    }

    const logout = async () => {
         try {
             await auth.logout();
             history.replace("/login")
         } catch (e) {
            console.log(e)
         }
    };


    return (



        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <Menu/>

                    <IonTitle slot="primary">Trips app</IonTitle>
                    {/*<IonButtons onClick={logout}>*/}
                    {/*    <IonIcon icon={exitOutline}/>*/}
                    {/*</IonButtons>*/}
                    <IonButtons slot="end">
                        <IonButton routerLink="/newtrip">
                            Add trip
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
        </IonPage>
    );
};

export default Feed;
