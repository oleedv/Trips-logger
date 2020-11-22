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
    IonBackButton, IonFooter, IonInput, IonItemDivider, IonTextarea, IonButton, IonAvatar, IonIcon
} from "@ionic/react";
import PostCard from "../components/PostCardx";
import IPost from "../models/IPost";
import {gql} from "@apollo/client/core";
import {useMutation, useQuery, useSubscription} from "@apollo/client";
import ICommentList from "../models/ICommentList";
import LoginCard from "../components/styled/LoginCard";
import styled from "styled-components";
import {auth} from "../utils/nhost";
import IonChipStyled from "../components/styled/IonChipStyled";
import {trashBinOutline} from "ionicons/icons";
import {useHistory} from "react-router-dom";

const GET_COMMENTS = gql`
 subscription getCommentsByPostID($post_id: Int!) {
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

const DELETE_POST = gql`
  mutation DeletePost($post_id: Int!) {
    delete_comments (
      where: {
        post_id: {
          _eq: $post_id
        }
      }
    ) {
      affected_rows
    }
    delete_posts_by_pk (
      id: $post_id
    ) { id }
  }
`;

const DetailView = (props: any) => {
    let history = useHistory();
    const [insertCommentMutation] = useMutation(INSERT_COMMENT);
    const [comment, setComment] = useState<string>("")
    const post: IPost = props.location?.state?.post;
    const [deletePostMutation] = useMutation(DELETE_POST);

    const {loading, data} = useSubscription<ICommentList>(GET_COMMENTS, {
        variables: {
            post_id: post?.id
        },
        fetchPolicy: "no-cache"
    });

    if (!post) {
        return <div>Error: No post! (DetailView.tsx: 60)</div>;
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
      }  catch(e) {
        console.warn(e)
      }
    };

    const deletePost = async () => {
        try {
            await deletePostMutation({
                variables: {
                    post_id: post.id
                }
            });
            history.replace("/feed")
        } catch (e) {
            console.warn(e);
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
                    {
                        post.user.id === auth.getClaim('x-hasura-user-id') &&
                        <IonButtons slot="end">
                            <IonButton onClick={deletePost}>
                                <IonIcon color="danger" icon={trashBinOutline} />
                            </IonButton>
                        </IonButtons>
                    }
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