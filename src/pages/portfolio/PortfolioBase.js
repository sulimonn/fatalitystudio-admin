import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Grid, Box, Typography, Button } from '@mui/material';
import Empty from 'pages/Empty';

const PortfolioBase = ({ type, title }) => {
  const portfolio_list = useSelector((state) => state.portfolio.filter((portfolio) => portfolio.type === type));
  return (
    <Box>
      <Box my={4}>
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Grid container spacing={2}>
        {portfolio_list.length !== 0 ? (
          portfolio_list.map((portfolio) => (
            <Grid item xs={12} sm={6} key={portfolio.id}>
              <Box sx={{ p: 2, backgroundColor: portfolio.bgColor, borderRadius: 2, display: 'flex' }}>
                <Box
                  display="flex"
                  justifyContent="center"
                  maxWidth={{ xs: '100%', sm: '30%' }}
                  height={170}
                  borderRadius={2}
                  overflow="hidden"
                >
                  <img
                    loading="lazy"
                    style={{ objectFit: 'contain', height: 'auto', width: '100%' }}
                    src={require(`assets/images/portfolio/${portfolio.cover}`)}
                    alt={portfolio.title}
                  />
                </Box>
                <Box mt={2} gap={1} display="flex" flexDirection="column" justifyContent="space-between">
                  <Box>
                    <Typography variant="h5">{portfolio.title}</Typography>
                    <Typography variant="body2">{portfolio.describe}</Typography>
                  </Box>
                  <Box display="flex" gap={1} justifyContent="flex-end">
                    <Button variant="contained" size="small" color="primary">
                      Изменить
                    </Button>
                    <Button variant="contained" size="small" color="error">
                      Удалить
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      component={Link}
                      to={`http://fatalitystudio.netlify.app/portfolio/${portfolio.id}`}
                    >
                      На сайте
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))
        ) : (
          <Empty type={'portfolio'} />
        )}
      </Grid>
    </Box>
  );
};

PortfolioBase.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default PortfolioBase;
