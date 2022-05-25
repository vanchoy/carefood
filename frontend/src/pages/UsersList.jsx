import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import '../styles/form.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro';

import { userlist } from '../api/ApiService';
import CoverPhoto from '../components/CoverPhoto';
import Avatar from '../components/Avatar';
import SearchBar from '../components/SearchBar';
import { ButtonRegular } from '../components/buttons/ButtonRegular';
import { buttonColor, whiteRegular } from '../constants/styles';
import LoaderAnimation from '../components/LoaderAnimation';
import { searchUsers } from '../js/search';
import gridColumns from '../js/gridColumns';

const UsersSection = styled.section`
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
        --section-text-padding: 0 20px 0 20px;
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
        --section-text-padding: 0 20px 0 20px;
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

    .formContainer {
      min-height: 92vh;
    }

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
      --ctc-form-max_width: 100%;
      --ctc-form-height: 100%;
      --ctc-form-margin: 20px auto;
      --ctc-form-text-align: center;
      --ctc-form-bg-color: rgba(255, 255, 255, 0.6);
      --ctc-form-padding: 0;
    /* ----------~(end)~---------- */

    .button-pos {
        margin: 10px !important;
    }

    .user {
      margin: -20px 0 0 0;
    }

    .location {
      color: #b0b0b0;
      font-style: italic;
    }
    
  /* =================|END|================= */
`;

const SoMeLinkStyle = styled.a`
    margin: 0 10px;
    color: #999;
    text-decoration: none;
    text-align: right;
    display: inline-block;
    position: relative;

    &:hover {
      color: ${(props) => props.colorHover};
    }
`;

const UsersList = () => {
  const [users, setUsers] = useState();
  const [population, setPopulation] = useState([]);
  const navigate = useNavigate();

  //get user data
  const getUsers = async () => {
    const url = userlist;
    const response = await fetch(url);
    const responseData = await response.json();

    if (responseData.data) {
      setUsers(responseData.data);
      setPopulation(responseData.data);
      console.log(responseData.data)
      //console.log(responseData.data);
      //console.log(responseData.data.length);
    }
    else {
      navigate('/404');
    }
  };

  const socials = (fbUsername,igUsername,twUsername,ytUsername) => {
    if (fbUsername || igUsername || twUsername || ytUsername)
      return (
        <>
          { fbUsername && (<SoMeLinkStyle colorHover="#00acee" href={`https://facebook.com/${fbUsername}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-fw" icon={brands('facebook')} size="xl" /></SoMeLinkStyle>)}   
          { igUsername && (<SoMeLinkStyle colorHover="#8a3ab9" href={`https://www.instagram.com/${igUsername}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-fw" icon={brands('instagram')} size="xl" /></SoMeLinkStyle>)}
          { twUsername && (<SoMeLinkStyle colorHover="#1DA1F2" href={`https://twitter.com/${twUsername}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-fw" icon={brands('twitter')} size="xl" /></SoMeLinkStyle>)} 
          { ytUsername && (<SoMeLinkStyle colorHover="#FF0000" href={`https://www.youtube.com/channel/${ytUsername}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="fa-fw" icon={brands('youtube')} size="xl" /></SoMeLinkStyle>)}
        </>
      )
  };

  const showUsers = () => {
    return population.map((user, id) => {
      return (
        <div key={id} className={`${gridColumns(users, 2, id)} user-item-pos`}>
          <ProfileForm className="grid form">
            <CoverPhoto className="grid-col-all" imgSrc={user.coverImage} title="User cover photo" />
            <Avatar className="grid-col-all" imgSrc={user.image} title="User profile photo" />
            {
              user && (
                <div className="grid-col-all user-item-pos">
                  {socials(user.fbUsername, user.igUsername, user.twUsername, user.ytUsername)}
                </div>
              )
            }
            <div className="grid-col-all user">
              <h3>
                {user.name ? user.name : user.username}
              </h3>
            </div> 
            <div className="grid-col-all user-item-pos location">
              {
                user.city &&
                  (                             
                    <>
                      <FontAwesomeIcon icon={solid('location-dot')} className="fa-fw" size="lg" color="#4e944f" />
                      <span>{user.city}</span>
                    </>                
                  )
              }  
            </div>  
            {
            /*
              <div className="grid-col-all">
                <p>{user.bio}</p>
              </div>
            */
            }
            <div className="grid-col-all button-pos">
              <ButtonRegular type="button" linkRef={`/account/${user.username}`} btnColor={buttonColor} btnHover="#ebba00" btnTextColor={whiteRegular} btnTextHoverColor={whiteRegular} btnText="Check profile">
                <FontAwesomeIcon pull="right" icon={solid('circle-chevron-right')} size="1x" />
              </ButtonRegular>
            </div>       
          </ProfileForm>
        </div>
      );
    }

    )
  };

  const handleSearch = async (e) => {
    let value = e.target.value;
    if (value.length >= 0) {
      let search = await searchUsers(users, value);
      setPopulation(search);
    } else {
      setPopulation(users);
    }
  };
  

  useEffect(() => {
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UsersSection className="grid section">
      <header className="grid-wrapper-column">
        <h1>Users list</h1>
        <h2>Have a look at our users</h2>
      </header>
      <div className="grid-col-5-9">
        <SearchBar onChange={handleSearch} placeholder="Search user by name, username, city.."/>
      </div>
      <div className="grid-col-2-12 formContainer">
        <div className="grid-list-4lrg-3mid-2sml">
          { users ? showUsers() : <LoaderAnimation/> }
        </div>
      </div>
    </UsersSection>
  );
};

export default UsersList;