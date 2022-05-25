import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import '../../styles/form.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import MapPicker from 'react-google-map-picker';

import { postslist } from '../../api/ApiService';
import Notification from '../../components/Notification';
import CoverPhoto from '../../components/CoverPhoto';
import ProgressBar from '../../components/Progressbar';
import { ButtonRegular, ButtonFileUpload } from '../../components/buttons/ButtonRegular';
import { buttonColor, whiteRegular } from '../../constants/styles';

import defaultPostPhoto from '../../assets/images/default-foodpost-photo.jpg';

const CreatePostSection = styled.section`
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

  .button-pos {
    margin: 20px auto !important;
  }

/* For more settings go to ["styles/index.scss"] */
/* =================|END|================= */
`;

const CreatePostForm = styled.form`
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
    --ctc-form-padding: 0 0 20px 0;
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
    --ctc-form-field-outline: 1px dashed #4e944f;
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
      --ctc-form-field-border: 1px solid #f9f9f9;  
      --ctc-form-field-border-radius: 9px;
      --ctc-form-field-box-shadow: rgba(0,0,0, 0.06) 0px 0px 3px;
      --ctc-form-field-outline: 1px dashed #4e944f;
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
    --label-text_align: left;
    --label-text_shadow: rgba(0,0,0, 0.16) 1px 1px 3px;
  /* ----------~(end)~---------- */

  em.requiredField {
    color: #9e0000;
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
    padding: 20px; 
  }

  .required-text {
    vertical-align: middle;
    padding-bottom: 20px;
  }

  .oblique-text {
    font-style: italic;
    text-decoration: underline dotted #ccc;
}

/* =================|END|================= */
`;

const DefaultLocation = { lat: 56.15696, lng: 10.21038};
const DefaultZoom = 15;

