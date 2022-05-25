import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import IndexPage from '../pages/index';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import NotFoundPage from '../pages/404';
import FoodPage from '../pages/Food';
import ViewPost from '../pages/food/ViewPost';
import AboutPage from '../pages/About';
import MyAccSettings from '../pages/account/Settings';
import Profile from '../pages/account/Profile';
import UsersList from '../pages/UsersList';
import CreatePost from '../pages/food/CreatePost';
import EditPost from '../pages/food/EditPost';
import MediaPage from '../pages/Media';
import Contact from '../pages/Contact';

const Routing = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth")); // default value comes from localStorage

  return (
    <Routes>
      <Route exact path="/" element={<IndexPage/>} />
      {isAuth ?? <Route exact path="/login" element={<LoginPage setAuth={setIsAuth}/>} />}
      {isAuth ?? <Route exact path="/register" element={<RegisterPage setAuth={setIsAuth}/>} />}
      {isAuth && <Route exact path="/create-food-post" element={<CreatePost isAuth={isAuth}/>} />}
      {isAuth && <Route exact path="/edit/:title" element={<EditPost isAuth={isAuth}/>} />}
      <Route exact path="/food" element={<FoodPage/>} />
      <Route path="/food/:title" element={<ViewPost isAuth={isAuth}/>} />
      <Route exact path="/about" element={<AboutPage/>} />
      <Route exact path="/account/:username" element={<Profile isAuth={isAuth}/>} />
      {isAuth && <Route exact path="/account/settings" element={<MyAccSettings setAuth={setIsAuth}/>} />}
      <Route exact path="/users" element={<UsersList/>} />
      <Route exact path="/media" element={<MediaPage/>} />
      <Route exact path="/contact" element={<Contact/>} />

      <Route path="" element={<NotFoundPage/>} />
      <Route path="*" element={<NotFoundPage/>} />
      <Route exact path="/404" element={<NotFoundPage/>} />
      <Route element={<NotFoundPage/>} />
    </Routes>
  );
}

export default Routing;
