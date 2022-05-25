import styled from 'styled-components';
import '../styles/form.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ButtonRegular } from '../components/buttons/ButtonRegular';

import { buttonColor, whiteRegular } from '../constants/styles';

import contactWallpaper from '../assets/images/contact-us.jpg';

const ContactSection = styled.section`
    /* ====== SECTION SETTINGS ====== */
      /* ~  (Section Syle)  ~ */
        --section-bg-s1-margin: 0 auto;
        --section-bg-s1-min_height: 100vh;
        --section-bg-s1-max_height: auto;
        --section-bg-s1-padding: 20px;
        --section-bg-s1-bg_color: rgba(0,0,0, 0.6);
        --section-bg-s1-bg_image: url(${contactWallpaper});
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
            --section-text-padding: 0 20px 20px 20px;
            --section-text-display: block;
            --section-text-color: #333;
            --section-font_family: inherit;
            --section-font_size: 26px;
            --section-font_weight: normal;
            --section-font_style: italic;
            --section-text_decoration: none;
            --section-text_align: center;
            --section-text_shadow: 1px 1px 1px #999;
            --section-text-line_height: 1.3;
        }
        /* ----------~(end)~---------- */

        .oblique-text {
            color: #fff;
            font-style: italic;
            text-decoration: underline dotted #ccc;
        }

    /* For more settings go to ["styles/index.scss"] */
    /* =================|END|================= */
`;

const ContactForm = styled.form`
/* ====== CONTACT FORM STYLE ====== */
    border-radius: 60px;
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 0 6px 1px rgba(0,0,0,0.06);
    backdrop-filter: blur(9px);

    /* ~  (Form Settings)  ~ */
      --ctc-form-width: 700px;
      --ctc-form-max_width: 100%;
      --ctc-form-height: auto;
      --ctc-form-margin: 0 auto;
      --ctc-form-text-align: center;
      --ctc-form-bg-color: rgba(255, 255, 255, 0.6);
      --ctc-form-padding: 20px;
    /* ----------~(end)~---------- */

    /* ~  (Fields Style)  ~ */
      --ctc-form-field-width: 100%;
      --ctc-form-field-height: 50px;
      --ctc-form-field-max-width: 100%;
      --ctc-form-field-margin: 0;
      --ctc-form-field-bg-color: rgba(255,255,255,0.7);
      --ctc-form-field-font-size: 20px;
      --ctc-form-field-font-family: "Calibri";
      --ctc-form-field-text-color: #626262;
      --ctc-form-field-border: none;  
      --ctc-form-field-border-radius: 9px;
      --ctc-form-field-box-shadow: rgba(0,0,0, 0.06) 0px 0px 3px;
      --ctc-form-field-outline: 1px solid #e9e9e9;
    /* ----------~(end)~---------- */
          
    /* ~  (Textarea Settings)  ~ */
      textarea {
        --ctc-form-field-width: 100%;
        --ctc-form-field-max-width: 100%;
        --ctc-form-textarea-height: 150px;
        --ctc-form-textarea-max_height: 100%;
        --ctc-form-field-margin: 0;
        --ctc-form-field-bg-color: rgba(255,255,255,0.7);
        --ctc-form-field-font-size: 20px;
        --ctc-form-field-font-family: "Calibri";
        --ctc-form-field-text-color: #626262;
        --ctc-form-field-border: 1px dashed #e0e0e0;  
        --ctc-form-field-border-radius: 9px;
        --ctc-form-field-box-shadow: none;
        --ctc-form-field-outline: 1px solid #e0e0e0;
      }
    /* ----------~(end)~---------- */

    /* ~  (Label Settings)  ~ */
      --label-margin: 0 auto;
      --label-padding: 10px 0 10px 0;
      --label-display: block;
      --label-color: #fff;
      --label-font_family: inherit;
      --label-font_size: 20px;
      --label-font_weight: normal;
      --label-font_style: normal;
      --label-text_decoration: none;
      --label-text_align: center;
      --label-text_shadow: rgba(0,0,0, 0.16) 1px 1px 3px;
    /* ----------~(end)~---------- */

  .user-details {
      margin-left: 10px;
  }

  em.requiredField {
    color: #9e0000;
  }

  .fields-position {
    padding: 20px;
  }

/* =================|END|================= */
`;

const ContactPage = () => (
  <ContactSection className="grid section">
    <div className="grid-col-4-10 grid-col-center">
      <ContactForm className="grid-list-2lrg-2mid-2sml form" action="mailto:info@carefood.store" enctype="text/plain">
        <header className="grid-col-all">
          <h1>
            Contact us
          </h1>
          <h2>
            Use the contact form bellow to reach out
          </h2>
        </header>
        <div className="grid-col-1-7 fields-position">
          <label className="left" htmlFor="firstName">
            <FontAwesomeIcon icon={solid('id-badge')} size="1x" />
            <span className="user-details">
              First Name: <em className="requiredField">*</em>
            </span>
          </label>
          <input id="firstName" name="firstName" onChange={(event) => {}} type="text" placeholder=" Your first name" required/>
        </div>
        <div className="grid-col-7-13 fields-position">
          <label className="left" htmlFor="lastName">
            <FontAwesomeIcon icon={solid('image-portrait')} size="1x" />
            <span className="user-details">
              Last Name: <em className="requiredField">*</em>
            </span>
          </label>
          <input id="lastName" name="lastName" onChange={(event) => {}} type="text" placeholder=" Your last name" required/>
        </div>
        <div className="grid-col-1-7 fields-position">
          <label className="left" htmlFor="email">
            <FontAwesomeIcon icon={solid('envelope')} size="1x" />
            <span className="user-details">
              E-mail address: <em className="requiredField">*</em>
            </span>
          </label>
          <input id="email" name="email" onChange={(event) => {}} type="email" placeholder=" Your e-mail" required/>
        </div>
        <div className="grid-col-7-13 fields-position">
          <label className="left" htmlFor="website">
            <FontAwesomeIcon icon={solid('globe')} size="1x" />
            <span className="user-details">
              Website: 
            </span>
          </label>
          <input id="website" name="website" onChange={(event) => {}} type="text" placeholder=" Website" />
        </div>
        <div className="grid-col-all fields-position">
          <label className="left" htmlFor="title">
            <FontAwesomeIcon icon={solid('note-sticky')} size="1x" />
            <span className="user-details">
              Title: <em className="requiredField">*</em>
            </span>
          </label>
          <input id="title" name="title" type="text" placeholder=" Title" required/>
        </div>
        <div className="grid-col-all fields-position">
          <label className="left" htmlFor="description">
            <FontAwesomeIcon icon={solid('message')} size="1x" />
            <span className="user-details">
              Description <em className="requiredField">*</em>
            </span>
          </label>
          <textarea id="description" name="description" type="textarea" maxLength="3000" placeholder=" Write your message here. Max characters 3000" required/>
        </div>
        <div className="grid-col-all fields-position">
          <p>
            <span className="oblique-text">
              All fields marked with <em className="requiredField">*</em> are required
            </span>
          </p>
        </div>
        <div className="grid-col-all fields-position">
          <ButtonRegular type="submit" btnColor={buttonColor} btnHover="#ebba00" btnTextColor={whiteRegular} btnTextHoverColor={whiteRegular} btnText="Send message">
            <FontAwesomeIcon pull="right" icon={solid('paper-plane')} size="1x" />
          </ButtonRegular>
        </div>
      </ContactForm>
    </div>
  </ContactSection>
);

export default ContactPage;
