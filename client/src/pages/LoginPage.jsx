import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import { useNavigate} from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";


export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const { setUser } = useContext(UserContext);


  const instance = axios.create({
    baseURL: 'http://localhost:4000'
  });


  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    try {

      const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });

      if (res.status === 404) {
        window.alert("user not found");
      } else {
        setUser(res.data);
        alert('Login successful');
        navigate('/');
      }

    } catch (e) {
      alert('Login failed');
    }
  }
  const signInWithGoogle = async () => 
  {
    

    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("http://localhost:4000/api/auth/gauth", {
            name: result.user.displayName,
            email: result.user.email,
            password:'gauth'
          },{
            headers:{
              "Conent-Type":"application/json"
            },
            withCredentials:true,
                  })
          .then((res) => {

            setUser(res.data);
            
            navigate("/")

          });
      })
      .catch((error) => {
        alert("Login Failed")
        console.log(error);
      });
  };


  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email"
            placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)} />
          <div className="w-full border my-1 rounded-2xl">
            <input style={{ width: '95%', backgroundColor: 'white', borderRadius: '15px' }} className="py-2 px-3 "
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              value={password}
              onChange={ev => setPassword(ev.target.value)} />
            <button type="button" style={{ backgroundColor: 'white', width: '5%' }} onClick={handleShowPassword}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>

          </div>
          <button className="primary">Login</button>
      
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
          <h1 className="bold text-center"> Or</h1>
        </form>
          <button className="primary " style={{backgroundColor:'#6495ED'}} onClick ={signInWithGoogle}>Login with Google</button>
      </div>
    </div>
  );
}