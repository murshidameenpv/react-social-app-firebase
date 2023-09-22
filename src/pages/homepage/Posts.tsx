import { addDoc,getDocs,deleteDoc, collection,query, where, doc } from 'firebase/firestore';
import {Post as IPost} from './Home'
import './Posts.css'
import { db ,auth} from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

//setting the incoming pros data types reffred from previos props
interface Props  {
    post: IPost;
}
interface Like{
    likeId:string,
    userId:string
}
    export const Posts = (props: Props) => {
        const { post } = props;
    
        //it gives a bunch of information including current userId
        const [user] = useAuthState(auth);
        //to set the like count on ui
        const [likes, setLike] = useState<Like[] | null>(null);

        //this is the reference to the firestore database
        const likesCollectionRef = collection(db, "likes");
        
        //querying liked post
        const likesDoc = query(likesCollectionRef, where("postId", "==", post.id));
        const getLikes = async () => {
            const data = await getDocs(likesDoc);
            setLike(data.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id})))
            
        }
        //adding like to the likes collection
        //also changing the ui like button to unlike button forcefull it is called optimistic rendering
        const addLike = async () => {
            try {

              const newDoc=  await addDoc(likesCollectionRef, {
                userId: user?.uid,
                postId: post.id,
            });
            if (user) {
                setLike((prev) => prev ? [...prev, { userId: user.uid,likeId:newDoc.id }] : [{ userId: user.uid,likeId:newDoc.id }]);
                
            }  
            }catch(error){
                console.error(error);
                
            }      
 
    }
    //   //remove like
        const removeLike = async () => {
            try {
                //getting the specific like document
                const likeToDeleteQuery = query(likesCollectionRef, where("postId", "==", post.id),
                    where("userId", "==", user?.uid));
                //getting data from that specific  document to get the id of the document
                const likeToDeleteData = await getDocs(likeToDeleteQuery)
                const likeId = likeToDeleteData.docs[0].id;
                //put inside the doc function and delete it
                const likeToDelete = doc(db, "likes",likeId);
                await deleteDoc(likeToDelete);
                if (user) {
                    setLike((prev) => prev &&  prev.filter((like)=>like.likeId!==likeId));   
                }  
            }catch(error){
                console.error(error);
                
            }      
 
        }
              const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
        useEffect(() => {
            getLikes()
        }, []);
   

        return <div className='card'>
            <div className='container'>
                <div className='title'>
                    <h2>{ post.title}</h2>
                </div>
                <div className='body'>
                    {post.description}
                </div>
                <div className='footer'>
                    <p>
                        @{post.userName}
                    </p>
                    <button className='like-button' onClick={hasUserLiked ? removeLike : addLike}>{""}{hasUserLiked ? <>&#128078;</> : <>&#128077; </>}{""}</button>
                </div>
                       {likes && <div className='like-count'> {likes?.length} Likes</div>} 
            </div>
        </div>
    }
