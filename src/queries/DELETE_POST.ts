import {gql} from "@apollo/client/core";

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

export default DELETE_POST;