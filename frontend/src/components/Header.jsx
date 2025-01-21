import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';


const Header = () => {

  const {logout} = useLogout();
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return(
    <div className='navbar'>
      <ul className='navlinks'>
          <li className='link'><Link to='/' title='Home'>Transport App</Link></li>
      </ul>
      
      {user &&(
        <ul className='navlinks'>  
        
          <li><Link to='/about' title='About'>About</Link></li>
          <li><Link to='/booking' title='Booking'>Booking</Link></li>
          <li><Link onClick={handleClick} title='Logout'><LogoutIcon/></Link></li>
        </ul>

      )}
      

      {!user && (
      <ul className='navlinks'>
        <li><Button  variant="outlined"><Link to='/Sign-Up' title='SignUp'>Sign Up</Link></Button></li>
        <li><Link to='/Login' title='Login'><LoginIcon style={{fontSize:45}}/></Link></li>
      </ul>
      )}
    </div>
  )

};

export default Header;