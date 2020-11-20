import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons, IonLabel
} from '@ionic/react';
import React from 'react';
import {Link} from "react-router-dom";
import PostCard from "../components/PostCardx";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import IPostList from "../models/IPostList";

const GET_POSTS = gql`
query MyQuery {
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


const Home = () => {
    const {loading, data} = useQuery<IPostList>(GET_POSTS);
    if (loading) {
        return <IonLabel>Laster..</IonLabel>
    }
    if (data) {
        console.log(data)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Trips app</IonTitle>
                    <IonButtons slot="end">
                        <IonButton>
                            +
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

export default Home;
