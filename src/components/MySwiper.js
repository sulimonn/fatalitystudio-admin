import React from 'react';
import PropTypes from 'prop-types';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Box, TextField } from '@mui/material';

const MySwiper = ({ photosPreviews, photos, setPhotos, description = false }) => {
  return (
    <Box maxWidth={{ xs: '370px', sm: '700px' }}>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {photosPreviews.map((data, i) => {
          const photo = !data.startsWith('blob:') ? JSON.parse(data).upload : data;
          return (
            <SwiperSlide key={i}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxWidth: { xs: '250px', sm: '410px' },
                  height: { xs: '200px', sm: '300px' },
                  mx: 'auto'
                }}
              >
                <img src={photo} alt="img" loading="lazy" style={{ width: 'auto', height: '100%', objectFit: 'cover' }} />
              </Box>
              {description && (
                <Box display="flex" justifyContent="center" mb={4}>
                  <TextField
                    label="Описание"
                    variant="outlined"
                    name="description"
                    fullWidth
                    margin="normal"
                    value={photos[i]?.title || ''}
                    onChange={(e) => {
                      setPhotos((prevPhotos) => {
                        const updatedPhotos = [...prevPhotos];
                        updatedPhotos[i].title = e.target.value;
                        return updatedPhotos;
                      });
                    }}
                    sx={{ mx: 'auto', width: '80%' }}
                  />
                </Box>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

MySwiper.propTypes = {
  photosPreviews: PropTypes.array,
  photos: PropTypes.array,
  setPhotos: PropTypes.func,
  description: PropTypes.bool
};

export default MySwiper;