const CreatePost = ({isAuth}) => {
  const [notificationType, setNotificationType] = useState('');
  const [notificationText, setNotificationText] = useState('');
  const [user] = useState(JSON.parse(localStorage.getItem("authUser")));
  const [postPhotoError, setPostPhotoError] = useState(false);
  const [postPhoto, setPostPhoto] = useState(defaultPostPhoto);
  const [postDescriptionChars, setPostDescriptionChars] = useState(255);
  const navigate = useNavigate();
  const maxChars = 255;
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  const createPost = async (event) => {
    setNotificationType(''); //reset notification type
    setNotificationText(''); //reset notification message
    // prevent page refresh
    event.preventDefault();

    const postTitle = event.target.postTitle.value;
    const postBody = event.target.postBody.value;
    const postGeoLat = event.target.postGeoLat.value;
    const postGeoLng = event.target.postGeoLat.value;
    
    const uid = user.id;
    const newPost = {
      postTitle: postTitle, postBody: postBody, postImage: postPhoto, postGeoLat: postGeoLat, postGeoLng: postGeoLng, uid: uid 
    }; 
    
    const response = await fetch(postslist, {
      method: "POST",
      body: JSON.stringify(newPost)
    });
    const responseData = await response.json();
    console.log(responseData.data[0]);

    if (responseData.status === "success") {
      navigate(`/food/${responseData.data[0].title}`);
    }
    else if (responseData.status === "error") {
      setNotificationType('error');
      setNotificationText('Something went wrong, try again!');
    }
    else {
      setNotificationType('error');
      setNotificationText('Something went wrong, try again!');
    }
  };

  const handlePostPhoto = (event) => {
    const file = event.target.files[0];
    
    if (file.size < 1000000) {
      // image file size must be below 1MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setPostPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
      setPostPhotoError(false); // reset errorMessage state
    } 
    else {
      // if not below 1MB display an error message using the errorMessage state
      setPostPhotoError("The image file is too big! The max size is 1MB");
    }
  };

  function handleChangeLocation (lat, lng){
    setLocation({lat:lat, lng:lng});
  }
  
  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }

  return (
    <>
      {notificationText && <Notification className="grid-col-all center" type={notificationType} messageText={notificationText} delay="3000" />}
      <CreatePostSection className="grid section">
        <header className="grid-wrapper-column">
          <h1>Create a post</h1>
          <h2>Here you can create a post</h2>
        </header>
        <div className="grid-col-4-10">
          <CreatePostForm id="profile-form" className="grid form" onSubmit={isAuth && createPost} method="post" accept-charset="utf-8" enctype="multipart/form-data">
            <CoverPhoto className="grid-col-all" imgSrc={postPhoto} title="Food post photo" />
            <div className="grid-col-all button-pos">
              <ButtonFileUpload type="file" id="postImage" name="postImage" accept="image/*" fileName={postPhoto} onChange={e => handlePostPhoto(e)} btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Add picture">
                <FontAwesomeIcon pull="right" icon={solid('file-circle-plus')} size="1x" />
              </ButtonFileUpload>
              { postPhotoError && (<p>{postPhotoError}</p>) }
            </div>
            <div className="grid-col-2-12 fields-position">
              <label htmlFor="postTitle">
                <FontAwesomeIcon className="fa-fw" icon={solid('note-sticky')} size="1x" />
                <span className="user-details">
                  Post title: <em className="requiredField">*</em>
                </span>
              </label>
              <input id="postTitle" name="postTitle" type="text" pattern="[^'\x22]+" placeholder=" Type a post title" required />
            </div>
            <div className="grid-col-2-12 fields-position">
              <label htmlFor="postBody">
                <FontAwesomeIcon className="fa-fw" icon={solid('message')} size="1x" />
                <span className="user-details">
                  Food description: <em className="requiredField">*</em>
                </span>
              </label>
              <textarea id="postBody" name="postBody" maxLength={maxChars} onChange={(e) => { setPostDescriptionChars(maxChars - e.target.value.length); }} placeholder="Write a description of your food. Max 255 characters" required />
              <ProgressBar length={maxChars} chars={postDescriptionChars} />
              <p>
                Characters: { 
                  postDescriptionChars === 0
                    ?
                    <span className="red">{postDescriptionChars}</span>
                    :
                    postDescriptionChars <= 30
                      ?
                      <span className="dark-orange">{postDescriptionChars}</span>
                      : 
                      postDescriptionChars <= 90
                        ?
                        <span className="orange">{postDescriptionChars}</span>
                        :
                        postDescriptionChars                       
                } / 255 
              </p>
            </div>
            <div className="grid-col-2-7 fields-position">
              <label htmlFor="postGeoLat">
                <FontAwesomeIcon className="fa-fw" icon={solid('note-sticky')} size="1x" />
                <span className="user-details">
                  Lat: <em className="requiredField">*</em>
                </span>
              </label>
              <input id="postGeoLat" name="postGeoLat" type="text" value={location.lat} required />
            </div>
            <div className="grid-col-7-12 fields-position">
              <label htmlFor="postGeoLng">
                <FontAwesomeIcon className="fa-fw" icon={solid('note-sticky')} size="1x" />
                <span className="user-details">
                  Lng: <em className="requiredField">*</em>
                </span>
              </label>
              <input id="postGeoLng" name="postGeoLng" value={location.lng} type="text" required />
            </div>
            <div className="grid-col-all">
              <MapPicker defaultLocation={defaultLocation}
                zoom={zoom}
                mapTypeId="roadmap"
                style={{height:'300px'}}
                onChangeLocation={handleChangeLocation} 
                onChangeZoom={handleChangeZoom}
                apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
              />        
            </div>
            <div className="grid-col-all required-text">
              <p>
                <span className="oblique-text">
                  All fields marked with <em className="requiredField">*</em> are required
                </span>
              </p>
            </div>
            <div className="grid-col-all fields-position">
              <ButtonRegular type="submit" formEncType="multipart/form-data" btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Create post">
                <FontAwesomeIcon pull="right" icon={solid('floppy-disk')} size="1x" />
              </ButtonRegular>
            </div>
          </CreatePostForm>
        </div>
      </CreatePostSection>
    </>
  );
};

export default CreatePost;