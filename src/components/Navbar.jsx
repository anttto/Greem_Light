import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShop } from 'react-icons/ai';
import { SlBasket } from 'react-icons/sl';
import { BsFillPencilFill } from 'react-icons/bs';
<<<<<<< HEAD
import { getData, login, logout, onUserStateChange } from '../api/firebase';
=======
import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';
>>>>>>> 5acc4fb1ba4c5632919fba5c0f9a0a23742a4813


export default function Gnb() {
  const [user, setUser] = useState(null);
  const [adminId, setAdminId] = useState(null);

  useEffect(()=>{
    onUserStateChange((user)=>{
      console.log(user);
      setUser(user);

      if (user) {
        getData().then((userId)=>{
          // console.log(userId);
          // console.log(user.uid);
          // setAdminId(userId.filter(t => t.id === user.uid));
          // userId.map(t => console.log(t.id));
          // console.log(userId.id);
          setAdminId(userId.id);
          // setAdminId(userId.filter(t => t === user.displayName));
          // userId.filter(uid => uid === user.uid );
          
          // setAdminId(userId);
          // console.log(userId);
          // console.log(user.displayName);
          // setAdminId(userId.filter(uid => uid === user.uid)); 
          // const aaa = userId.filter(uid => uid === user.displayName);
          // setAdminId(aaa);
          // console.log(userId);

        });
      }
    });
  }, []);

  const handleLogin =() =>{
    login().then(user=>{
      // console.log(user);
      return setUser(user);
    });
  }
  const handleLogout =() =>{
    logout().then(user=>setUser(user));
  }
  return (
<<<<<<< HEAD
    <header className='flex justify-between border-b border-gray-300 items-center'>
=======
    <header className='flex justify-between border-b border-gray-300 py-2 px-4'>
>>>>>>> 5acc4fb1ba4c5632919fba5c0f9a0a23742a4813
        <h1>
            <Link to="/" className='flex items-center justify-start text-4xl text-brand'>
                <AiOutlineShop/>
                SHOP DSE
            </Link>
        </h1>
        <nav className='flex justify-start items-center gap-4 font-semibold'>
            <Link to="/products">Products</Link>
<<<<<<< HEAD
            { user && user.uid === adminId ? <><Link to="/cart"><SlBasket/></Link><Link to="/products/new"><BsFillPencilFill/></Link></> : null}
            {user && <img src={user.photoURL} referrerPolicy='no-referrer'/>}
            {!user && <button onClick={handleLogin} className='p-4 bg-orange-500'>Login</button>}
=======
            <Link to="/cart"><SlBasket/></Link>       
            <Link to="/products/new"><BsFillPencilFill/></Link>
            
            {user && <User user={user}/>} 
            {!user && <button onClick={handleLogin}>Login</button>}
>>>>>>> 5acc4fb1ba4c5632919fba5c0f9a0a23742a4813
            {user && <button onClick={handleLogout}>Logout</button>}
        </nav>
    </header>
  );
}
