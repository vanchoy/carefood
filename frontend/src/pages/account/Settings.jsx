import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import '../../styles/form.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { userlist, changePassword } from '../../api/ApiService';
import ProgressBar from '../../components/Progressbar';
import Notification from '../../components/Notification';
import CoverPhoto from '../../components/CoverPhoto';
import Avatar from '../../components/Avatar';
import { ButtonRegular, ButtonFileUpload } from '../../components/buttons/ButtonRegular';

import { buttonColor, whiteRegular } from '../../constants/styles';

import cities from '../../api/dk_cities.json';

const ProfileSection = styled.section`
  /* ====== SECTION SETTINGS ====== */
    /* ~  (Section Syle)  ~ */
      --section-bg-s1-margin: 0 auto;
      --section-bg-s1-min_height: 91vh;
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
        --section-text-padding: 20px 20px 10px 20px;
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
        --section-text-padding: 0 20px 20px 20px;
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
        --section-text-padding: none;
        --section-text-display: block;
        --section-text-color: #000;
        --section-font_family: inherit;
        --section-font_size: 20px;
        --section-font_weight: bold;
        --section-font_style: normal;
        --section-text_decoration: none;
        --section-text_align: center;
        --section-text_shadow: 1px 1px 1px #d2d2d2;
        --section-text-line_height: 1.5;
      }
    /* ----------~(end)~---------- */
    
    /* ~  (Section Paragraph Style)  ~ */
      p {
        --section-text-margin: 0 auto;
        --section-text-padding: 20px 20px 0 20px;
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

const ProfileForm = styled.form`
  /* ====== PROFILE FORM STYLE ====== */
    border-radius: 60px;
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 0 3px 1px rgba(0,0,0,0.03);
    backdrop-filter: blur(16px);

    /* ~  (Form Settings)  ~ */
      --ctc-form-width: 100%;
      --ctc-form-max_width: 100%;
      --ctc-form-height: auto;
      --ctc-form-margin: 0 auto;
      --ctc-form-text-align: center;
      --ctc-form-bg-color: rgba(255, 255, 255, 0.6);
      --ctc-form-padding: 0;
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
      --ctc-form-field-border: 1px solid #f9f9f9;  
      --ctc-form-field-border-radius: 9px;
      --ctc-form-field-box-shadow: rgba(0,0,0, 0.06) 0px 0px 3px;
      --ctc-form-field-outline: 1px dashed #EFD345;
    /* ----------~(end)~---------- */
          
    /* ~  (Textarea Settings)  ~ */
      textarea {
        --ctc-form-field-width: 100%;
        --ctc-form-field-max-width: 100%;
        --ctc-form-textarea-height: 150px;
        --ctc-form-textarea-max_height: 100%;
        --ctc-form-field-margin: 0;
        --ctc-form-field-bg-color: rgba(255,255,255,0.3);
        --ctc-form-field-font-size: 20px;
        --ctc-form-field-font-family: "Calibri";
        --ctc-form-field-text-color: #626262;
        --ctc-form-field-border: 1px dashed #e0e0e0;  
        --ctc-form-field-border-radius: 9px;
        --ctc-form-field-box-shadow: none;
        --ctc-form-field-outline: 1px dashed #000;
      }
    /* ----------~(end)~---------- */

    /* ~  (Label Settings)  ~ */
      --label-margin: 0 auto;
      --label-padding: 10px 0 10px 0;
      --label-display: block;
      --label-color: #333;
      --label-font_family: inherit;
      --label-font_size: 20px;
      --label-font_weight: normal;
      --label-font_style: normal;
      --label-text_decoration: none;
      --label-text_align: center;
      --label-text_shadow: rgba(0,0,0, 0.16) 1px 1px 3px;
    /* ----------~(end)~---------- */

    button {
      margin: 20px auto !important;
    }

    .dashed-line {
      width: 100%;
      border-bottom: 2px dashed #e0e0e0;
    }

    .oblique-text {
      font-style: italic;
      text-decoration: underline #d0d0d0;

      span {
        color: #EFD345;
        margin: 10px;
      }
    }  
    .orange {
      color: #EFD345;
    }
    .dark-orange {
      color: #db4500;
    }
    .red {
      color: #630606;
    }

    .fields-position {
      padding: 10px;
    }

  /* =================|END|================= */
