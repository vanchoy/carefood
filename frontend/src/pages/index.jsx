import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ButtonRegular } from '../components/buttons/ButtonRegular';
import ButtonArrow from '../components/buttons/ButtonArrow';
import CoverPhoto from '../components/CoverPhoto';
import { postslist } from '../api/ApiService';
import gridColumns from '../js/gridColumns';
import heroWallpaper from '../assets/images/welcome-wallpaper.jpg';
import heroEdu from '../assets/images/hero-edu.jpg';
import partner1 from '../assets/images/partner1.png';
import partner2 from '../assets/images/partner2.png';
import partner3 from '../assets/images/partner3.png';
import partner4 from '../assets/images/partner4.png';
import callToAction from '../assets/images/call-to-action-wallpaper.jpg';
import { buttonColor, whiteRegular, buttonHoverColor } from '../constants/styles';
import '../styles/form.scss';

const HeroSectionStyle = styled.section`
  /* ====== SECTION SETTINGS ====== */
    /* ~  (Section Syle)  ~ */
      --section-bg-s1-margin: 0 auto;
      --section-bg-s1-min_height: 100vh;
      --section-bg-s1-max_height: auto;
      --section-bg-s1-padding: 20px;
      --section-bg-s1-bg_color: rgba(0,0,0, 0.6);
      --section-bg-s1-bg_image: url(${heroWallpaper});
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
        --section-text-padding: 0px;
        --section-text-display: block;
        --section-text-color: #fff;
        --section-font_family: inherit;
        --section-font_size: 64px;
        --section-font_weight: bold;
        --section-font_style: normal;
        --section-text_align: center;
        --section-text_decoration: none;
        --section-text_shadow: 1px 1px 1px #8B4513;
        --section-text-line_height: 1.5;
      }
    /* ----------~(end)~---------- */

    /* ~  (Section SubTitle)  ~ */
      h2 {
        --section-text-margin: 0 auto;
        --section-text-padding: 0 20px 20px 20px;
        --section-text-display: block;
        --section-text-color: #fff;
        --section-font_family: inherit;
        --section-font_size: 46px;
        --section-font_weight: normal;
        --section-font_style: oblique;
        --section-text_decoration: none;
        --section-text_align: center;
        --section-text_shadow: 1px 1px 1px #666;
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
        --section-text-padding: 10px;
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

    .oblique-text {
      font-style: italic;
      text-decoration: underline dotted #fff;
    }

    .buttons-position {
      padding: 10px;
    }

  /* For more settings go to ["styles/index.scss"] */
  /* =================|END|================= */
`;

const LatestFoodSectionStyle = styled.section`
  --section-bg-s1-margin: 0 auto;
  --section-bg-s1-min_height: auto;
  --section-bg-s1-max_height: auto;
  --section-bg-s1-padding: 20px 20px 40px 20px;
  --section-bg-s1-bg_color: #f0f0f0;out
  --section-bg-s1-bg_image: none;
  --section-bg-s1-bg_attachment: none;
  --section-bg-s1-bg_position: relative;
  --section-bg-s1-bg_repeat: none;
  --section-bg-s1-bg_blend_mode: none;
  --section-bg-s1-bg_size: border-box;
  --section-bg-s1-box_shadow: none;

    h1 {
      --section-text-margin: 0 auto;
      --section-text-padding: 20px 20px 10px 20px;
      --section-text-display: block;
      --section-text-color: ${buttonColor};
      --section-font_family: inherit;
      --section-font_size: 36px;
      --section-font_weight: bold;
      --section-font_style: normal;
      --section-text_align: center;
      --section-text_decoration: none;
      --section-text_shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
      --section-text-line_height: 1.5;
    }

    h2 {
      --section-text-margin: 0 auto;
      --section-text-padding: 0 20px 40px 20px;
      --section-text-display: block;
      --section-text-color: #666;
      --section-font_family: inherit;
      --section-font_size: 20px;
      --section-font_weight: normal;
      --section-font_style: oblique;
      --section-text_decoration: none;
      --section-text_align: center;
      --section-text_shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
      --section-text-line_height: 1.3;
    }

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

    p {
      --section-text-margin: 0 auto;
      --section-text-padding: 10px;
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

    .post-item-pos {
      margin: 10px;
    }

    .buttons-position {
      margin: 40px;
    }
    /* For more settings go to ["styles/index.scss"] */
`;

