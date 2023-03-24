import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import {Post as IPost} from "./main";
interface props {
    post: IPost;
}
interface Like {
    likeId: string;
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
        setLikes(data.docs.map((doc)=>({userId: doc.data().userId, likeId: doc.id})));
        //setLike(data.docs.length)
    };
    const addLike = async() =>{
        try{
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid, 
                postId: post.id
            });
            if(user){
                setLikes((prev)=>prev ? [...prev, {userId:user.uid, likeId: newDoc.id}]: [{userId: user.uid, likeId: newDoc.id}]);
            };
        } catch(err) {
            console.log(err);
        }   
    };

    const removeLike = async() =>{
        try{
            const liketoDeleteQuery = query(likesRef, where("postId","==", post.id), where("userId", "==", user?.uid));
            const likeToDeleteData = await getDocs(liketoDeleteQuery);
            const likeId=likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);
            // if(user){
            //     setLikes((prev)=>prev ? [...prev, {userId:user.uid}]: [{userId: user.uid}]);
            // }; 
            if(user){
                setLikes((prev)=> prev && prev.filter((like)=>like.likeId !== likeId) );
            }; 
            } catch(err) {
            console.log(err);
        }   
    };

    const hasUserLiked = likes?.find((like)=> like.userId===user?.uid);
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
            <button onClick={hasUserLiked ? removeLike: addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</> }  </button>
            {likes && <p>Likes: {likes?.length}</p>}

        </div>
    )
}