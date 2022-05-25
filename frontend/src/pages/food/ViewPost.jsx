import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapPicker from 'react-google-map-picker';

import styled from 'styled-components';
import '../../styles/form.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import {postslist} from '../../api/ApiService';
import CoverPhoto from '../../components/CoverPhoto';
import { ButtonRegular } from '../../components/buttons/ButtonRegular';
import { buttonColor, whiteRegular } from '../../constants/styles';

import LoaderAnimation from '../../components/LoaderAnimation';

const PostSection = styled.section`
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
        --section-text-padding: 0 20px 0 20px;
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

const PostForm = styled.div`
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
        margin: 10px !important;
    }

    .dashed-line {
      width: 100%;
      border-bottom: 2px dashed #e0e0e0;
    }

    .contact-icons {
        margin: 10px;
        color: ${buttonColor}
    }

    .go-back-button {
      top: 20px !important;
      left: 10px !important;
      position: relative !important;
      z-index: 9;
      text-align: left !important;
    }

    .cover-img-pos {
      top: -48px !important;
      position: relative !important;
      text-align: left !important;
      z-index: 1;
    }
    
  /* =================|END|================= */
`;

const apiKey = 'AIzaSyCvMkgl5e55gQUcDH6xekj_NHN3tsrWiEo';

const ViewPost = ({isAuth}) => {

  const [userAuthenticated] = useState(JSON.parse(localStorage.getItem("authUser")));
  const postPath = window.location.pathname.split('/');
  const [post, setPost] = useState();
  const [editPost, setEditPost] = useState(false);
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(15);
  
  //get post data
  const getPost = async () => {
    const url = `${postslist}?title=${postPath[2]}`;
    const response = await fetch(url);
    const responseData = await response.json();

    if (responseData.data.length === 1) {
      setPost(responseData.data[0]);
      //console.log(responseData.data[0].geoLat);

      if (responseData.data[0].uid === userAuthenticated.id) {
        setEditPost(true);
      }

    }
    else {
      navigate('/404');
    }
  };

  const showPost = () => {

    const postGeoLocation = () => {
      return (
        <MapPicker defaultLocation={{lat: post.geoLat, lng: post.geoLng}}
          zoom={zoom}
          mapTypeId="roadmap"
          style={{height:'300px'}}
          apiKey={apiKey}
        />
      );
    };

    return (
      <PostForm className="grid form">
        <div className="grid-col-all">
          <div className="grid-col-all go-back-button left">
            <ButtonRegular type="button" onClick={() => navigate(-1)} btnColor={whiteRegular} btnHover={buttonColor} btnTextColor={buttonColor} btnTextHoverColor={whiteRegular} btnWidth="auto" btnPadding="13px" btnBorderRadius="50%">
              <FontAwesomeIcon pull="center" icon={solid('circle-chevron-left')} size="1x" />
            </ButtonRegular>  
          </div> 
        </div>
        <CoverPhoto className="grid-col-all cover-img-pos" imgSrc={post.image} title="Post photo" />
        <div className="grid-col-all">
          <h1>
            {post.title}
          </h1>
          <h2>
            {post.username}
          </h2>
        </div>      
        <div className="grid-col-all">
          <p>{post.body}</p>
          <p>Posted at: {post.createdAt}</p>  
        </div>
        <div className="grid-col-all">
          {postGeoLocation()}
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
                      Phone: 
                    </p>
                  </div>
                  <div className="grid-col-all">
                    <p>
                      <span className="contact-icons">
                        <FontAwesomeIcon icon={solid('envelope-open-text')} size="1x" />
                      </span>
                      E-mail: 
                    </p>
                  </div>
                </>
                <>
                  {editPost === true &&
                    (
                      <div className="grid-col-all button-pos">
                        <ButtonRegular type="button" linkRef={`/edit/${post.title}`} btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Edit post">
                          <FontAwesomeIcon pull="right" icon={solid('pen-to-square')} size="1x" />
                        </ButtonRegular>
                      </div>
                    )}
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

      </PostForm>
    )
  };

  useEffect(() => {
    getPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  return (

    <PostSection className="grid section">
      <div className="grid-col-4-10 grid-col-center">
        {post ? showPost() : <LoaderAnimation />}
      </div>
    </PostSection>
  );
};

export default ViewPost;