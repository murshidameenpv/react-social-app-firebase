import {getDocs,collection} from 'firebase/firestore';
import {db} from '../../config/firebase'
import { useEffect, useState } from 'react';
import { Posts } from './Posts';      

//here we must define the data type that we are going to get from firestore ts syntax
export interface Post {
    id: string,
    userId: string,
    title: string,
    description: string,
    userName:string
}

export const Home = () => {
    const [postsList, setPostList] = useState<Post[] | null>(null);
    const postsCollectionRef = collection(db, "posts");
    const getPosts = async () => {
        const data = await getDocs(postsCollectionRef)
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
        
    };
    useEffect(() => {
        getPosts();
    }, []);
   
    
    return <div>
        {postsList?.map((post) =>(
            <Posts posts={post}/>
       ))}
    </div>
}