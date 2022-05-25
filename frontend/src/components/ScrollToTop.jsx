import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

const ScrollToTopContainerStyle = styled.div`
    position: fixed;
    bottom: 35px;
    right: 0;
    margin-right: 30px;
    display: ${(props) => props.isVisible ? 'block' : 'none'};
    z-index: 9999;

    @media screen and (max-width:1024px) {
      bottom: 20px;
      margin-right: 20px;
    }
`;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollTop();
  }, [pathname]);
  
  return null;
};

const ScrollToTopContainer = (props) => {
  const [visible, setVisible] = useState(false);
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true);
    } 
    else if (scrolled <= 300){
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
  }, []);

  
  return (
    <ScrollToTopContainerStyle isVisible={visible}>{props.children}</ScrollToTopContainerStyle>
  );
}

const scrollTop = () => {
  window.scrollTo({
    top: 0, 
    behavior: 'smooth'/* you can also use 'auto' behaviour in place of 'smooth' */
  });
};

export { ScrollToTop };
export { ScrollToTopContainer };
export { scrollTop };