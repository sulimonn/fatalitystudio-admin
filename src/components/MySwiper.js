import React from 'react';
import PropTypes from 'prop-types';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Box, TextField, FormHelperText } from '@mui/material';

const MySwiper = ({ photosPreviews, photos, setPhotos, description = false, ...props }) => {
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
        {photosPreviews.map((photo, i) => {
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
                <img
                  src={photo?.includes('blob') ? photo : 'http://79.174.82.88/' + photo}
                  alt="img"
                  loading="lazy"
                  style={{ width: 'auto', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              {description && (
                <Box display="flex" justifyContent="center" mb={4}>
                  <TextField
                    required
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
                      props.setErrors((prevErrors) => {
                        const updatedErrors = { ...prevErrors };
                        if (updatedErrors[i]) {
                          updatedErrors[i] = { ...updatedErrors[i], title: null };
                        }
                        return updatedErrors;
                      });
                    }}
                    sx={{ mx: 'auto', width: '80%' }}
                    error={Boolean(props.errors?.title)}
                  />

                  {props.errors?.title && (
                    <FormHelperText error id="standard-weight-helper-text-title">
                      {errors?.title}
                    </FormHelperText>
                  )}
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
  description: PropTypes.bool,
  errors: PropTypes.object,
  setErrors: PropTypes.func
};

export default MySwiper;
