import styled from 'styled-components';

import aboutUsImage from '../assets/images/hero-about.jpg';

const AboutSection = styled.section`
  /* ====== SECTION SETTINGS ====== */
    /* ~  (Section Syle)  ~ */
      --section-bg-s1-margin: 0 auto;
      --section-bg-s1-min_height: 92vh;
      --section-bg-s1-max_height: auto;
      --section-bg-s1-padding: 20px 20px 40px 20px;
      --section-bg-s1-bg_color: rgba(0,0,0, 0.1);
      --section-bg-s1-bg_image: url(${aboutUsImage});
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
        --section-text-padding: 10px 20px 20px 20px;
        --section-text-display: block;
        --section-text-color: #111;
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
        --section-text-padding: 20px 0 0 10px;
        --section-text-display: block;
        --section-text-color: #4e944f;
        --section-font_family: inherit;
        --section-font_size: 26px;
        --section-font_weight: normal;
        --section-font_style: oblique;
        --section-text_decoration: none;
        --section-text_align: left;
        --section-text_shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        --section-text-line_height: 1.3;
      }
    /* ----------~(end)~---------- */
      
    /* ~  (Section H3 Style)  ~ */
      h3 {
        --section-text-margin: 0 auto;
        --section-text-padding: 0 20px 0 10px;
        --section-text-display: block;
        --section-text-color: #000;
        --section-font_family: inherit;
        --section-font_size: 18px;
        --section-font_weight: bold;
        --section-font_style: oblique;
        --section-text_decoration: none;
        --section-text_align: left;
        --section-text_shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
        --section-text-line_height: 1.3;
      }
    /* ----------~(end)~---------- */

    /* ~  (Section Paragraph Style)  ~ */
      p {
        --section-text-margin: 0 auto;
        --section-text-padding: 10px;
        --section-text-display: block;
        --section-text-color: #000;
        --section-font_family: inherit;
        --section-font_size: 18px;
        --section-font_weight: normal;
        --section-font_style: normal;
        --section-text_decoration: none;
        --section-text_align: left;
        --section-text_shadow: none;
        --section-text-line_height: 1.5;
      }
    /* ----------~(end)~---------- */

      article {
        padding: 30px 100px 40px 100px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 60px;
    
        backdrop-filter: blur(1px);
        box-shadow: 9px 9px 13px 0 rgb(255 255 255 / 25%), -9px -9px 13px 0 rgb(255 255 255 / 25%);
      }

      @media screen and (max-width:550px) {
        article {
          padding: 20px;
        }
      }

  /* For more settings go to ["styles/index.scss"] */
  /* =================|END|================= */
`;

const AboutPage = () => {
  return (
    <AboutSection className="grid section">  
      <article className="grid-col-4-10">
        <header className="grid-wrapper-column">
          <h1>More about this project</h1>
        </header>
        <h2>HOW DID IT ALL BEGIN?</h2>
        <p>
          Founded in 2022, CareFood saved its first meal in Aarhus in May 2022. The initial idea of the
          founders was to focus on food that became waste at the end of the day in households. Whilst
          developing this concept, they quickly realised that it could be extended to all kinds of food
          service providers such as restaurants and cafes, bakeries and hotels.
        </p>
        <h2>ABOUT THE COMPANY</h2>
        <p>
          The company’s overall vision is “a planet with no food waste”. To achieve this, it is actively
          empowering and inspiring everyone to fight food waste together by building a movement
          comprised of four pillars. On top of its direct impact, achieved through the app, it also has an
          indirect impact through the four pillars, each with different targets to be met at the end of 2025.
        </p>
        <p>
          1st pillar: It specifically targets households, as almost half the food wasted in Europe happens
          at this stage. The pillar provides educational messages with tips and tricks that can reduce food
          waste on a daily basis by better buying, storing and cooking. The overall goal is also for citizens
          to regain an understanding of the value of food, and to make the issue more visible.
        </p>
        <p>
          2nd pillar: It targets businesses, with the aim of going beyond just retail and food services to
          address food waste and losses happening further upstream in the food value chain. It contains
          plans to improve the sustainability agendas of the businesses partners the company already
          works with.
        </p>
        <p>
          3rd pillar: The 3rd pillar focuses on schools, targeting younger generations with the creation of
          educational toolkits that contain exercises and guides for teachers.
        </p>
        <p>
          4th pillar: It focuses on public affairs. The company wants to engage with policy-makers to
          make sure the right regulatory framework is adopted to reduce food waste and enable change
          to make food systems more sustainable.   
        </p>
      </article>
    </AboutSection>
  )
};

export default AboutPage;