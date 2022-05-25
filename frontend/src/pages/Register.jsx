import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import '../styles/form.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { createAccount } from '../api/ApiService';
import { ButtonRegular } from '../components/buttons/ButtonRegular';
import heroImg from '../assets/images/register-wallpaper.jpg';
import { buttonColor, whiteRegular } from '../constants/styles';
import '../styles/checkBox.scss';

const RegisterSection = styled.section`
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
        --section-font_size: 33px;
        --section-font_weight: normal;
        --section-font_style: regular;
        --section-text_decoration: none;
        --section-text_align: center;
        --section-text_shadow: 1px 1px 3px #666;
        --section-text-line_height: 1.3;
      }
    /* ----------~(end)~---------- */

    /* ~  (Section Paragraph Style)  ~ */
      p {
        --section-text-margin: 0 auto;
        --section-text-padding: 0;
        --section-text-display: block;
        --section-text-color: #444;
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

      .oblique-text {
        font-style: italic;
        text-decoration: underline dotted #666;
      }  

  /* For more settings go to ["styles/index.scss"] */
  /* =================|END|================= */
`;

const RegisterForm = styled.form`
  /* ====== REGISTER FORM STYLE ====== */
    border-radius: 60px;
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 0 6px 1px rgba(0,0,0,0.06);
    backdrop-filter: blur(16px);

    /* ~  (Form Settings)  ~ */
      --ctc-form-width: 100%;
      --ctc-form-max_width: 700px;
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
      width: auto;
      padding: 10px;
      list-style: none;
      display: inline-block;
      text-align: left;
    }

    a {
      color: #000;
      text-decoration: underline;
      
      &:hover { 
        color: #EFD345;
      }
    }

    em.requiredField {
      color: #9e0000;
    }

    .fields-position {
      padding: 10px;
    }

  /* =================|END|================= */
`;

const RegisterPage = ({ setAuth }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    // prevent page refresh
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const passwordCheck = event.target.passwordCheck.value;
    const mail = event.target.mail.value;
    const newUser = { username: username, mail: mail, password: password, passwordCheck: passwordCheck };

    //console.log(newUser);
    const response = await fetch(createAccount, {
      method: "POST",
      body: JSON.stringify(newUser)
    });

    const data = await response.json();
    //console.log(data);

    if (data.error) {
      setErrorMessage(data.error);
    } 
    else if (data.registerSuccess) {
      setAuth(true);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      navigate('/');
      window.location.reload();
    }
  };
    
  return (
    <RegisterSection className="grid section">
      <div className="grid-col-4-10 grid-col-center">
        <RegisterForm className="grid-list-2lrg-2mid-2sml form" onSubmit={handleRegister}>
          <header className="grid-col-all">
            <h1>
              <em className="oblique-text">FeedMe</em>
            </h1>
            <h2>
              Step in to reduce food waste
            </h2>
          </header>
          <div className="grid-col-1-7 fields-position">
            <label className="left" htmlFor="username">
              <FontAwesomeIcon icon={solid('user')} size="1x" />
              <span className="user-details">
                Username: <em className="requiredField">*</em>
              </span>
            </label>
            <input id="username" name="username" type="text" pattern="[^'\x22]+" title="Invalid input" placeholder=" Username" required/>
          </div>
          <div className="grid-col-7-13 fields-position">
            <label className="left" htmlFor="mail">
              <FontAwesomeIcon icon={solid('envelope')} size="1x" />
              <span className="user-details">
                E-mail address: <em className="requiredField">*</em>
              </span>
            </label>
            <input id="mail" name="mail" type="email" pattern="[^'\x22]+" title="Invalid input" placeholder=" Your e-mail" required/>
          </div>
          <div className="grid-col-1-7 fields-position">
            <label className="left" htmlFor="password">
              <FontAwesomeIcon icon={solid('key')} size="1x" />
              <span className="user-details">
                Password: <em className="requiredField">*</em>
              </span>
            </label>
            <input id="password" name="password" type="password" placeholder=" Password" pattern=".{8,}" title="Eight or more characters" required/>
          </div>
          <div className="grid-col-7-13 fields-position">
            <label className="left" htmlFor="passwordCheck">
              <FontAwesomeIcon icon={solid('key')} size="1x" />
              <span className="user-details">
                Repeat Password: <em className="requiredField">*</em>
              </span>
            </label>
            <input id="passwordCheck" name="passwordCheck" type="password" pattern=".{8,}" title="Eight or more characters" placeholder=" Repeat password" required/>
          </div>
          <div className="grid-col-1-7 fields-position checkbox-wrapper checkbox-container">
            <div className="checkbox">
              <input type="checkbox" id="privacyPolicy" name="privacyPolicy" required/>
              <label htmlFor="privacyPolicy"><span>Agree to Privacy Policy <em className="requiredField">*</em></span></label>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="termsService" name="termsService" required/>
              <label htmlFor="termsService"><span>Accept the Terms of Service <em className="requiredField">*</em></span></label>
            </div>
          </div>
          <div className="grid-col-7-13 fields-position">
            <li>
              <Link to="/login">
                Already have an account?
              </Link>
            </li>
            <li>
              <Link to="/contact">
                Have questions, contact us!
              </Link>
            </li>
          </div>
          <div className="grid-col-all fields-position">
            <p>
              <span className="oblique-text">
                All fields marked with <em className="requiredField">*</em> are required
              </span>
            </p>
          </div>
          <div className="grid-col-all">
            <ButtonRegular type="submit" btnColor={buttonColor} btnHover="#EFD345" btnTextColor={whiteRegular} btnTextHoverColor={whiteRegular} btnText="Register">
              <FontAwesomeIcon pull="right" icon={solid('user-plus')} size="1x" />
            </ButtonRegular>
            <p className="text-error">{errorMessage}</p>
          </div>
        </RegisterForm>
      </div>
    </RegisterSection>
  );
}

export default RegisterPage;