const CallToActionSectionStyle = styled.section`
  /* ====== SECTION SETTINGS ====== */
  /* ~  (Section Syle)  ~ */
    --section-bg-s1-margin: 0 auto;
    --section-bg-s1-min_height: 100vh;
    --section-bg-s1-max_height: auto;
    --section-bg-s1-padding: 20px;
    --section-bg-s1-bg_color: rgba(0,0,0, 0.5);
    --section-bg-s1-bg_image: url(${callToAction});
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
      --section-text-padding: 0px;
      --section-text-display: block;
      --section-text-color: #fff;
      --section-font_family: inherit;
      --section-font_size: 60px;
      --section-font_weight: bold;
      --section-font_style: normal;
      --section-text_align: center;
      --section-text_decoration: none;
      --section-text_shadow: 1px 1px 1px #8B4513;
      --section-text-line_height: 1.5;
    }
  /* ----------~(end)~---------- */

  /* ~  (Section SubTitle)  ~ */
    h2 {
      --section-text-margin: 0 auto;
      --section-text-padding: 20px;
      --section-text-display: block;
      --section-text-color: #fff;
      --section-font_family: inherit;
      --section-font_size: 46px;
      --section-font_weight: normal;
      --section-font_style: oblique;
      --section-text_decoration: none;
      --section-text_align: center;
      --section-text_shadow: 1px 1px 1px #666;
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

    .oblique-text {
      font-style: italic;
      text-decoration: underline dotted #fff;
    }

/* For more settings go to ["styles/index.scss"] */
/* =================|END|================= */
`;

const PartnersSectionStyle = styled.section`
  --section-bg-s1-margin: 0 auto;
  --section-bg-s1-min_height: auto;
  --section-bg-s1-max_height: auto;
  --section-bg-s1-padding: 20px 20px 40px 20px;
  --section-bg-s1-bg_color: #f9f9f9;
  --section-bg-s1-bg_image: none;
  --section-bg-s1-bg_attachment: none;
  --section-bg-s1-bg_position: relative;
  --section-bg-s1-bg_repeat: none;
  --section-bg-s1-bg_blend_mode: none;
  --section-bg-s1-bg_size: border-box;
  --section-bg-s1-box_shadow: none;

    h1 {
      --section-text-margin: 0 auto;
      --section-text-padding: 0 20px 10px 20px;
      --section-text-display: block;
      --section-text-color: ${buttonColor};
      --section-font_family: inherit;
      --section-font_size: 36px;
      --section-font_weight: bold;
      --section-font_style: normal;
      --section-text_align: center;
      --section-text_decoration: none;
      --section-text_shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
      --section-text-line_height: 1.5;
    }

    h2 {
      --section-text-margin: 0 auto;
      --section-text-padding: 0 20px 0 20px;
      --section-text-display: block;
      --section-text-color: #666;
      --section-font_family: inherit;
      --section-font_size: 20px;
      --section-font_weight: normal;
      --section-font_style: oblique;
      --section-text_decoration: none;
      --section-text_align: center;
      --section-text_shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
      --section-text-line_height: 1.3;
    }

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

    p {
      --section-text-margin: 0 auto;
      --section-text-padding: 10px;
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

    .partnerContainer {
      width: auto;
      max-height: 200px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
      display: inline-block;
    }

    /* For more settings go to ["styles/index.scss"] */
`;

const HeroEduSectionStyle = styled.section`
  /* ====== SECTION SETTINGS ====== */
  /* ~  (Section Syle)  ~ */
  --section-bg-s1-margin: 0 auto;
  --section-bg-s1-min_height: 100vh;
  --section-bg-s1-max_height: auto;
  --section-bg-s1-padding: 20px;
  --section-bg-s1-bg_color: rgba(0,0,0, 0.6);
  --section-bg-s1-bg_image: url(${heroEdu});
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
        --section-text-padding: 0px;
        --section-text-display: block;
        --section-text-color: #fff;
        --section-font_family: inherit;
        --section-font_size: 64px;
        --section-font_weight: bold;
        --section-font_style: normal;
        --section-text_align: center;
        --section-text_decoration: none;
        --section-text_shadow: 1px 1px 1px #8B4513;
        --section-text-line_height: 1.5;
      }
    /* ----------~(end)~---------- */

    /* ~  (Section SubTitle)  ~ */
      h2 {
        --section-text-margin: 0 auto;
        --section-text-padding: 0 20px 20px 20px;
        --section-text-display: block;
        --section-text-color: #fff;
        --section-font_family: inherit;
        --section-font_size: 46px;
        --section-font_weight: normal;
        --section-font_style: oblique;
        --section-text_decoration: none;
        --section-text_align: center;
        --section-text_shadow: 1px 1px 1px #666;
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
      --ctc-form-bg-color: rgba(255, 255, 255, 0.6);
      --ctc-form-padding: 0;
    /* ----------~(end)~---------- */

    .button-pos {
      margin: 10px !important;
      display: inline-block !important;
    }

    .location {
      color: #b0b0b0;
      font-style: italic;
    }
    
  /* =================|END|================= */
`;

