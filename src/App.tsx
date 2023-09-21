import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import{Home} from './pages/Home'
import { Login } from './pages/Login'
import { Navbar } from './components/Navbar'
import { Createpost } from './pages/create-post/CreatePost';
function App() {
  return (
    <div className="App">
      <Router>  
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/createpost" element={<Createpost/>} />
        </Routes>
     </Router>
    </div>
  );
}

export default App;
