import styled from 'styled-components';

import coverPhoto from '../assets/images/default-cover-photo.jpg';

const CoverContainer = styled.div`
    width: 100%;
    height: 250px;
    margin: 0 auto;
    display: relative;
    z-index: 1;

    @media screen and (max-width:550px) {
      height: 100px;
    }
`;

const CoverImg = styled.img`
    width: inherit;
    max-width: inherit;
    height: inherit;
    border-radius: 60px 60px 0 0;
    object-fit: cover;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.16);
`;

const CoverPhoto = (props) => {

  return (
    <CoverContainer className={props.className}>
      <CoverImg src={props.imgSrc || coverPhoto} alt={props.title} />
      {props.children}
    </CoverContainer>
  );
}

export default CoverPhoto;