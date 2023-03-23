import { addDoc, getDocs, collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import {Post as IPost} from "./main";
interface props {
    post: IPost;
}
interface Like {
    userId: string;
}
export const Post =(props: props)=>{
    const {post} = props;
    const [user]= useAuthState(auth);
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));
    const [likes, setLikes] = useState<Like[] | null>(null);
    const getLikes = async()=>{
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=>({userId: doc.data().userId})));
        //setLike(data.docs.length)
    };
    const addLike = async() =>{
        await addDoc(likesRef, {userID: user?.uid, postId: post.id});
    };
    const hasUserLiked = likes?.find
    useEffect(()=>{
        getLikes();
    }, []);
    return (
        <div>
            <div>
                <h1>{post.title}</h1>
            </div>
            <div>
                <p>{post.description}</p>
            </div>
            <div>
                <p>@{post.username}</p>
            </div>
            <button onClick={addLike}> &#128077; </button>
            {likes && <p>Likes: {likes?.length}</p>}

        </div>
    )
}