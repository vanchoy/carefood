import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import '../../styles/buttons.scss';

import checkExternal from '../../js/urlPathCheck';

const sharedButtonStyle = css`
  /* ====== BUTTONS SETTINGS ====== */
    /* ~  (Button Rectangle Style #1)  ~ */
      --btn-rec-s1-margin: 0 auto;
      --btn-rec-s1-padding: ${(props) => props.btnPadding ? props.btnPadding : "22px"};
      --btn-rec-s1-width: ${(props) => props.btnWidth ? props.btnWidth : "220px"};
      --btn-rec-s1-max-width: 100%;
      --btn-rec-s1-height: auto;
      --btn-rec-s1-bg: ${(props) => props.btnColor};
      --btn-rec-s1-text-color: ${(props) => props.btnTextColor};
      --btn-rec-s1-font-family: 'Gili Sans', sans-serif;
      --btn-rec-s1-font-size: 18px;
      --btn-rec-s1-text-align: center;
      --btn-rec-s1-text-shadow: -1px 0 #949494;
      --btn-rec-s1-position: relative; /* Edit only if you know what you are doing*/
      --btn-rec-s1-z-index: 0; /* Edit only if you know what you are doing */
      --btn-rec-s1-display: block; /* Edit only if you know what you are doing*/
      --btn-rec-s1-border: none;
      --btn-rec-s1-border-radius: ${(props) => props.btnBorderRadius ? props.btnBorderRadius : "16px"};
      --btn-rec-s1-cursor: pointer;
      --btn-rec-s1-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
      --btn-rec-s1-transition: all .6s;
    /* ----------~(end)~---------- */

    /* Button Rectangle Style Hover */
      --btn-rec-s1-hov-bg: ${(props) => props.btnHover};
      --btn-rec-s1-hov-opacity: 1;
      --btn-rec-s1-hov-text-color: ${(props) => props.btnTextHoverColor};
      --btn-rec-s1-hov-text-shadow: none;
      --btn-rec-s1-hov-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
    /* ----------~(end)~---------- */
  /* =================|END|================= */
`;

const TypeButton = styled.button`${sharedButtonStyle}`;

const TypeInputLabel = styled.label`${sharedButtonStyle}`;

const TypeRouterLink = styled(Link)`${sharedButtonStyle}`;

const ButtonRegular = (props) => {
  let button;
  
  if (!props.linkRef) {
    //console.log('no link')
    button =         
      <TypeButton 
        className="btn-rec-s1" 
        btnColor={props.btnColor} 
        btnHover={props.btnHover}
        btnTextColor={props.btnTextColor}
        btnTextHoverColor={props.btnTextHoverColor}
        onClick={props.onClick} 
        type={props.type}
        btnBorderRadius={props.btnBorderRadius}
        btnWidth={props.btnWidth}
        btnPadding={props.btnPadding}
      >
        {props.btnText}
        {props.children}
      </TypeButton>
    ;
  }
  else if (checkExternal(props.linkRef)) {
    //console.log(props.linkRef)
    button = 
      <TypeButton 
        className="btn-rec-s1" 
        btnColor={props.btnColor} 
        btnHover={props.btnHover}
        btnTextColor={props.btnTextColor}
        btnTextHoverColor={props.btnTextHoverColor}
        btnBorderRadius={props.btnBorderRadius}
        btnWidth={props.btnWidth}
        btnPadding={props.btnPadding}
        onClick={props.onClick}
        as="a"
        href={props.linkRef}
        target="_blank" 
        rel="noopener noreferrer"
      >
        {props.btnText}
        {props.children}
      </TypeButton>
    ;
  }
  else {
    //console.log(props.linkRef)
    button = 
      <TypeRouterLink 
        to={props.linkRef} 
        className="btn-rec-s1" 
        btnColor={props.btnColor} 
        btnHover={props.btnHover}
        btnTextColor={props.btnTextColor}
        btnTextHoverColor={props.btnTextHoverColor}
        btnBorderRadius={props.btnBorderRadius}
        btnWidth={props.btnWidth}
        btnPadding={props.btnPadding}
      >
        {props.btnText}
        {props.children}
      </TypeRouterLink>
    ;
  }

  return button;
};

const ButtonFileUpload = (props) => {
  return (
    <>
      <input
        id={props.id}
        type={props.type}
        onClick={props.onClick} 
        onChange={props.onChange} 
        hidden
      />
      <span className="fileNameText">{props.fileName.name}</span>
      <TypeInputLabel 
        className="btn-rec-s1" 
        htmlFor={props.id}
        btnColor={props.btnColor} 
        btnHover={props.btnHover}
        btnTextColor={props.btnTextColor}
        btnTextHoverColor={props.btnTextHoverColor}
        type={props.type}
        btnBorderRadius={props.btnBorderRadius}
        btnWidth={props.btnWidth}
        btnPadding={props.btnPadding}
      >
        {props.btnText}
        {props.children}
      </TypeInputLabel>
    </>
  );
};


export { ButtonRegular, ButtonFileUpload };