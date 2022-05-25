import { useEffect, useState } from 'react';

import gridColumns from '../js/gridColumns';
import { buttonColor, whiteRegular, buttonTextHoverColor } from '../constants/styles';

import FoodProduct from './FoodProduct';

const FoodList = (props) => {
  const [newsData, setNewsData] = useState([]);
    
  async function getData() {
    try {
      const response = await fetch(props.dataAPI);
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      } else {
        let result = await response.json();
        setNewsData(result.news);
        console.log(result);
      }
  
    } catch (error) {
      console.error(error);
    } 
  }
  
  //console.log(newsData);
    
  useEffect(() => {
    getData();
  }, []);

  const showData = () => {
    const dataSources = props.selectCategory;

    return newsData.filter(item => dataSources.includes(item.source)).map((item, id) => {
    
      return (
        <FoodProduct 
          id={item.id} 
          key={item.id} 
          gridColumn={gridColumns(newsData, 2, id)} 
          title={item.title}  
          descr={item.description} 
          img={item.imgURL} 
          linkRef={item.link}
          btnColor={buttonColor}
          btnHovColor="#e22081"
          btnText={"Read more"} 
          btnTextColor={whiteRegular}
          btnTextHovColor={buttonTextHoverColor}
          contractType={item.contract_type}
          tokenAddress={item.token_address}
          newsDate={item.feedDate}
          relatedCoins={item.coins.map(relcoin => relcoin.coinKeyWords += ', ')}
          newsSource={item.source}
          sourceLink={item.sourceLink}
        />
      );
          
    });
        
  };

  return (
    <>{newsData && showData()}</>
  )
};

export default FoodList;