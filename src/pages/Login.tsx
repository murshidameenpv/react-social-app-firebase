import { auth, provider } from '../config/firebase';
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import './Login.css'

export const Login = () => {
    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider)
        console.log(result);
        navigate('/')
        
    }
    return <div className="signin-card">
    <h1>Sign In with Google</h1>
    <button className="google-signin-btn" onClick={signInWithGoogle}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
        <span>Sign In with Google</span>
    </button>
</div>
}