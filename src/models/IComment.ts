interface IComment {
    user: {
        display_name: string
    },
    text: string,
    date: string,
    profileImageURL?: any;
}

export default IComment;