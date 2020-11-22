import {gql} from "@apollo/client/core";

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

export default GET_COMMENTS;