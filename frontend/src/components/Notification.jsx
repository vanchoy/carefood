import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const NotificationStyle = styled.div`
    max-width: 100%;
    max-height: 100%;
    position: fixed;
    margin-left: auto;
    margin-right: auto;

    left: 0;
    right: 0;
    text-align: center;
    z-index: 9999;
    background-color: 
    ${(props) => 
    props.type === "error" ? "#630606" 
      : props.type === "success" ? "#4e944f" 
        : props.type === "warning" ? "orange" 
          : "grey"};

    text-align: center;
    
    p {
      color: #fff;
      padding: 20px;
    }
    span {
      padding: 10px;
    }
  }
`;

const Notification = (props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, props.delay);
  }, [props.delay]);

  return (
    visible &&
    <NotificationStyle type={props.type}>
      <p>
        {props.messageText}
        <span>
          {props.type === 'error' && <FontAwesomeIcon icon={solid('circle-exclamation')} size="1x" />}
          {props.type === 'success' && <FontAwesomeIcon icon={solid('circle-check')} size="1x" />}
          {props.type === 'warning' && <FontAwesomeIcon icon={solid('triangle-exclamation')} size="1x" />}
        </span>
      </p>
    </NotificationStyle>
  )
  

};

export default Notification;