import { useState } from 'react';
import styles from './styles.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from "swiper";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import "swiper/css/navigation";
import { Navigation } from "swiper";

//Navigation or Autoplay

// type Props = {
//   mainColor: string;  
//   onSearch: (searchValue: string) => void;
// }

export const Banner = () => {

  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleInputFocus = () => {
    setFocused(true);
  }
  const handleInputBlur = () => {
    setFocused(false);
  }
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(event.code);

    if( event.code === 'Enter'){
      //onSearch(searchValue)
    }
  }
  return (
    <div className={styles.container} style={{ borderColor: focused ? '#ff0' : '#fff' }}>
      <Swiper
        // spaceBetween={50}
        slidesPerView={1}
        className={styles.swiper}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={true}
        //navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide className={styles.slide}><img src='/tmp/banner3.png' /></SwiperSlide>
        <SwiperSlide className={styles.slide}><img src='/tmp/banner4.png' /></SwiperSlide>
        <SwiperSlide className={styles.slide}><div className={styles.slideImg}><img src='/tmp/banner1.png' /></div></SwiperSlide>
        <SwiperSlide className={styles.slide}><div className={styles.slideImg}>2</div></SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>      
      </Swiper>            
    </div>
  )

}