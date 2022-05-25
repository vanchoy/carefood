import styled from 'styled-components';

import { executeScroll } from '../../js/scroll';

const ArrowAnimated = styled.div`
  width: 60px;
  height: 60px;
  padding: 10px;
  background-color: ${(props) => props.arrColor ? props.arrColor : "rgba(255,255,255,0.3)"};
  vertical-align: middle;

  border-radius: 50%;
  cursor: pointer;

  .arrow {
    margin: 0 auto;
    width: 30px;
    height: 30px;
    transform: rotate(45deg);
    border-left: none;
    border-top: none;
    border-right: 3px solid #fff;
    border-bottom: 3px solid #fff;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-name: arrowAnm;
  }

  @keyframes arrowAnm {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
  }
`;

const ButtonArrow = (props) => {
  return (
    <>
      <ArrowAnimated className={props.className} arrColor={props.arrColor} onClick={() => executeScroll(props.onClick)}>
        <div className="arrow"></div>
      </ArrowAnimated>
    </>
  );
}; 

export default ButtonArrow;