import styled from 'styled-components';

import error_404_img from '../assets/images/error-404.png';

const NotFound = styled.section`
  /* ====== SECTION SETTINGS ====== */
    /* ~  (Section Syle)  ~ */
      --section-bg-s1-margin: 0 auto;
      --section-bg-s1-min_height: 90vh;
      --section-bg-s1-max_height: auto;
      --section-bg-s1-padding: 20px;
      --section-bg-s1-bg_color: #f9f9f9;
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
        --section-font_size: 26px;
        --section-font_weight: bold;
        --section-font_style: normal;
        --section-text_align: center;
        --section-text_decoration: none;
        --section-text_shadow: 1px 1px 1px #d2d2d2;
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
        --section-font_size: 20px;
        --section-font_weight: normal;
        --section-font_style: oblique;
        --section-text_decoration: none;
        --section-text_align: center;
        --section-text_shadow: 1px 1px 1px #d2d2d2;
        --section-text-line_height: 1.3;
      }
    /* ----------~(end)~---------- */

  /* For more settings go to ["styles/index.scss"] */
  /* =================|END|================= */
`;

const ErrorImg = styled.img`
  max-width: 100%;
`;

const NotFoundPage = () => (
  <NotFound className="grid section">
    <header className="grid-col-all">
      <h1>Got lost on our website?</h1>
      <h2>
        Please navigate through the menu to access a valid page :)
      </h2>
    </header>
    <div className="grid-col-all center">
      <ErrorImg src={error_404_img} alt="Error 404 Page Not Found" />
    </div>
  </NotFound>
);

export default NotFoundPage;
