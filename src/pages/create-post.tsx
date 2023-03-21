import { useForm} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {db} from "../config/firebase";
import {addDoc, collection} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../config/firebase";
import { useNavigate } from "react-router-dom";
interface CreateForm {
    title: string,
    description: string,
}
export const CreatePost =()=>{
    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
    })
    const {register, handleSubmit, formState:{ errors }} = useForm<CreateForm>({
        resolver: yupResolver(schema)
    })
    const [user]= useAuthState(auth);
    const postRef = collection(db, "posts");
    const navigate = useNavigate();
    const onCreatePost = async (data: CreateForm)=>{
        await addDoc (postRef, {
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid
        })
        navigate("/");
    }

    return (
    <form onSubmit={handleSubmit(onCreatePost)}>
    <input placeholder="title..." {...register("title")}/>
    <p>{errors.title?.message}</p>
    <textarea placeholder="description..." {...register("description")}/>
    <p>{errors.description?.message}</p>
    <input type="submit"/>
    </form>
    );
}