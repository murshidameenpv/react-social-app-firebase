import { useForm } from 'react-hook-form';
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { db,auth} from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'
import './CreateForm.css'
/**
 * This code is for a form submission in React using the react-hook-form library, yup for form validation,
 *  and @hookform/resolvers to integrate yup with react-hook-form.
 */

interface CreateFormData {//typescript syntax assertion,IT  DEFINES THE SHAPE OF THE FORM DATA
    title: string,
    description:string,
}

export const CreateForm = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description"), });
   
    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    });
    
    //this is the reference to the firestore database
    const postsCollectionRef = collection(db,"posts")
    
    const onCreatePost = async (data: CreateFormData) => {
        /*  title: data.title,
            description: data.description,
            userName: user?.displayName,
            id:user?.uid    (Both are same)
        */
        await addDoc(postsCollectionRef, {
           ...data,
            userName: user?.displayName,
            userId:user?.uid,
        })
        navigate("/")
 
    }

    return <div className="create-post-form">
        <h1>Create a Post</h1>
        <form onSubmit={handleSubmit(onCreatePost)}>
           
            {/*the register function is like name attribute in html
            the register function is used to register each input field with the form. It also specifies validation rules for each field 
            (e.g., required: true and pattern: /^\S+@\S+$/i).
             If a field doesn’t meet its validation rules, an error message is displayed.
            This makes it easy to manage form state and validate form inputs without having to write a lot of boilerplate code.*/}
           
            <input type="text" placeholder='Title...' {...register("title")} /> 
            <p>{errors.title?.message }</p>
            <textarea placeholder='Description' {...register("description")} />
            <p>{errors.description?.message }</p>
            <input type="submit" />
        </form>
    </div>
}