import React from 'react';
import PropTypes from 'prop-types';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Box, TextField } from '@mui/material';
import renameFile from 'utils/renameFile';

const MySwiper = ({ photosPreviews, photos, setPhotos }) => {
  return (
    <Box maxWidth="610px">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {photosPreviews.map((photo, i) => (
          <SwiperSlide key={i}>
            <div style={{ display: 'block', width: '410px', height: '410px', margin: '0 auto ' }}>
              <img src={photo} alt="img" loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <Box mb={4} display="flex" justifyContent="center">
              <TextField
                label="Описание"
                variant="outlined"
                name="description"
                fullWidth
                margin="normal"
                value={photos[i]?.name || ''}
                onChange={(e) => {
                  setPhotos((prevPhotos) => {
                    const updatedPhotos = [...prevPhotos];
                    updatedPhotos[i] = renameFile(photos[i], e.target.value);
                    return updatedPhotos;
                  });
                }}
                sx={{ mx: 'auto', width: '80%' }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

MySwiper.propTypes = {
  photosPreviews: PropTypes.array,
  photos: PropTypes.array,
  setPhotos: PropTypes.func
};

export default MySwiper;
