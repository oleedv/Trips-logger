import React, {useState} from 'react';
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
    IonBackButton, IonFooter, IonInput, IonItemDivider, IonTextarea, IonButton, IonAvatar
} from "@ionic/react";
import PostCard from "../components/PostCardx";
import IPost from "../models/IPost";
import {gql} from "@apollo/client/core";
import {useMutation, useQuery} from "@apollo/client";
import ICommentList from "../models/ICommentList";
import LoginCard from "../components/styled/LoginCard";
import styled from "styled-components";
import {auth} from "../utils/nhost";
import IonChipStyled from "../components/styled/IonChipStyled";

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

const INSERT_COMMENT = gql`
mutation InsertComment($comment: comments_insert_input!) {
  insert_comments_one(object: $comment) {
    text
    user_id
    post_id
  }
}

`;

const DetailView = (props: any) => {
    const [insertCommentMutation] = useMutation(INSERT_COMMENT);
    const [comment, setComment] = useState<string>("")
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

    const InsertComment = async () => {
      try {
          await insertCommentMutation({
              variables: {
                  comment: {
                    text: comment,
                    user_id: auth.getClaim(`x-hasura-user-id`),
                    post_id: post.id
                  }
              }
          })
          window.location.reload();
      }  catch(e) {
        console.warn(e)
      }
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/feed"/>
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
                                        <IonItem>
                                            <IonAvatar>
                                                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                                            </IonAvatar>
                                            <h2>{comment.user.display_name}</h2>
                                        </IonItem>
                                        <p>{comment.text}</p>
                                    </IonLabel>
                                </IonItem>
                            ))}
                    </IonList>
                </IonCard>
            </IonContent>
            <IonFooter>
                <IonItemStyled>
                    <IonInput placeholder="Write comment..." onIonInput={(e: any) => {setComment(e.target.value)}}/>
                    <IonButton onClick={InsertComment}>Submit</IonButton>
                </IonItemStyled>
            </IonFooter>
        </IonPage>
    )
}

const IonItemStyled = styled(IonItem)`
    border: 1px solid grey;
    // --background: none;
    // background-color: grey;
`;
export default DetailView;