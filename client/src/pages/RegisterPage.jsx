import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
export default function RegisterPage() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const instance = axios.create({
    baseURL: 'http://localhost:4000'
  });


  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await instance.post('api/auth/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (

    <div className="mt-4 grow flex items-center justify-around">
     
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text"
                 placeholder="John Doe"
                 value={name}
                 onChange={ev => setName(ev.target.value)} />
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <div  className="w-full border my-1 rounded-2xl">

          <input style={{width:'95%' , backgroundColor:'white' , borderRadius:'15px'}} className ="py-2 px-3 "
                 type={showPassword ? 'text' : 'password'}
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
             <button type="button" style={{backgroundColor:'white' , width:'5%' }} onClick={handleShowPassword}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
          
            </div>
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}