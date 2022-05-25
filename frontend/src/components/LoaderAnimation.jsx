import '../styles/loader.scss';

const LoaderAnimation = () => {
  return (
    <div className="grid-col-all center">
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        {/*
          <span>Loading</span>
        */}
      </div>
    </div>
  )
}

export default LoaderAnimation;