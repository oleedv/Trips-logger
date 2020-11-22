import {gql} from "@apollo/client/core";

const INSERT_COMMENT = gql`
mutation InsertComment($comment: comments_insert_input!) {
  insert_comments_one(object: $comment) {
    text
    user_id
    post_id
  }
}

`;

export default INSERT_COMMENT;