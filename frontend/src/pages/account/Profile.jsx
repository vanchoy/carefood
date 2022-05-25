import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import '../../styles/form.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro';

import { userlist, postslist } from '../../api/ApiService';
import CoverPhoto from '../../components/CoverPhoto';
import Avatar from '../../components/Avatar';
import ButtonArrow from '../../components/buttons/ButtonArrow';
import { ButtonRegular } from '../../components/buttons/ButtonRegular';
import { buttonColor, whiteRegular } from '../../constants/styles';
import Notification from '../../components/Notification';
import LoaderAnimation from '../../components/LoaderAnimation';
import gridColumns from '../../js/gridColumns';
import { executeScroll } from '../../js/scroll';

const PublicProfileSection = styled.section`
  /* ====== SECTION SETTINGS ====== */
    /* ~  (Section Syle)  ~ */
      --section-bg-s1-margin: 0 auto;
      --section-bg-s1-min_height: 90vh;
      --section-bg-s1-max_height: auto;
      --section-bg-s1-padding: 20px;
      --section-bg-s1-bg_color: #e9e9e9;
      --section-bg-s1-bg_image: none;
      --section-bg-s1-bg_attachment: none;
      --section-bg-s1-bg_position: relative;
      --section-bg-s1-bg_repeat: none;
      --section-bg-s1-bg_blend_mode: none;
      --section-bg-s1-bg_size: border-box;
      --section-bg-s1-box_shadow: none;
    /* ----------~(end)~---------- */

    /* ~  (Section Title)  ~ */
      h1 {
        --section-text-margin: 0 auto;
        --section-text-padding: 20px 20px 0 20px;
        --section-text-display: block;
        --section-text-color: #000;
        --section-font_family: "Public Sans", sans-serif;
        --section-font_size: 36px;
        --section-font_weight: bold;
        --section-font_style: normal;
        --section-text_align: center;
        --section-text_decoration: none;
        --section-text_shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        --section-text-line_height: 1.5;
      }
    /* ----------~(end)~---------- */

    /* ~  (Section SubTitle)  ~ */  
      h2 {
        --section-text-margin: 0 auto;
        --section-text-padding: 0 20px;
        --section-text-display: block;
        --section-text-color: #83BD75;
        --section-font_family: inherit;
        --section-font_size: 18px;
        --section-font_weight: normal;
        --section-font_style: oblique;
        --section-text_decoration: none;
        --section-text_align: center;
        --section-text_shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
        --section-text-line_height: 1.3;
      }
    /* ----------~(end)~---------- */

    /* ~  (Section H3 Style)  ~ */
      h3 {
        --section-text-margin: 0 auto;
        --section-text-padding: 20px;
        --section-text-display: block;
        --section-text-color: #000;
        --section-font_family: inherit;
        --section-font_size: 20px;
        --section-font_weight: bold;
        --section-font_style: normal;
        --section-text_decoration: none;
        --section-text_align: left;
        --section-text_shadow: 1px 1px 1px #d2d2d2;
        --section-text-line_height: 1.5;
      }
    /* ----------~(end)~---------- */
    
    /* ~  (Section Paragraph Style)  ~ */
      p {
        --section-text-margin: 0 auto;
        --section-text-padding: 20px;
        --section-text-display: block;
        --section-text-color: #000;
        --section-font_family: inherit;
        --section-font_size: 16px;
        --section-font_weight: normal;
        --section-font_style: normal;
        --section-text_decoration: none;
        --section-text_align: center;
        --section-text_shadow: none;
        --section-text-line_height: 1.5;
      }
    /* ----------~(end)~---------- */

    /* ~  (Section Anchor Style)  ~ */
      a {
        --section-text-margin: 0 auto;
        --section-text-padding: none;
        --section-text-display: inline-block;
        --section-text-color: #5C5D5D;
        --section-font_family: inherit;
        --section-font_size: inherit;
        --section-font_weight: normal;
        --section-font_style: normal;
        --section-text_align: center;
        --section-text_shadow: 1px 1px 1px #d2d2d2;
        --section-text-line_height: 1.5;
        --section-text_decoration: underline;

        &:hover {
          --section-text-hover-color: #990000;
        }
      }
    /* ----------~(end)~---------- */  

  /* For more settings go to ["styles/index.scss"] */
  /* =================|END|================= */
`;

