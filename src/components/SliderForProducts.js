import React from 'react';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

const SliderForProducts = () => {
  return (
    <Splide>
      <SplideSlide>
        <img src="https://via.placeholder.com/468?text=1" alt="Image 1"/>
      </SplideSlide>
      <SplideSlide>
        <img src="https://via.placeholder.com/468?text=2" alt="Image 2"/>
      </SplideSlide>
    </Splide>
  );
};

export default SliderForProducts;
