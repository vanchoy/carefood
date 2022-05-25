import { useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const CopyToClipboardStyle = styled.span`
/* =================|START|================= */
    font-style: oblique;
    color: #999;
    display: inline-block;

    &:hover {
        color: #b26acf;
        
        span {
            left: 0;
            right: 0;
            margin: 0 auto;
            padding: 10px;
            max-width: 200px;
            display: block;
            text-align: center;
            font-style: normal;
            color: #b26acf;
            background-color: #f9f9f9;
            border-radius: 9px;
            position: absolute;
            font-size: 16px;
            z-index: 9999;
            box-shadow: 0 3px 6px 0 rgba(0,0,0,0.2)
        }
    }
    
    span {
        display: none;
    }
    
/* =================|END|================= */
`;

const CopyToClipboard = (props) => { 
  const [toolTipText, setToolTipText] = useState(props.toolTipText);
  const [timer, setTimer] = useState(null);

  const copyText = () => {
    clearTimeout(timer);

    navigator.clipboard.writeText(props.textToCopy);
    
    setToolTipText("Copied!");
    setTimer(setTimeout(()=>setToolTipText(props.toolTipText), 1600));
    
  }

  return (
    <CopyToClipboardStyle onClick={copyText}>{props.children} <FontAwesomeIcon className="center" icon={solid('copy')} size="1x" /><span>{toolTipText}</span></CopyToClipboardStyle>
  );
}

export default CopyToClipboard;