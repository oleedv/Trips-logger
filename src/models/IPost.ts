import IComment from "./IComment";

interface IPost {
    id: number,
    title: String,
    description: String,
    image_filename: String,
    created_date: String,
    user: {
        display_name: String;
    },
    // likes: number
    //comments: IComment[];
};

export default IPost;