import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import '../styles/footer.scss';

const Footer = () => {
  return (
    <footer className="footer-container">
      <p><FontAwesomeIcon className="footer-container_icon" icon={solid('copyright')} size="1x" /> Care Food 2022 | All rights reserved</p>
    </footer>
  );
}

export default Footer;
