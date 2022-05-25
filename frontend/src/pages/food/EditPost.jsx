import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MapPicker from 'react-google-map-picker';

import styled from 'styled-components';
import '../../styles/form.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { postslist } from '../../api/ApiService';
import CoverPhoto from '../../components/CoverPhoto';
import ProgressBar from '../../components/Progressbar';
import Notification from '../../components/Notification';
import { ButtonRegular, ButtonFileUpload } from '../../components/buttons/ButtonRegular';
import { buttonColor, whiteRegular } from '../../constants/styles';

const EditPostSection = styled.section`
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

const EditPostForm = styled.form`
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

const EditPost = ({isAuth}) => {
  const [userAuthenticated] = useState(JSON.parse(localStorage.getItem("authUser")));
  const postPath = window.location.pathname.split('/');
  const [postPhotoError, setPostPhotoError] = useState(false);
  const [postPhoto, setPostPhoto] = useState({name: "Max size 1MB"});
  const [notificationType, setNotificationType] = useState('');
  const [notificationText, setNotificationText] = useState('');
  const [postDescriptionChars, setPostDescriptionChars] = useState(255);
  const navigate = useNavigate();
  const maxChars = 255;
  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [foodDescr, setFoodDescr] = useState('');
  const [post, setPost] = useState('');
  
  const [location, setLocation] = useState({lat:post.geoLat, lng: post.geoLng});
  const [zoom, setZoom] = useState(15);

  const getPost = async () => {
    const response = await fetch(`${postslist}index.php?title=${postPath[2]}`);
    const responseData = await response.json();
    
    // checks if the auth user id matches with the user id from the post (from the creator of the post)
    if (responseData.data[0].uid === userAuthenticated.id) {
      setPost(responseData.data[0]);
      setPostId(responseData.data[0].id);
      setPostPhoto(responseData.data[0].image);
      setTitle(responseData.data[0].title);
      setFoodDescr(responseData.data[0].body);
      setLocation({ lat: responseData.data[0].geoLat, lng: responseData.data[0].geoLng});
      console.log(responseData.data[0])
    }
    else {
      navigate('/404');
    }

    //console.log(responseData)
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

  const savePost = async (event) => {
    setNotificationType(''); //reset notification type
    setNotificationText(''); //reset notification message
    // prevent page refresh
    event.preventDefault();

    const updatePost = {
      postTitle: title, postBody: foodDescr, postImage: postPhoto, postGeoLat: location.lat, postGeoLng: location.lng
    }; 
    
    const response = await fetch(`${postslist}?id=${postId}`, 
      {
        method: "PUT",
        body: JSON.stringify(updatePost)
      });
    const responseData = await response.json();

    if (responseData) {
      setNotificationType('success');
      setNotificationText('Post updated successfully! Redirecting to your post');  
      setTimeout(() => {
        navigate(`/food/${title}`)
      }, 2000);
    }
    else {
      setNotificationType('error');
      setNotificationText('Something went wrong, try again!');
    }
    
  };

  const handleDeletePost = async () => {
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
      setTimeout(() => {
        navigate(`/account/${userAuthenticated.username}`);
      }, 2000);
    } 
    else {
      setNotificationType('error');
      setNotificationText(responseObject.error);
    }
  };

  const postDeleteConfirmation = () => {
    if (window.confirm("We cannot restore your post. Are you sure you want to delete it?") === true) {
      handleDeletePost();
    }
  };

  const handleChangeLocation = (lat, lng) => {
    setLocation({lat:lat, lng:lng});
  };
  
  const handleChangeZoom = (newZoom) => {
    setZoom(newZoom);
  };

  useEffect(() => {
    getPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(location)
  
  return (
    <>
      {notificationText && <Notification className="grid-col-all center" type={notificationType} messageText={notificationText} delay="3000" />}
      <EditPostSection className="grid section">
        <header className="grid-wrapper-column">
          <h1>My profile</h1>
          <h2>Change settings</h2>
        </header>
        <div className="grid-col-4-10">
          <EditPostForm id="profile-form" className="grid-list-2lrg-2mid-2sml form" onSubmit={isAuth && savePost} enctype="multipart/form-data">
            <CoverPhoto className="grid-col-all" imgSrc={postPhoto} title="Your cover photo" />
            <div className="grid-col-all">
              <ButtonFileUpload type="file" id="postImage" name="postImage" accept="image/*" fileName={postPhoto} onChange={e => handlePostPhoto(e)} btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Add picture">
                <FontAwesomeIcon pull="right" icon={solid('file-circle-plus')} size="1x" />
              </ButtonFileUpload>
              { postPhotoError && (<p>{postPhotoError}</p>) }
            </div>
            <div className="grid-col-2-12 fields-position">
              <label className="center" htmlFor="postTitle">Post title:</label>
              <input id="postTitle" name="postTitle" value={title} onChange={(event) => setTitle(event.currentTarget.value)} type="text" placeholder=" Type a post title" />
            </div>
            <div className="grid-col-2-12">
              <label className="center" htmlFor="postBody">
                <FontAwesomeIcon icon={solid('address-card')} size="1x" />
                <span className="user-details">
                Food description:
                </span>
              </label>
              <textarea id="postBody" name="postBody" value={foodDescr} maxLength={maxChars} onChange={(event) => { setFoodDescr(event.currentTarget.value); setPostDescriptionChars(maxChars - event.target.value.length); }} placeholder="Write a description of your food. Max 255 characters" />
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
              <input id="postGeoLat" name="postGeoLat" type="text" value={location.lat} />
            </div>
            <div className="grid-col-7-12 fields-position">
              <label htmlFor="postGeoLng">
                <FontAwesomeIcon className="fa-fw" icon={solid('note-sticky')} size="1x" />
                <span className="user-details">
                  Lng: <em className="requiredField">*</em>
                </span>
              </label>
              <input id="postGeoLng" name="postGeoLng" value={location.lng} type="text" placeholder="" />
            </div>
            <div className="grid-col-all">
              <MapPicker 
                defaultLocation={{lat: location.lat, lng: location.lng}}
                zoom={zoom}
                mapTypeId="roadmap"
                style={{height:'300px'}}
                onChangeLocation={handleChangeLocation} 
                onChangeZoom={handleChangeZoom}
                apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
              />        
            </div>
            <div className="grid-col-all fields-position">
              <ButtonRegular type="submit" formEncType="multipart/form-data" btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Save changes">
                <FontAwesomeIcon pull="right" icon={solid('floppy-disk')} size="1x" />
              </ButtonRegular>
            </div>
            <div className="grid-col-all center">
              <ButtonRegular type="button" onClick={() => postDeleteConfirmation()} btnColor="#630606" btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor="#630606" btnText="Delete post">
                <FontAwesomeIcon pull="right" icon={solid('trash-can')} size="1x" />
              </ButtonRegular>
            </div>
          </EditPostForm>
        </div>
      </EditPostSection>
    </>
  );
};

export default EditPost;