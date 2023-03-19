import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShop } from 'react-icons/ai';
import { SlBasket } from 'react-icons/sl';
import { BsFillPencilFill } from 'react-icons/bs';
import { login, logout, onUserStateChange } from '../api/firebase';


export default function Gnb() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    onUserStateChange((user)=>{
      setUser(user);
    });
  }, []);

  const handleLogin =() =>{
    login().then(user=>setUser(user));
  }
  const handleLogout =() =>{
    logout().then(user=>setUser(user));
  }
  return (
    <header className='flex justify-between border-b border-gray-300'>
        <h1>
            <Link to="/" className='flex items-center justify-start text-4xl text-brand'>
                <AiOutlineShop/>
                SHOP DSE
            </Link>
        </h1>
        <nav className='flex justify-start items-center gap-4 font-semibold'>
            <Link to="/products">Products</Link>
            <Link to="/cart"><SlBasket/></Link>       
            <Link to="/products/new"><BsFillPencilFill/></Link>
            
            {/* {user && user.displayName} */}
            {!user && <button onClick={handleLogin}>Login</button>}
            {user && <button onClick={handleLogout}>Logout</button>}
        </nav>
    </header>
  );
}