const ProfileForm = styled.div`
  /* ====== PROFILE FORM STYLE ====== */
    border-radius: 60px;
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 0 3px 1px rgba(0,0,0,0.03);
    backdrop-filter: blur(16px);

    /* ~  (Form Settings)  ~ */
      --ctc-form-width: 100%;
      --ctc-form-max_width: 700px;
      --ctc-form-height: auto;
      --ctc-form-margin: 0 auto;
      --ctc-form-text-align: center;
      --ctc-form-bg-color: rgba(255, 255, 255, 0.6);
      --ctc-form-padding: 0;
    /* ----------~(end)~---------- */

    .button-pos {
      margin: 10px 10px 20px 10px !important;
    }

    .user {
      margin: -20px 0 0 0;
    }

    /* ~ (User details overlay settings) ~ */
        .overlay {
            width: 100%;
            height: 250px;
            margin: -45px auto;
            position: relative;
            z-index: 1;
        }
    /* ----------~(end)~---------- */ 

    /* ~ (User details settings) ~ */
        .user-details-container {
            width: 100%;
            height: 42px;
            background-color: rgba(0,0,0,0.6);
            color: #fff;
            font-size: 14px;
            text-align: left;
            padding: 10px 20px;
            position: relative;
            z-index: 9;

            .user-details {
                margin: 10px;
            }
        }
    /* ----------~(end)~---------- */ 

    .contact-icons {
        margin: 10px;
        color: ${buttonColor}
    }

    .go-back-button {
      margin: 5px !important;
      position: absolute;
      z-index: 9;
    }
    
  /* =================|END|================= */
`;

const SoMeLinkStyle = styled.a`
    text-decoration: none;
    color: inherit;
    text-align: right;

    &:hover {
      color: ${(props) => props.colorHover};
    }
`;

const FoodSection = styled.section`
  /* ====== SECTION SETTINGS ====== */
    /* ~  (Section Syle)  ~ */
      --section-bg-s1-margin: 0 auto;
      --section-bg-s1-min_height: auto;
      --section-bg-s1-max_height: auto;
      --section-bg-s1-padding: 20px;
      --section-bg-s1-bg_color: #e9e9e9;
      --section-bg-s1-bg_image: none;
      --section-bg-s1-bg_attachment: none;
      --section-bg-s1-bg_position: relative;
      --section-bg-s1-bg_repeat: none;
      --section-bg-s1-bg_blend_mode: none;
      --section-bg-s1-bg_size: border-box;
      --section-bg-s1-box_shadow: none;
    /* ----------~(end)~---------- */

    /* ~  (Section Title)  ~ */
      h1 {
        --section-text-margin: 0 auto;
        --section-text-padding: 40px 20px 10px 20px;
        --section-text-display: block;
        --section-text-color: #000;
        --section-font_family: inherit;
        --section-font_size: 36px;
        --section-font_weight: bold;
        --section-font_style: normal;
        --section-text_align: center;
        --section-text_decoration: none;
        --section-text_shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        --section-text-line_height: 1.5;
      }
    /* ----------~(end)~---------- */

    /* ~  (Section SubTitle)  ~ */  
      h2 {
        --section-text-margin: 0 auto;
        --section-text-padding: 0 20px 40px 20px;
        --section-text-display: block;
        --section-text-color: #999;
        --section-font_family: inherit;
        --section-font_size: 20px;
        --section-font_weight: normal;
        --section-font_style: oblique;
        --section-text_decoration: none;
        --section-text_align: center;
        --section-text_shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
        --section-text-line_height: 1.3;
      }
    /* ----------~(end)~---------- */

    /* ~  (Section H3 Style)  ~ */
      h3 {
        --section-text-margin: 0 auto;
        --section-text-padding: 20px 20px 0 20px;
        --section-text-display: block;
        --section-text-color: #000;
        --section-font_family: "Public Sans", sans-serif;
        --section-font_size: 30px;
        --section-font_weight: bold;
        --section-font_style: normal;
        --section-text_align: center;
        --section-text_decoration: none;
        --section-text_shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        --section-text-line_height: 1.5;
      }
    /* ----------~(end)~---------- */
    
    /* ~  (Section Paragraph Style)  ~ */
      p {
        --section-text-margin: 0 auto;
        --section-text-padding: 20px;
        --section-text-display: block;
        --section-text-color: #000;
        --section-font_family: inherit;
        --section-font_size: 16px;
        --section-font_weight: normal;
        --section-font_style: normal;
        --section-text_decoration: none;
        --section-text_align: center;
        --section-text_shadow: none;
        --section-text-line_height: 1.5;
      }
    /* ----------~(end)~---------- */

    /* ~  (Section Anchor Style)  ~ */
      a {
        --section-text-margin: 0 auto;
        --section-text-padding: none;
        --section-text-display: inline-block;
        --section-text-color: #5C5D5D;
        --section-font_family: inherit;
        --section-font_size: inherit;
        --section-font_weight: normal;
        --section-font_style: normal;
        --section-text_align: center;
        --section-text_shadow: 1px 1px 1px #d2d2d2;
        --section-text-line_height: 1.5;
        --section-text_decoration: underline;

        &:hover {
          --section-text-hover-color: #990000;
        }
      }
    /* ----------~(end)~---------- */ 
    
    .user-item-pos {
      margin: 10px !important;
    }

    .dashed-line {
      width: 100%;
      border-bottom: 2px dashed #e0e0e0;
    }
  /* For more settings go to ["styles/index.scss"] */
  /* =================|END|================= */
`;

