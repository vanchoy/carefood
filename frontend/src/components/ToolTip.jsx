import styled from 'styled-components';

const ToolTipStyle = styled.span`
  /* =================|START|================= */
    color: ${(props) => props.textColor};

    &:hover {
      .toolTipBox {
          left: 1%;
          right: 1%;
          margin: 0 auto;
          padding: 10px;
          width: 100%;
          max-width: 260px;
          text-align: left;
          font-family: "Arial", sans-serif;
          display: block;
          line-height: 1.3;
          background-color: #f9f9f9;
          border-radius: 9px;
          position: absolute;
          z-index: 9999;
          box-shadow: 0 3px 6px 0 rgba(0,0,0,0.2);
          text-shadow: none;
      }
    }
    
    .toolTipBox {
        display: none;
    }

    .manual-text {
        font-size: 14px !important;
        color: #999;
        font-style: normal;
    }

    .toolTipText {
        font-size: 14px !important;
        font-style: oblique;
        color: #2081e2;
    }
    
  /* =================|END|================= */
`;

const ToolTip = (props) => { 

  return (
    <ToolTipStyle textColor={props.textColor}>
      {props.children}
      <span className="toolTipBox">
        <span className="manual-text">
          {props.toolTipManualText}
        </span>
        <span className="toolTipText">
          {props.toolTipText}
        </span>
      </span>
    </ToolTipStyle>
  );
}

export default ToolTip;