import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {signOut} from 'firebase/auth'
import './Navbar.css'

export const Navbar = () => {
    const [user] = useAuthState(auth)
   
    const signUserOut = async () => {
        await signOut(auth);
    }
    return <div className="navbar">
        <div className='links'>
            <Link to="/">Home</Link>
            {user ? (
                <>
                    <Link to="/createpost">Create post</Link>
                    <button onClick={signUserOut}>Logout</button>

                </>
            ) : (
                <>
                    <Link to="login">Login</Link>
                </>
            )}
        </div>
        {user && ( //if the user exist then show this div else hide this div
            <div className="user-info">
                <p>{user?.displayName}</p>
                <img src={user?.photoURL || ""} width="80" height="80" alt="img" />
            </div>
        )}
    </div>
}