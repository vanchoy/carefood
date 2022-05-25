import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import '../styles/form.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { postslist } from '../api/ApiService';
import CoverPhoto from '../components/CoverPhoto';

import SearchBar from '../components/SearchBar';
import { ButtonRegular } from '../components/buttons/ButtonRegular';
import { buttonColor, whiteRegular } from '../constants/styles';
import LoaderAnimation from '../components/LoaderAnimation';
import { searchPosts } from '../js/search';
import gridColumns from '../js/gridColumns';

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
    
    .food-item-pos {
      margin: 15px !important;
    }

    .formContainer {
      min-height: 92vh;
    }

  /* For more settings go to ["styles/index.scss"] */
  /* =================|END|================= */
`;

const FoodForm = styled.div`
  /* ====== POST FORM STYLE ====== */
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

    /* ~ (Post details overlay settings) ~ */
      .overlay {
          width: 100%;
          margin: -43px auto 0 0;
          position: relative;
          z-index: 1;
      }
    /* ----------~(end)~---------- */ 

    /* ~ (Post details settings) ~ */
      .post-details-container {
          width: 100%;
          height: auto;
          background-color: rgba(0,0,0,0.6);
          color: #fff;
          font-size: 14px;
          text-align: center;
          padding: 12px 20px;
          z-index: 9;

          .post-details {
            padding: 0 8px;
            font-size: 16px;
            text-align: center;
            display: inline-block;

            span {
              margin-left: 5px;
            }
          }
      }
    /* ----------~(end)~---------- */ 

    .button-pos {
      margin: 20px auto;
    }
  /* =================|END|================= */
`;

const UsersList = () => {
  const [posts, setPosts] = useState();
  const [postsCopy, setPostsCopy] = useState([]);
  const navigate = useNavigate();

  //get posts data
  const getPosts = async () => {
    const url = postslist;
    const response = await fetch(url);
    const responseData = await response.json();

    if (responseData.data) {
      setPosts(responseData.data);
      setPostsCopy(responseData.data);
      //console.log(responseData.data);
    }
    else {
      navigate('/404');
    }
  };

  //show posts
  const showPosts = () => {
    return postsCopy.map((post, id) => {
      return (
        <div key={id} className={`${gridColumns(posts, 2, id)} food-item-pos`}>
          <FoodForm className="grid form">
            <CoverPhoto className="grid-col-all" imgSrc={post.image} title="User cover photo">
              <div className="overlay">
                <div className="post-details-container">
                  {
                    post.createdAt && (
                      <>
                        <div className="post-details">
                          <FontAwesomeIcon className="fa-fw" icon={solid('calendar')} size="1x" />
                          <span>{post.createdAt.replace(/(.{10})..+/, "$1")}</span>
                        </div>
                        <div className="post-details">
                          <FontAwesomeIcon className="fa-fw" icon={solid('user')} size="1x" />
                          <span>{post.username}</span>
                        </div>
                      </>
                    )
                  }   
                </div>        
              </div>
            </CoverPhoto>
            <div className="grid-col-all">
              <h3>
                {post.title.replace(/(.{40})..+/, "$1…")}
              </h3>
            </div> 
            <div className="grid-col-all button-pos">
              <ButtonRegular type="button" linkRef={`/food/${post.title}`} btnColor={buttonColor} btnHover="#ebba00" btnTextColor={whiteRegular} btnTextHoverColor={whiteRegular} btnText="View post">
                <FontAwesomeIcon pull="right" icon={solid('circle-chevron-right')} size="1x" />
              </ButtonRegular>
            </div>       
          </FoodForm>
        </div>
      );
    }

    )
  };

  const handleSearch = async (e) => {
    let value = e.target.value;

    if (value.length >= 0) {
      let search = await searchPosts(posts, value);
      setPostsCopy(search);
    } 
    else {
      setPostsCopy(posts);
    }
  };
  
  useEffect(() => {
    getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FoodSection className="grid section">
      <header className="grid-wrapper-column">
        <h1>Food posts</h1>
        <h2>List of food posts</h2>
      </header>
      <div className="grid-col-5-9">
        <SearchBar onChange={handleSearch} placeholder="Search food by keywords" />
      </div>
      <div className="grid-col-2-12 formContainer">
        <div className="grid-list-3lrg-3mid-2sml">
          { posts ? showPosts() : <LoaderAnimation/> }
        </div>
      </div>
    </FoodSection>
  );
};

export default UsersList;