const MainPage = () => {
  const [isAuth] = useState(localStorage.getItem("isAuth"));
  const [posts, setPosts] = useState([]);
  const heroRef = useRef(0);
  const ctaRef = useRef(0);
  const videoRef = useRef(0);

  const getUserPosts = async () => {
    const url = `${postslist}index.php?skip=0&limit=8`;
    
    const response = await fetch(url);
    const responseData = await response.json();
    //console.log(responseData)

    if (responseData.data) {
      setPosts(responseData.data);
    }
  };

  const showPosts = () => {

    return posts.map((post, id) => {

      console.log(post)
      return (
        <div key={id} className={`${gridColumns(posts, 2, id)} post-item-pos`}>
          <FoodForm className="grid form">
            <CoverPhoto className="grid-col-all" imgSrc={post.image} title="User's food post photo" />
            <div className="grid-col-all user">
              <h3>
                {post.title.replace(/(.{55})..+/, "$1…")}
              </h3>
            </div> 
            <div className="grid-col-all center">
              <div className="button-pos">
                <ButtonRegular type="button" linkRef={`/food/${post.title}`} btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnWidth="auto" btnBorderRadius="50%" btnPadding="19px">
                  <FontAwesomeIcon pull="center" icon={solid('circle-chevron-right')} size="1x" />
                </ButtonRegular>
              </div>
            </div>
          </FoodForm>
        </div>
      );
    }

    )
  };

  useEffect(() => {
    getUserPosts();
  }, [posts]);

  return (
    <>
      {
        !isAuth && (
          <HeroSectionStyle className="grid-list-2lrg-2mid-2sml section">
            <header className="grid-wrapper-column grid-col-center">
              <h1>
                Hello <em className="oblique-text">mortals</em>, and welcome to Care Food
              </h1>
              <h2>
                Love food, don't waste it :)
              </h2>
            </header>
            <div className="grid-col-4-7 buttons-position">
              <ButtonRegular type="button" linkRef="/login" btnColor={buttonColor} btnHover={buttonHoverColor} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Login">
                <FontAwesomeIcon pull="right" icon={solid('right-to-bracket')} size="1x" />
              </ButtonRegular>
            </div>
            <div className="grid-col-7-10 buttons-position">
              <ButtonRegular type="button" linkRef="/register" btnColor={buttonColor} btnHover={buttonHoverColor} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Register">
                <FontAwesomeIcon pull="right" icon={solid('user-plus')} size="1x" />
              </ButtonRegular>
            </div>
            <ButtonArrow className="grid-col-all center" onClick={heroRef} />
          </HeroSectionStyle>
        )
      }
      <LatestFoodSectionStyle className="grid-list-2lrg-2mid-1sml section" ref={heroRef} >
        <header className="grid-wrapper-column">
          <h1>Latest food</h1>
          <h2>Check out the latest food</h2>
        </header>
        {
          posts &&
          (       
            <div className="grid-col-2-12">
              <div className="grid-list-4lrg-3mid-2sml">
                { showPosts() }
              </div>
            </div>
          )
        }
        <div className="grid-wrapper-column buttons-position">
          <ButtonRegular type="button" linkRef="/food" btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="See more">
            <FontAwesomeIcon pull="right" icon={solid('circle-chevron-right')} size="1x" />
          </ButtonRegular>
        </div>
        <ButtonArrow className="grid-col-all center" arrColor="#d0d0d0" onClick={videoRef} />
      </LatestFoodSectionStyle>
      <HeroEduSectionStyle className="grid section" ref={videoRef}>
        <header className="grid-wrapper-column grid-col-center">
          <h1>
            Let's prevent food waste together
          </h1>
        </header>
        <div className="grid-wrapper-column grid-col-center">
          <iframe title="Educational video about food waste" src="https://www.youtube.com/embed/rjxwfp8rs34" width="100%" height="600" />
        </div>  
        {
          !isAuth && <ButtonArrow className="grid-col-all center" onClick={ctaRef} />        
        }
      </HeroEduSectionStyle>
      {
        !isAuth && 
          (    
            <CallToActionSectionStyle className="grid-list-1lrg-1mid-1sml section" ref={ctaRef}>
              <header className="grid-wrapper-column grid-col-center">
                <h1>
                  Did you know that in <em className="oblique-text">Denmark</em> 700 000 tons of food are thrown away every year?
                </h1>
                <h2>
                  Let's reduce it together!
                </h2>
              </header>
              <div className="grid-wrapper-column">
                <ButtonRegular type="button" linkRef="/register" btnColor={buttonColor} btnHover={buttonHoverColor} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="Register">
                  <FontAwesomeIcon pull="right" icon={solid('user-plus')} size="1x" />
                </ButtonRegular>
              </div>
            </CallToActionSectionStyle>
          )
      }   
      <PartnersSectionStyle className="grid-list-4lrg-2mid-2sml section">
        <div className="grid-col-1-4 center">
          <img className="partnerContainer" src={partner1} alt="" />
        </div>
        <div className="grid-col-4-7 center">
          <img className="partnerContainer" src={partner2} alt="" />
        </div>
        <div className="grid-col-7-10 center">
          <img className="partnerContainer" src={partner3} alt="" />
        </div>
        <div className="grid-col-10-13 center">
          <img className="partnerContainer" src={partner4} alt="" />
        </div>
      </PartnersSectionStyle>   
    </>
  );
};

export default MainPage;