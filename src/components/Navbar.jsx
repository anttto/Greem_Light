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
      console.log(user);
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
    <header className='flex justify-between border-b border-gray-300 items-center'>
        <h1>
            <Link to="/" className='flex items-center justify-start text-4xl text-brand'>
                <AiOutlineShop/>
                SHOP DSE
            </Link>
        </h1>
        <nav className='flex justify-start items-center gap-4 font-semibold'>
            <Link to="/products">Products</Link>
            {user && user.uid === adminId ? <div><Link to="/cart"><SlBasket/></Link><Link to="/products/new"><BsFillPencilFill/></Link></div> : null}
            {user && <User user={user}/>} 
            {!user && <button onClick={handleLogin} className='p-4 bg-orange-500'>Login</button>}
            {user && <button onClick={handleLogout}>Logout</button>}
        </nav>
    </header>
  );
}
