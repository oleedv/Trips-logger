import IComment from "./IComment";

interface IPost {
    id: number,
    title: string,
    description: string,
    image_filename: string,
    created_date: string,
    user: {
        display_name: string,
        id: string
    },
    // likes: number
    //comments: IComment[];
};

export default IPost;