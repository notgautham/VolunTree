import React from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselWrapper = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;

  .carousel .slide img {
    object-fit: cover;
    height: 400px;
  }
`;

const ImageCarousel = () => {
  return (
    <CarouselWrapper>
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        <div>
          <img src="https://tse1.mm.bing.net/th?id=OIP.z45iOs_TRF6NfrQrk6wVvAHaD4&pid=Api" alt="Beach Cleanup Chennai" />
        </div>
        <div>
          <img src="https://tse4.mm.bing.net/th?id=OIP.c2g0DEBILaOzIIhAt37--wHaD4&pid=Api" alt="Volunteers Cleaning the Beach" />
        </div>
        <div>
          <img src="https://tse4.mm.bing.net/th?id=OIP.14VgFAztPkFTKzhLvDg45wHaE7&pid=Api" alt="Chennai Volunteer Cleanup Drive" />
        </div>
      </Carousel>
    </CarouselWrapper>
  );
};

export default ImageCarousel;