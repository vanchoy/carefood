import styled from 'styled-components';

import defaultAvatar from '../assets/images/default-user-avatar.png';

const ImgCointainer = styled.div`
  margin: -120px auto 0 auto;
  width: 200px;
  max-width: 200px;
  height: 200px;
  object-fit: cover;
  position: block;

  @media screen and (max-width:550px) {
    margin: 10px auto;
  }
`;

const AvatarImg = styled.img`
  width: inherit;
  height: inherit;
  border: 3px solid #fff;
  position: relative;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 3px 6px rgba(0,0,0, 0.06);
`;

const Avatar = (props) => {

  return (
    <div className={props.className}>
      <ImgCointainer>
        <AvatarImg src={props.imgSrc || defaultAvatar} alt={props.title} />
      </ImgCointainer>
      {props.children}
    </div>
  );
}

export default Avatar;