const FoodForm = styled.div`
  /* ====== PROFILE FORM STYLE ====== */
    border-radius: 60px;
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 0 3px 1px rgba(0,0,0,0.03);
    backdrop-filter: blur(16px);

    /* ~  (Form Settings)  ~ */
      --ctc-form-width: 100%;
      --ctc-form-max_width: 100%;
      --ctc-form-height: 100%;
      --ctc-form-margin: 20px auto;
      --ctc-form-text-align: center;
      --ctc-form-bg-color: rgba(255, 255, 255, 0.69);
      --ctc-form-padding: 0;
    /* ----------~(end)~---------- */

    .button-pos {
      margin: 10px !important;
      display: inline-block !important;
    }   
  /* =================|END|================= */
`;

const Profile = ({isAuth}) => {
  const [userAuthenticated] = useState(JSON.parse(localStorage.getItem("authUser")));
  const userPath = window.location.pathname.split('/');
  const [notificationType, setNotificationType] = useState('');
  const [notificationText, setNotificationText] = useState('');
  const [user, setUser] = useState();
  const [editProfile, setEditProfile] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [uid, setUid] = useState();
  const [deletePost, setDeletePost] = useState(false);
  const foodListRef = useRef(0);

  //get user data
  const getUser = async () => {
    const url = `${userlist}?username=${userPath[2]}`;
    const response = await fetch(url);
    const responseData = await response.json();
  
    if (responseData.data.length === 1) {
      setUser(responseData.data[0]);
      setUid(responseData.data[0].id)
  
      if (responseData.data[0].username === userAuthenticated.username) {
        setEditProfile(true);
        setEditPost(true);
        setDeletePost(true);
      }
    }
    else {
      navigate('/404');
    }
  };

  const getUserPosts = async () => {
    const url = `${postslist}?id=${uid}`;
    
    const response = await fetch(url);
    const responseData = await response.json();
    //console.log(responseData)

    if (responseData.data) {
      setPosts(responseData.data);
    }
  };

  const showUser = () => {
    
    return (
      <ProfileForm className="grid form">
        <CoverPhoto className="grid-col-all" imgSrc={user.coverImage} title="User cover photo" >
          <div className="overlay">
            <div className="user-details-container">
              {
                user.city && (
                  <>
                    <FontAwesomeIcon icon={solid('location-dot')} size="xl" />
                    <span className="user-details">{user.city}</span>
                  </>
                )
              }
              { user.ytUsername && <SoMeLinkStyle colorHover="#FF0000" href={`https://www.youtube.com/channel/${user.ytUsername}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-fw" pull="right" icon={brands('youtube')} size="xl" /></SoMeLinkStyle>}
              { user.twUsername && <SoMeLinkStyle colorHover="#1DA1F2" href={`https://twitter.com/${user.twUsername}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-fw" pull="right" icon={brands('twitter')} size="xl" /></SoMeLinkStyle> }
              { user.igUsername && <SoMeLinkStyle colorHover="#8a3ab9" href={`https://www.instagram.com/${user.igUsername}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-fw" pull="right" icon={brands('instagram')} size="xl" /></SoMeLinkStyle>}  
              { user.fbUsername && <SoMeLinkStyle colorHover="#00acee" href={`https://facebook.com/${user.fbUsername}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-fw" pull="right" icon={brands('facebook')} size="xl" /></SoMeLinkStyle>}    
            </div>   
            <div className="go-back-button left">
              <ButtonRegular type="button" onClick={() => navigate(-1)} btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnWidth="auto" btnPadding="13px" btnBorderRadius="50%">
                <FontAwesomeIcon pull="center" icon={solid('circle-chevron-left')} size="1x" />
              </ButtonRegular>  
            </div>   
          </div>
        </CoverPhoto>
        <Avatar className="grid-col-all" imgSrc={user.image} title="User profile photo" />
        <div className="grid-col-all user">
          <h1>
            {user.name}
          </h1>
          <h2>
            {user.username}
          </h2>
        </div>      
        <div className="grid-col-all">
          <p>{user.bio}</p>
        </div>
        { 
          isAuth ? 
            (
              <>
                <>
                  <div className="grid-col-all">
                    <p>
                      <span className="contact-icons">
                        <FontAwesomeIcon icon={solid('phone')} size="1x" />
                      </span>
                    Phone: {user.phone}</p>
                  </div>
                  <div className="grid-col-all">
                    <p>
                      <span className="contact-icons">
                        <FontAwesomeIcon icon={solid('envelope-open-text')} size="1x" />
                      </span>
                      E-mail: {user.mail}
                    </p>
                  </div>
                </>
                <>
                  {
                    editProfile === true ?
                      (
                        <div className="grid-col-all button-pos">
                          <ButtonRegular type="button" linkRef="/account/settings" btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Edit profile">
                            <FontAwesomeIcon pull="right" icon={solid('pen-to-square')} size="1x" />
                          </ButtonRegular>
                        </div>
                      )
                      :
                      (
                        <div className="grid-col-all button-pos">
                          <ButtonRegular type="button" onClick={() => executeScroll(foodListRef)} btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="See posts">
                            <FontAwesomeIcon pull="right" icon={solid('circle-chevron-down')} size="1x" />
                          </ButtonRegular>
                        </div>
                      )
                  }
                </>
              </>
            ) 
            :
            (
              <>
                <div className="grid-col-all dashed-line" />
                <h3 className="grid-col-all center">
                  Please login/register to see contact details
                </h3>
                <div className="grid-col-1-7 button-pos">
                  <ButtonRegular type="button" linkRef="/login" btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Login">
                    <FontAwesomeIcon pull="right" icon={solid('right-to-bracket')} size="1x" />
                  </ButtonRegular>
                </div>
                <div className="grid-col-7-13 button-pos">
                  <ButtonRegular type="button" linkRef="/register" btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Register">
                    <FontAwesomeIcon pull="right" icon={solid('user-plus')} size="1x" />
                  </ButtonRegular>
                </div>                
              </>
            )
        }
      </ProfileForm>
    )
  };

  const showPosts = () => {

    return posts.map((post, id) => {

      const buttons = () => {
        if (deletePost === true & editPost === true) {
          return (
            <>
              <div className="button-pos">
                <ButtonRegular type="button" linkRef={`/edit/${post.title}`} btnColor="#fff" btnHover="#ebba00" btnTextColor="#ebba00" btnTextHoverColor={whiteRegular} btnWidth="auto" btnBorderRadius="50%" btnPadding="19px">
                  <FontAwesomeIcon pull="center" icon={solid('pen-to-square')} size="1x" />
                </ButtonRegular>
              </div>
              <div className="button-pos">
                <ButtonRegular type="button" onClick={() => postDeleteConfirmation(post.id)} btnColor="#fff" btnHover="#9d3d3d" btnTextColor="#9d3d3d" btnTextHoverColor={whiteRegular} btnWidth="57px" btnBorderRadius="50%" btnPadding="19px">
                  <FontAwesomeIcon pull="center" icon={solid('trash-can')} size="1x" />
                </ButtonRegular>
              </div>
              <div className="button-pos">
                <ButtonRegular type="button" linkRef={`/food/${post.title}`} btnColor="#fff" btnHover={buttonColor} btnTextColor={buttonColor} btnTextHoverColor={whiteRegular} btnWidth="auto" btnBorderRadius="50%" btnPadding="19px">
                  <FontAwesomeIcon pull="center" icon={solid('circle-chevron-right')} size="1x" />
                </ButtonRegular>
              </div>
            </>
          );
        }
        else {
          return (
            <div className="grid-col-all button-pos">
              <ButtonRegular type="button" linkRef={`/food/${post.title}`} btnColor={buttonColor} btnHover="#ebba00" btnTextColor={whiteRegular} btnTextHoverColor={whiteRegular} btnText="View post">
                <FontAwesomeIcon pull="right" icon={solid('circle-chevron-right')} size="1x" />
              </ButtonRegular>
            </div>  
          );
        }
      };
      console.log(post)
      return (
        <div key={id} className={`${gridColumns(posts, 2, id)} user-item-pos`}>
          <FoodForm className="grid form">
            <CoverPhoto className="grid-col-all" imgSrc={post.image} title="User cover photo" />
            <div className="grid-col-all user">
              <h3>
                {post.title.replace(/(.{65})..+/, "$1…")}
              </h3>
            </div> 
            <div className="grid-col-all center">
              { buttons() }
            </div>
          </FoodForm>
        </div>
      );
    }

    )
  };

  const handleDeletePost = async (postId) => {
    setNotificationType(''); //reset notification type
    setNotificationText(''); //reset notification message
    
    const response = await fetch(`${postslist}?id=${postId}`, {
      method: "DELETE"
    });

    const responseObject = await response.json();
    console.log(responseObject);

    if (responseObject.success === true) {
      setNotificationType('success');
      setNotificationText('Post deleted successfully!');
    } 
    else {
      setNotificationType('error');
      setNotificationText(responseObject.error);
    }
  };

  const postDeleteConfirmation = (postId) => {
    if (window.confirm("We cannot restore your post. Are you sure you want to delete it?") === true) {
      handleDeletePost(postId);
    }
  };

  useEffect(() => {
    getUser();
    getUserPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  return (
    <>
      {notificationText && <Notification className="grid-col-all center" type={notificationType} messageText={notificationText} delay="3000" />}
      <PublicProfileSection className="grid section">
        <div className="grid-col-4-10 grid-col-center">
          {user ? showUser() : <LoaderAnimation />}
        </div>
        {
          !isAuth ?          
            <ButtonArrow className="grid-col-all center" arrColor="#d0d0d0" onClick={foodListRef} />
            :
            <></>
        }
        {
          editProfile === true ? 
            <ButtonArrow className="grid-col-all center" arrColor="#d0d0d0" onClick={foodListRef} />
            :
            <></>
        }
      </PublicProfileSection>
      {
        posts.length > 0 &&
          (       
            <FoodSection className="grid section">
              <div className="grid-col-4-10 dashed-line" ref={foodListRef} />
              <div className="grid-col-2-12">
                <header className="grid-col-all">
                  <h1>{ user && (user.name || user.username)} posts</h1>
                  <h2>Have a look at my personal posts</h2>
                </header>
                <div className="grid-list-4lrg-3mid-2sml">
                  { showPosts() }
                </div>
              </div>
            </FoodSection>
          )
      }
    </>
  );
};

export default Profile;