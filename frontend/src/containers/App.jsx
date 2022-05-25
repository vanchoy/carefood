import { BrowserRouter as Router } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ScrollToTop, ScrollToTopContainer, scrollTop } from '../components/ScrollToTop';
import Header from '../components/Header';
import SoMe from '../components/SoMe';
import Footer from '../components/Footer';

import { ButtonRegular } from '../components/buttons/ButtonRegular';
import { buttonColor, whiteRegular } from '../constants/styles';

import Routing from './Routing';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routing />
      <SoMe />
      <ScrollToTopContainer>
        <ButtonRegular type="button" btnWidth="40px" btnPadding="10px" btnBorderRadius="50%" onClick={scrollTop} btnColor={buttonColor} btnHover={whiteRegular} btnTextColor={whiteRegular} btnTextHoverColor={buttonColor} btnText="">
          <FontAwesomeIcon pull="center" icon={solid('angle-up')} size="1x" />
        </ButtonRegular>
      </ScrollToTopContainer>
      <Footer />
    </Router>
  );
};

export default App;
