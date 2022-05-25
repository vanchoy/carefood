import styled from 'styled-components';

import mediaImage from '../assets/images/media-wallpaper.jpg';

const MediaSection = styled.section`
  /* ====== SECTION SETTINGS ====== */
    /* ~  (Section Syle)  ~ */
      --section-bg-s1-margin: 0 auto;
      --section-bg-s1-min_height: 92vh;
      --section-bg-s1-max_height: auto;
      --section-bg-s1-padding: 20px 20px 40px 20px;
      --section-bg-s1-bg_color: rgba(0,0,0, 0.4);
      --section-bg-s1-bg_image: url(${mediaImage});
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

const MediaPage = () => {
  return (
    <MediaSection className="grid section">  
      <article className="grid-col-4-10">
        <header className="grid-wrapper-column">
          <h1>How to reduce your food waste at home</h1>
        </header>
        <p>
            1. Plan your meals <br />
            2. Know how to store your food <br />
            3. Understand ‘use by’ vs ‘best before’ dates <br />
            4. Use what you have <br />
        </p>
        <h2>1. Plan your meals</h2>
        <p>
            It’s only a bargain if we can use the food in time! Be aware that our
            schedules can be busy and unpredictable. ‘Buy-one-get-one-free’ and
            other bulk deals lead to buying more than we need, shifting the waste
            from the store to our home. In food waste terms, it’s wise not to buy
            more than needed.
        </p>
        <p> Simple tips can help you to only buy what you need: </p>
        <p>
            Prepare a meal plan for the week. <br />
            Check or take a photo of what’s left in the fridge and cupboards before shopping, so you know what you have. <br />
            Go food shopping after a meal rather than right before. <br />
            Use a shopping list, noting the amounts required. <br />
            Factor in potential eating out occasions. <br />
            Give imperfect fruit and vegetables a chance, they are perfectly edible and nutritious. <br />
        </p>
        <h2>2. Know how to store your food</h2>
        <p>
            Make sure food doesn’t disappear in the cupboards or fridge by
            applying the first-in-first-out principle. Fresh groceries go behind
            products nearer to expiry dates which move closer and more visible.
            Organise the fridge by keeping ready to eat foods such as leftovers on
            the top shelf and sealed raw meat and fish on the bottom shelf to
            avoid dripping. Reserve a separate drawer for fruit and vegetables.
            Keep track of food storage at home by using a digital storage guide,
            smart fridge, app or online template.
        </p>
        <h2>3. Undertsand 'use by' vs 'best before' dates</h2>
        <p>
            'Best before' dates are more flexible than use by date. After this date,
            foods such as dried beans, lentils, and pasta, can be consumed
            safely, although their quality may have decreased (for example,
            changes in flavour, colour, texture). Trusting our senses should be
            sufficient to detect the quality of foods with these labels.
        </p>
        <h2>4. Use what you have</h2>
        <p>
            Check what’s in the fridge and cupboards regularly and use up foods nearing their expiry dates.
            Combine any vegetables left into a ‘clean-out-the-fridge’ pot of pasta, soup, omelette, or stir fry. We get to enjoy a new recipe and avoid throwing out good food.
            Get creative, find recipes on how to cook with few ingredients
            Freeze food before its use-by date. Frozen fruits can make a nice addition to smoothies!
        </p>
        <h2>5. Avoid serving too much</h2>
        <p>Here are some simple practices that help:</p>
        <p>
            Serve small portions and come back for seconds, rather than scraping excess food from our plates into the bin. <br />
            Use smaller sized plates to serve food. <br />
            Measure portion sizes with low-cost kitchen helpers such as measuring cups and scoops for appropriate portion sizes. <br />
            Improve the dining experience by being mindful, eating away from a screen and taking more time <br />
            Use leftovers for lunch the next day. Not enough leftovers for a whole meal? Mix and match from different meals, add some salad or bread, and a feast appears before us! <br />
            Freeze for later. For the tastiest results, frozen leftovers should be used within three months (more on how to safely handle them here) <br />
            Date-label leftovers <br />
            Ask for a doggy bag when dining out, it is okay to take leftovers and there should be no shame about it. Bringing a container can also help reduce packaging waste. <br />
            Share tasty leftover recipes with friends and family, host a meal where you cook with leftover food or initiate a food waste contest in your community. <br />
        </p>
        <h2>6. Know your moulds</h2>
        <p>
            If mould appears, whether we can still ‘rescue’ the food depends on what it is. The following general rules can help us know what to do.
        </p>
        <p>
            Hard foods should be safe to consume once the mouldy part is
            removed along with the surrounding area. This includes hard cheeses,
            hard cured meats (such as salami and ham) and firm fruits and
            vegetables (such as cabbages bell peppers, root vegetables).
        </p>
        <p>
            Soft foods should be thrown out once they start to mould. This
            includes cooked leftovers, soft cheeses, yoghurts and other dairy
            products, bread, jams and soft fruits and veggies (such as cucumbers,
            peaches, tomatoes, berries and so on). This is because mould can
            spread in soft foods (and we might not even see it).
        </p>
        <h2>7. Share extra food with others</h2>
        <p>
            If the food is still safe, but we know we won’t be able to use it ourselves, there are ways to share:
        </p>
        <p>
            Ask around, friends or colleagues could make use of what we won’t. <br />
            Check if there are food banks around that accept donations and distribute them to people in need. <br />
            Invite neighbours over for a meal, it’s not only a nice way to gain new friends. <br />
        </p>
        <h2>8. Repurpose waste where possible</h2>
        <p>
            Try to repurpose food scraps before they make it to the compost bin.
            Broccoli stems and florets can be chopped and cooked, cauliflower
            leaves can be baked, potatoes can be oven baked with skin, herbs
            can be frozen in cubes, roasted celery leaves can be used as a
            seasoning and other scraps can be transformed into homemade
            stock!
        </p>
        <p>
            Keep a food waste diary and scribble down creative ways to stop wasting food. Use Apps or find templates online. <br />
            Pick up food from restaurants and stores that would otherwise be wasted. There are plenty of inspiring and growing initiatives to share, exchange or buy otherwise wasted food. Scroll down for a full list of European initiatives and Apps. <br />
        </p>
        <p>
            For what can’t be saved, composting is an option. Composting a
            natural process where microorganisms biodegrade food waste, turning
            it into a dark, earthy, nutrient-rich material that promotes healthy soil.
            Note that while composting food at home does not reduce food waste,
            it can go a small way to helping reduce the environmental impact by
            repurposing waste into compost that helps nourish the soil.
        </p>
        <p>
            Community composting and separate food waste bins are a step
            in the right direction. We can check with our local government, to
            see what kind of food waste collection is available. <br />
            Or we can feed our garden! Compost is an affordable organic
            alternative to purchased fertiliser, but it’s best to stick to
            plant-based foods (as meat and animal products could lead to
            bad smells and pests). <br />
        </p>

      </article>
    </MediaSection>
  )
};

export default MediaPage;