import styled from 'styled-components';

import '../styles/form.scss';

import searchImg from '../assets/images/search.png';

const SearchArea = styled.div`
  /* ~  (Form Settings)  ~ */
    --ctc-form-width: 100%;
    --ctc-form-max_width: 100%;
    --ctc-form-height: auto;
    --ctc-form-margin: 40px auto;
    --ctc-form-text-align: center;
    --ctc-form-bg-color: rgba(255, 255, 255, 0.6);
    --ctc-form-padding: 20px;
    border-radius: 60px;
  /* ----------~(end)~---------- */
  
  /* ~  (Fields Style)  ~ */
    --ctc-form-field-width: 100%;
    --ctc-form-field-height: 50px;
    --ctc-form-field-max-width: 100%;
    --ctc-form-field-margin: 0 auto;
    --ctc-form-field-bg-color: rgba(255,255,255,0.7);
    --ctc-form-field-font-size: 20px;
    --ctc-form-field-font-family: "Calibri";
    --ctc-form-field-text-color: #626262;
    --ctc-form-field-border: 1px solid #f9f9f9;  
    --ctc-form-field-border-radius: 30px;
    --ctc-form-field-box-shadow: rgba(0,0,0, 0.06) 0px 0px 3px;
    --ctc-form-field-outline: none;
  /* ----------~(end)~---------- */

  input {
    background-image: url(${searchImg}) !important;
    background-position: 10px center !important;
    background-repeat: no-repeat !important;
    text-align: center !important;

    @media screen and (max-width:500px) {
      background-image: none !important;
      background-position: none !important;
    }
  }
`;

const SearchBar = (props) => {

  return (
    <SearchArea className="form">
      <input id="search" name="search" onChange={props.onChange} type="text" placeholder={props.placeholder} />
    </SearchArea>
  );
}

export default SearchBar;