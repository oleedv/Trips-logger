import gql from "graphql-tag";

const INSERT_POST = gql`
    mutation InsertPost($post: posts_insert_input!) {
  insert_posts_one(object: $post){
    title
    user_id
    description
    image_filename
  }
}
`;

export default INSERT_POST;