`;

const MyAccSettings = ({setAuth}) => {
  const [notificationType, setNotificationType] = useState('');
  const [notificationText, setNotificationText] = useState('');
  const [profilePhotoError, setProfilePhotoError] = useState(false);
  const [profileCoverPhotoError, setProfileCoverPhotoError] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));
  const [fileName, setFileName] = useState({name: "Max size 0,5MB"});
  const [profileCoverPhoto, setProfileCoverPhoto] = useState({name: "Max size 1MB"});
  const [bioChars, setBioChars] = useState(255);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const maxChars = 255;
  const navigate = useNavigate();

  const handleCoverImage = (event) => {
    const file = event.target.files[0];
    setProfileCoverPhoto({name: file.name, size: file.size});

    if (file.size < 1000000) {
      // image file size must be below 1MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser(prevUser => ({ ...prevUser, coverImage: event.target.result }));
      };
      reader.readAsDataURL(file);
      setProfileCoverPhotoError(false); // reset errorMessage state
    } 
    else {
      // if not below 1MB display an error message using the errorMessage state
      setProfileCoverPhotoError("The image file is too big! The max size is 1MB");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFileName({name: file.name, size: file.size});

    if (file.size < 500000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser(prevUser => ({ ...prevUser, image: event.target.result }));
      };
      reader.readAsDataURL(file);
      setProfilePhotoError(false); // reset errorMessage state
    } 
    else {
      // if not below 0.5MB display an error message using the errorMessage state
      setProfilePhotoError("The image file is too big! The max size is 0.5MB");
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event) => {
    setNotificationType(''); //reset notification type
    setNotificationText(''); //reset notification message
    event.preventDefault();

    const url = `${userlist}?id=${user.id}`;
    const userToUpdate = { id: user.id, username: user.username, name: user.name, mail: user.mail, phone: user.phone, city: user.city, bio: user.bio, image: user.image, coverImage: user.coverImage, fbUsername: user.fbUsername, igUsername: user.igUsername, twUsername: user.twUsername, ytUsername: user.ytUsername};
    console.log(userToUpdate);

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(userToUpdate)
    });
    const responseObject = await response.json();

    if (responseObject.status === "success" && !profilePhotoError && !profileCoverPhotoError ) {
      localStorage.setItem("authUser", JSON.stringify(responseObject.data[0]));
      console.log(responseObject);
      setNotificationType('success');
      setNotificationText('Account updated successfully!');   
    } 
    else {
      setNotificationType('error');
      setNotificationText('Something went wrong, try again!');
    }
  };

  const handleDeleteAccount = async () => {
    setNotificationType(''); //reset notification type
    setNotificationText(''); //reset notification message
    
    const response = await fetch(`${userlist}?id=${user.id}`, {
      method: "DELETE"
    });

    const responseObject = await response.json();
    console.log(responseObject);
    
    if (responseObject.accountDeleteSuccess === true) {    
      setNotificationType("success"); //reset notification type
      setNotificationText(responseObject.success); //reset notification message
      setAuth(false);
      localStorage.removeItem("isAuth");
      localStorage.removeItem("authUser");
      localStorage.clear();
      navigate('/');
      window.location.reload();
    }
    else {
      setNotificationType("error"); //reset notification type
      setNotificationText(responseObject.error); //reset notification message
    }
    
  };

  const handlePasswordChange = async () => {
    setNotificationType(''); //reset notification type
    setNotificationText(''); //reset notification message
    const newPassword = { password: password, passwordCheck: passwordCheck };

    const url = `${changePassword}?id=${user.id}`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(newPassword)
    });

    const responseObject = await response.json();

    //console.log(responseObject);

    if (responseObject.passwordChangeSuccess === true && responseObject.success) {
      setNotificationType('success');
      setNotificationText(responseObject.success);
    }
    if (responseObject.passwordChangeSuccess === false && responseObject.error) {
      setNotificationType('error');
      setNotificationText(responseObject.error);
    }
    if (responseObject.passwordChangeSuccess === false && responseObject.warning) {
      setNotificationType('warning');
      setNotificationText(responseObject.warning);
    }
  };

  const accountDeleteConfirmation = () => {
    if (window.confirm("We cannot restore your account. Are you sure you want to delete it?") === true) {
      handleDeleteAccount();
    }
  };
    
  return (
    <> 
      {notificationText && <Notification className="grid-col-all center" type={notificationType} messageText={notificationText} delay="3000" />}
      <ProfileSection className="grid section">
        <header className="grid-wrapper-column">
          <h1>My profile</h1>
          <h2>Change settings</h2>
        </header>
        <div className="grid-col-4-10">
          <ProfileForm id="profile-form" className="grid-list-2lrg-2mid-2sml form" onSubmit={handleSubmit} method="post" accept-charset="utf-8" enctype="multipart/form-data">
            <CoverPhoto className="grid-col-all" imgSrc={user.coverImage} title="Your cover photo" />
            <Avatar className="grid-col-all" imgSrc={user.image} title="Your profile photo" />
            <div className="grid-col-2-7">
              <ButtonFileUpload type="file" id="myFile" name="image" accept="image/*" fileName={fileName} onChange={e => handleImageChange(e)} btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Avatar file">
                <FontAwesomeIcon pull="right" icon={solid('file-circle-plus')} size="1x" />
              </ButtonFileUpload>
              { profilePhotoError && (<p>{profilePhotoError}</p>) }
            </div>
            <div className="grid-col-7-12">
              <ButtonFileUpload type="file" id="coverImage" name="coverImage" accept="image/*" fileName={profileCoverPhoto} onChange={e => handleCoverImage(e)} btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Cover file">
                <FontAwesomeIcon pull="right" icon={solid('file-circle-plus')} size="1x" />
              </ButtonFileUpload>
              { profileCoverPhotoError && (<p>{profileCoverPhotoError}</p>) }
            </div>
            <div className="grid-col-all fields-position">
              <div className="grid">
                <div className="grid-col-2-12">
                  <label className="center" htmlFor="bio">
                    <FontAwesomeIcon icon={solid('address-card')} size="1x" />
                    <span className="user-details">
                      Short bio 
                    </span>
                  </label>
                  <textarea id="bio" name="bio" value={user.bio} maxLength={maxChars} onChange={(e) => { handleChange(e); setBioChars(maxChars - e.target.value.length); }} placeholder="Write a short bio description for your profile. Max 255 characters" wrap="hard" />
                  <ProgressBar length={maxChars} chars={bioChars} />
                  <p>
                    Characters: { 
                      bioChars === 0
                        ?
                        <span className="red">{bioChars}</span>
                        :
                        bioChars <= 30
                          ?
                          <span className="dark-orange">{bioChars}</span>
                          : 
                          bioChars <= 90
                            ?
                            <span className="orange">{bioChars}</span>
                            :
                            bioChars                       
                    } / 255 
                  </p>
                </div>
              </div>
            </div>
            <div className="grid-col-2-7 fields-position">
              <label className="left" htmlFor="username">Username:</label>
              <input id="username" name="username" value={user.username} onChange={handleChange} type="text" placeholder=" Type a new username" required />
            </div>
            <div className="grid-col-7-12 fields-position">
              <label className="left" htmlFor="mail">Email:</label>
              <input id="useremail" name="mail" value={user.mail} onChange={handleChange} type="email" placeholder=" Type a new e-mail adress" required />
            </div>
            <div className="grid-col-2-7 fields-position">
              <label className="left" htmlFor="name">Your Name:</label>
              <input id="name" name="name" value={user.name} onChange={handleChange} type="text" placeholder=" Type your name" />
            </div>
            <div className="grid-col-7-12 fields-position">
              <label className="left" htmlFor="phone">Phone:</label>
              <input id="phone" name="phone" value={user.phone} onChange={handleChange} type="text" placeholder=" Type your phone number" />
            </div>
            <div className="grid-col-2-7 fields-position">
              <label className="left" htmlFor="city">City:</label>
              <select id="city" name="city" value={user.city} onChange={handleChange}>
                <option key="rnd123" value="">Select a city</option>
                {cities.map(item => (
                  <option key={item.city} value={item.city}>{item.city}</option>
                ))}
              </select>
            </div>
            <div className="grid-col-7-12 fields-position">
              <label className="left" htmlFor="createdAt">Account creation:</label>
              <input id="createdAt" name="createdAt" type="text" placeholder={user.createdAt} readOnly disabled />
            </div>
            <div className="grid-col-2-7 fields-position">
              <label className="left" htmlFor="fbUsername">Facebook profile:</label>
              <input id="fbUsername" name="fbUsername" value={user.fbUsername} onChange={handleChange} type="text" pattern="[^'\x22]+"  placeholder=" Your Facebook username" />
            </div>
            <div className="grid-col-7-12 fields-position">
              <label className="left" htmlFor="igUsername">Instagram profile:</label>
              <input id="igUsername" name="igUsername" value={user.igUsername} onChange={handleChange} type="text" pattern="[^'\x22]+"  placeholder=" Your Instagram username" />
            </div>
            <div className="grid-col-2-7 fields-position">
              <label className="left" htmlFor="twUsername">Twitter profile:</label>
              <input id="twUsername" name="twUsername" value={user.twUsername} onChange={handleChange} type="text" pattern="[^'\x22]+"  placeholder=" Your Twitter username" />
            </div>
            <div className="grid-col-7-12 fields-position">
              <label className="left" htmlFor="ytUsername">Youtube profile:</label>
              <input id="ytUsername" name="ytUsername" value={user.ytUsername} onChange={handleChange} type="text" pattern="[^'\x22]+"  placeholder=" Your Youtube username" />
            </div>
            <div className="grid-col-all">
              <p className="oblique-text">
                <span>
                  <FontAwesomeIcon icon={solid('triangle-exclamation')} size="1x" />
                </span>
                Only filled social links will be shown on your profile.
              </p>
              <p className="oblique-text">
                <span>
                  <FontAwesomeIcon icon={solid('triangle-exclamation')} size="1x" />
                </span>
                Please add only your username to your socials and not a link.
              </p>
            </div>
            <div className="grid-col-all fields-position">
              <ButtonRegular type="submit" formEncType="multipart/form-data" btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Update profile">
                <FontAwesomeIcon pull="right" icon={solid('floppy-disk')} size="1x" />
              </ButtonRegular>
            </div>
            <div className="grid-col-all dashed-line" />
            <div className="grid-col-2-7 fields-position">
              <label className="left" htmlFor="password">New Password:</label>
              <input id="password" name="password" onChange={event => setPassword(event.currentTarget.value)} type="password" pattern=".{8,}" placeholder=" Type a new password" />
            </div>
            <div className="grid-col-7-12 fields-position">
              <label className="left" htmlFor="passwordCheck">
                <span className="user-details">Repeat New Password:</span>
              </label>
              <input id="passwordCheck" name="passwordCheck" onChange={event => setPasswordCheck(event.currentTarget.value)} type="password" pattern=".{8,}" placeholder=" Repeat password" />
            </div>
            <div className="grid-col-all fields-position">
              <ButtonRegular type="button" onClick={() => {handlePasswordChange()}} btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Change password">
                <FontAwesomeIcon pull="right" icon={solid('key')} size="1x" />
              </ButtonRegular>
            </div>
            <div className="grid-col-all dashed-line" />
            <div className="grid-col-all fields-position">
              <p className="oblique-text">
                <span>
                  <FontAwesomeIcon icon={solid('triangle-exclamation')} size="1x" />
                </span>
                It is your choise to delete your profile. If you do that, your account cannot be restored.
              </p>
            </div>
            <div className="grid-col-all center">
              <ButtonRegular type="button" onClick={() => accountDeleteConfirmation()} btnColor="#630606" btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor="#630606" btnText="Delete account">
                <FontAwesomeIcon pull="right" icon={solid('trash-can')} size="1x" />
              </ButtonRegular>
            </div>
          </ProfileForm>
        </div>
      </ProfileSection>
    </>
  );
};

export default MyAccSettings;