import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import '../styles/form.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { loginAPI } from '../api/ApiService';
import { ButtonRegular } from '../components/buttons/ButtonRegular';
import heroImg from '../assets/images/login-wallpaper.jpg';
import { buttonColor, whiteRegular } from '../constants/styles';

const LoginSection = styled.section`
  /* ====== SECTION SETTINGS ====== */
    /* ~  (Section Syle)  ~ */
      --section-bg-s1-margin: 0 auto;
      --section-bg-s1-min_height: 92vh;
      --section-bg-s1-max_height: auto;
      --section-bg-s1-padding: 20px;
      --section-bg-s1-bg_color: rgba(0,0,0, 0.6);
      --section-bg-s1-bg_image: url(${heroImg});
      --section-bg-s1-bg_attachment: fixed;
      --section-bg-s1-bg_position: center;
      --section-bg-s1-bg_repeat: no-repeat;
      --section-bg-s1-bg_blend_mode: darken;
      --section-bg-s1-bg_size: cover;
      --section-bg-s1-box_shadow: none;
    /* ----------~(end)~---------- */

    /* ~  (Section Title)  ~ */
      h1 {
        --section-text-margin: 0 auto;
        --section-text-padding: 20px 20px 10px 20px;
        --section-text-display: block;
        --section-text-color: #fff;
        --section-font_family: inherit;
        --section-font_size: 46px;
        --section-font_weight: bold;
        --section-font_style: normal;
        --section-text_align: center;
        --section-text_decoration: none;
        --section-text_shadow: 1px 1px 3px #d9d9d9;
        --section-text-line_height: 1.5;
      }
    /* ----------~(end)~---------- */

    /* ~  (Section SubTitle)  ~ */
      h2 {
        --section-text-margin: 0 auto;
        --section-text-padding: 0;
        --section-text-display: block;
        --section-text-color: #EFD345;
        --section-font_family: inherit;
        --section-font_size: 36px;
        --section-font_weight: normal;
        --section-font_style: regular;
        --section-text_decoration: none;
        --section-text_align: center;
        --section-text_shadow: 1px 1px 3px #666;
        --section-text-line_height: 1.3;
      }
    /* ----------~(end)~---------- */

      .oblique-text {
          font-style: italic;
          text-decoration: underline dotted #666;
      }

  /* For more settings go to ["styles/index.scss"] */
  /* =================|END|================= */
`;

const LoginForm = styled.form`
  /* ====== PROFILE FORM STYLE ====== */
    border-radius: 60px;
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 0 6px 1px rgba(0,0,0,0.06);
    backdrop-filter: blur(16px);

    /* ~  (Form Settings)  ~ */
      --ctc-form-width: 100%;
      --ctc-form-max_width: 550px;
      --ctc-form-height: auto;
      --ctc-form-margin: 0 auto;
      --ctc-form-text-align: center;
      --ctc-form-bg-color: rgba(255, 255, 255, 0.3);
      --ctc-form-padding: 20px 40px 40px 40px;
    /* ----------~(end)~---------- */

    /* ~  (Fields Style)  ~ */
      --ctc-form-field-width: 100%;
      --ctc-form-field-height: 50px;
      --ctc-form-field-max-width: 100%;
      --ctc-form-field-margin: 0 auto;
      --ctc-form-field-bg-color: rgba(255,255,255,0.7);
      --ctc-form-field-font-size: 20px;
      --ctc-form-field-font-family: "Calibri";
      --ctc-form-field-text-color: #626262;
      --ctc-form-field-border: 1px solid #E9EFC0;  
      --ctc-form-field-border-radius: 9px;
      --ctc-form-field-box-shadow: rgba(0,0,0, 0.16) 0px 0px 3px;
      --ctc-form-field-outline: #EFD345;
    /* ----------~(end)~---------- */
          
    /* ~  (Textarea Settings)  ~ */
      --ctc-form-textarea-height: 300px;
    /* ----------~(end)~---------- */

    /* ~  (Label Settings)  ~ */
      --label-margin: 0 auto;
      --label-padding: 5px 0 5px 0;
      --label-display: block;
      --label-color: #fff;
      --label-font_family: inherit;
      --label-font_size: 22px;
      --label-font_weight: normal;
      --label-font_style: normal;
      --label-text_decoration: none;
      --label-text_align: center;
      --label-text_shadow: rgba(0,0,0, 0.16) 1px 1px 3px;
      --label-line_height: 1.5;
    /* ----------~(end)~---------- */

    .user-details {
        margin-left: 10px;
    }

    li {
      padding: 10px;
      list-style: none;
      display: inline-block;
    }

    a {
      color: #000;
      text-decoration: undeline;
      font-style: italic;
      
      display: inline-block;
      :hover {
          color: #EFD345;
      }
    }

    .fields-position {
      padding: 10px;
    }

  /* =================|END|================= */
`;

const LoginPage = ({ setAuth }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const signIn = async (event) => {
    event.preventDefault();
    const username = event.target.username.value; // mail value from inout field in sign in form
    const password = event.target.password.value; // password value from inout field in sign in form
    const loginObject = { username: username, password: password };
    const response = await fetch(loginAPI, {
      method: "POST",
      body: JSON.stringify(loginObject)
    });
    const data = await response.json();
    
    if (data.error) {
      setErrorMessage(data.error);
    }
    else if (data.authenticated) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      setAuth(true);
      navigate('/');
      window.location.reload();
    } 
    else {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("authUser");
      localStorage.clear();
    }
  };

  return (
    <LoginSection className="grid section">
      <div className="grid-col-4-10 grid-col-center">
        <LoginForm className="grid form" onSubmit={signIn}>
          <header className="grid-col-all">
            <h1>
              <em className="oblique-text">FeedMe</em>
            </h1>
            <h2>
              Step in to reduce food waste
            </h2>
          </header>
          <div className="grid-col-all">
            <label className="left" htmlFor="username">
              <FontAwesomeIcon icon={solid('user')} size="1x" />
              <span className="user-details">
                Username:
              </span>
            </label>
            <input id="username" name="username" type="text" placeholder=" Type your username" required/>
          </div>
          <div className="grid-col-all">
            <label className="left" htmlFor="password">
              <FontAwesomeIcon icon={solid('key')} size="1x" />
              <span className="user-details">
                Password:
              </span>
            </label>
            <input id="password" name="password" type="password" placeholder=" Type your password" required/>
          </div>
          <div className="grid-col-all fields-position">
            <li>
              <Link className="menu_item" to="/">
                Forgot your password?
              </Link>
            </li>
            <li>
              <Link className="menu_item" to="/register">
              Don't have an account?
              </Link>
            </li>
          </div>
          <div className="grid-col-all">
            <p className="text-error">{errorMessage}</p>
            <ButtonRegular type="submit" btnColor={buttonColor} btnHover="#EFD345" btnTextColor={whiteRegular} btnTextHoverColor={whiteRegular} btnText="Login">
              <FontAwesomeIcon pull="right" icon={solid('right-to-bracket')} size="1x" />
            </ButtonRegular>
          </div>
        </LoginForm>
      </div>
    </LoginSection>
  );
}

export default LoginPage;
