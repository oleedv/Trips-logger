interface IComment {
    user: {
        display_name: String
    },
    text: String,
    date: String,
    profileImageURL?: any;
}

export default IComment;