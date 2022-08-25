import React from 'react'
import Slider from "react-slick";
import "./Slider.css";
// import angry from '../../assets/angry.jpg'
// import img1 from '../../assets/1.svg'
import img1 from '../../assets/zczc.png'
import anxiety from '../../assets/generalized-anxiety.png'

class ReactSlickDemo extends React.Component {
    render() {
      var settings = {
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        dots: true,
        // slidesToShow: 2,
      };
      return (
        <div className="container slide-container">
          <Slider {...settings}>
            <div className='slide'>           
              <img src={anxiety} alt="slide-img" />
              <div className='slide-content'>
                <h2>Facing dejection? Feeling miserable?</h2>
                <p>Having bad thoughts?Looks like the world around you doesnt care?Flunked exams? You have chosen the right pair of hands for help.Get ready for your solution.Lets get started</p>
              </div>
            </div>
            <div className='slide'> 
              <img src={img1} alt="slide-img" />
              <div className='slide-content'>
                <h2>Its time to say “Good Bye” to your dark phase</h2>
                <p>We consider your issues and process it down to a therapy to make you feel whole again.Have faith in us and walk 
with us through this course of counselling.Revitalize yourself with the elements of comfort that we offer</p>
              </div>
            </div>

          </Slider>
        </div>
      );
    }
  }

  export default ReactSlickDemo