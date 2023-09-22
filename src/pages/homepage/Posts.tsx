import {Post as IPost} from './Home'
import './Posts.css'
interface Props  {
    posts: IPost;
}

export const Posts = (props: Props) => {
    const {posts} = props
    return <div className='card'>
        <div className='container'>
            <div className='title'>
                <h2>{ posts.title}</h2>
            </div>
            <div className='body'>
                {posts.description}
            </div>
            <div className='footer'>
                <p>
                    @{posts.userName}
                </p>
            </div>
        </div>
    </div>
}
