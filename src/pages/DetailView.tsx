import React from 'react';
import {
    IonCard,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton
} from "@ionic/react";
import PostCard from "../components/PostCardx";
import IPost from "../models/IPost";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import ICommentList from "../models/ICommentList";

const GET_COMMENTS = gql`
 query getCommentsByPostID($post_id: Int!) {
   posts_by_pk(id: $post_id) {
     comments {
       text
       user {
         display_name
       }
     }
   }
} 
`;

const DetailView = (props: any) => {

    const post: IPost = props.location?.state?.post;

    const {loading, data} = useQuery<ICommentList>(GET_COMMENTS, {
        variables: {
            post_id: post?.id
        },
        fetchPolicy: "no-cache"
    });

    if (!post) {
        return <div>Error: No post! (DetailView.tsx: 35)</div>;
    }
    if (loading) {
        return <IonLabel>Loading comments..</IonLabel>
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="primary">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>Detail view</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <PostCard {...post}/>
                <IonCard>
                    <IonList>
                        {
                            data?.posts_by_pk.comments?.map((comment, i) => (
                                <IonItem key={i}>
                                    <IonLabel>
                                        <h2>{comment.user.display_name}</h2>
                                        <p>{comment.text}</p>
                                    </IonLabel>
                                </IonItem>
                            ))}
                    </IonList>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}
export default DetailView;