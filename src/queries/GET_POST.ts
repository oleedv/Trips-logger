import {gql} from "@apollo/client/core";

const GET_POSTS = gql`
subscription {
  posts {
    id
    title
    description
    image_filename
    created_date
    user {id display_name}
  }
}
`;

export default GET_POSTS;