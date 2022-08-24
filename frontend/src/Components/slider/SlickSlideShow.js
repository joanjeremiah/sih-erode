import React from 'react'
import Slider from "react-slick";
import "./Slider.css";
// import angry from '../../assets/angry.jpg'
import img1 from '../../assets/1.svg'
import anxiety from '../../assets/generalized-anxiety.png'

class ReactSlickDemo extends React.Component {
    render() {
      var settings = {
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        dots: true,
        slidesToShow: 2,
      };
      return (
        <div className="container slide-container">
          <Slider {...settings}>
            <div className='slide'>           
              <img src={anxiety} alt="slide-img" />
              <div className='slide-content'>
                <h2>Title</h2>
                <p>lorem ipsum</p>
              </div>
            </div>
            <div className='slide'> 
              <img src={img1} alt="slide-img" />
              <div className='slide-content'>
                <h2>Title</h2>
                <p>lorem ipsum</p>
              </div>
            </div>
            <div  className='slide'> 
              <img src={img1} alt="slide-img" />
              <div className='slide-content'>
                <h2>Title</h2>
                <p>lorem ipsum</p>
              </div>
            </div>
            <div  className='slide'>
              <img src={img1} alt="slide-img" />
              <div className='slide-content'>
                <h2>Title</h2>
                <p>lorem ipsum</p>
              </div>
            </div>
          </Slider>
        </div>
      );
    }
  }

  export default ReactSlickDemo