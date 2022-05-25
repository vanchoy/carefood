import "../styles/progressbar.scss";

const ProgressBar = ({length, chars}) => {
  let value = Math.floor(100 - chars / length * 100);
    
  return (
    <div>
      <div className="progress-div">
        <div 
          style={{ width: `${value}%` }} 
          className="progress" 
        >
          <span>{Math.floor(value)}%</span>
        </div>
      </div>
    </div>
  );

};
  
export default ProgressBar;