import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShop } from 'react-icons/ai';
import { SlBasket } from 'react-icons/sl';
import { BsFillPencilFill } from 'react-icons/bs';
import { getData, login, logout, onUserStateChange } from '../api/firebase';
import User from './User';

export default function Gnb() {
  const [user, setUser] = useState(null);
  const [adminId, setAdminId] = useState(null);

  useEffect(()=>{
    onUserStateChange((user)=>{
      setUser(user);
      if (user) {
        getData().then((userId)=>{
          setAdminId(userId.id);
        });
      }
    });
  }, []);

  const handleLogin =() =>{
    login().then(user=>{
      return setUser(user);
    });
  }
  const handleLogout =() =>{
    logout().then(user=>setUser(user));
  }
  return (
    <header className='flex justify-between border-b border-gray-300 items-center py-2 px-2'>
        <h1>
            <Link to="/" className='flex items-center justify-start text-4xl text-brand'>
                <AiOutlineShop/>
                SHOP DSE
            </Link>
        </h1>
        <nav className='flex justify-start items-center gap-4 font-semibold'>
            <Link to="/products">Products</Link>
            {user && <Link to="/cart"><SlBasket/></Link>} 
            {user && user.uid === adminId ? <Link to="/products/new"><BsFillPencilFill/></Link> : null}
            {user && <User user={user}/>} 
            {!user && <button onClick={handleLogin} className='px-4 py-2 bg-orange-500 text-white rounded-full'>Login</button>}
            {user && <button onClick={handleLogout} className='px-4 py-2 bg-gray-400 text-white rounded-full'>Logout</button>}
        </nav>
    </header>
  );
}
