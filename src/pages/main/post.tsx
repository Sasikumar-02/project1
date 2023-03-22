import {Post as IPost} from "./main"
interface props {
    post: IPost;
}

export const Post =(props: props)=>{
    const {post} = props;
    return (
        <div>
            <div>
                <h1>{post.title}</h1>
            </div>
            <div>
                <p>{post.description}</p>
            </div>
            <div>
                <p>{post.username}</p>
            </div>
            <button> &#128077; </button>

        </div>
    )
}