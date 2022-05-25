import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import logo from '../assets/images/logo.png';

import '../styles/header.scss';

const Header = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [user] = useState(JSON.parse(localStorage.getItem("authUser")));

  const handleSignOut = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
    localStorage.removeItem("authUser");
    localStorage.clear();
  };

  return (
    <header className="header clearfix">
      <div className="logo-container">
        <a href="/" className="logo">
          <img src={logo} alt="RP Tools logo" />
          <span className='logo-text'>CareFood</span>
        </a>
      </div>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <FontAwesomeIcon className="navicon" icon={solid('bars')} size="1x" />
      </label>
      <ul className="menu">
        <li>
          <Link className="menu_item" to="/">
            <FontAwesomeIcon className="icon_menu_li" icon={solid('house')} size="1x"/>
            Home
          </Link>
        </li>
        <li className="dropdown">
          {
            isAuth ? (
              <Link className="menu_item" to={`/account/${user.username}`}>
                <FontAwesomeIcon className="icon_menu_li" icon={solid('user')} size="1x"/>
              Account
              </Link>
            )
              :
              <Link className="menu_item" to="/login">
                <FontAwesomeIcon className="icon_menu_li" icon={solid('user')} size="1x"/>
                Account
              </Link> 
          }

          <ul className="dropdown-content">            
            { 
              isAuth ?    
                (
                  <>
                    <li>
                      <Link to="/create-food-post">
                        <FontAwesomeIcon className="icon_menu_li" icon={solid('circle-plus')} size="1x" />
                        Post food
                      </Link>
                    </li>
                    <li>
                      <Link to="/account/settings">
                        <FontAwesomeIcon className="icon_menu_li" icon={solid('user-gear')} size="1x" />
                        Settings
                      </Link>
                    </li>
                    <li>
                      <a href="/" onClick={() => handleSignOut()}>
                        <FontAwesomeIcon className="icon_menu_li" icon={solid('link-slash')} size="1x" />
                        Log out
                      </a>
                    </li>
                  </>
                )
                :
                (
                  <>
                    <li>
                      <Link to="/login">
                        <FontAwesomeIcon className="icon_menu_li" icon={solid('right-to-bracket')} size="1x" />
                          Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register">
                        <FontAwesomeIcon className="icon_menu_li" icon={solid('user-plus')} size="1x" />
                        Register
                      </Link>
                    </li>
                  </>
                )
            }
          </ul>
        </li>
        <li>
          <Link className="menu_item" to="/food">
            <FontAwesomeIcon className="icon_menu_li" icon={solid('utensils')} size="1x"/>
            Food
          </Link>
        </li>
        <li>
          <Link className="menu_item" to="/media">
            <FontAwesomeIcon className="icon_menu_li" icon={solid('book-open')} size="1x"/>
            Media
          </Link>
        </li>
        <li>
          <Link className="menu_item" to="/users">
            <FontAwesomeIcon className="icon_menu_li" icon={solid('users')} size="1x" />
            Users
          </Link>
        </li>
        <li>
          <Link className="menu_item" to="/about">
            <FontAwesomeIcon className="icon_menu_li" icon={solid('circle-info')} size="1x" />
            About us
          </Link>
        </li>
        <li>
          <Link className="menu_item" to="/contact">
            <FontAwesomeIcon className="icon_menu_li" icon={solid('envelope')} size="1x" />
            Contact
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;