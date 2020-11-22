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
import {useMutation, useSubscription} from "@apollo/client";
import ICommentList from "../models/ICommentList";
import styled from "styled-components";
import {auth} from "../utils/nhost";
import {trashBinOutline} from "ionicons/icons";
import {useHistory} from "react-router-dom";
import INSERT_COMMENT from "../queries/INSERT_COMMENT";
import DELETE_POST from "../queries/DELETE_POST";
import GET_COMMENTS from "../queries/GET_COMMENTS";

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