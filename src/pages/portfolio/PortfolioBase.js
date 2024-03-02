import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Material-UI components
import { Grid, Box, Typography, Button } from '@mui/material';

// Project imports
import Empty from 'pages/Empty';
import { setTitle } from 'utils/titleHelper';
import { useDeletePortfolioMutation, useFetchPortfolioQuery } from 'store/reducers/portfolio';

const PortfolioBase = ({ title, serviceId }) => {
  // Update the document title when the component mounts or the title changes
  useEffect(() => {
    setTitle(title);
  }, [title]);

  const { data: portfolioList = [], isError, refetch } = useFetchPortfolioQuery(serviceId);
  useEffect(() => {
    if (isError) {
      refetch();
    }
  }, [isError, refetch]);

  const [deletePortfolio] = useDeletePortfolioMutation();
  // Handle delete portfolio action
  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this portfolio?');
    if (confirmed) {
      deletePortfolio(id);
    }
  };

  return (
    <Box>
      {/* Portfolio Title */}
      <Box my={4}>
        <Typography variant="h4">{title}</Typography>
      </Box>
      {/* Add Portfolio */}
      <Box display="flex" justifyContent="flex-end">
        <Button component={Link} to="/portfolio/new" variant="contained" color="primary" style={{ marginBottom: 20 }}>
          Добавить проект
        </Button>
      </Box>
      {/* Portfolio Grid */}
      <Grid container spacing={2}>
        {/* Render portfolios if available, otherwise render Empty component */}
        {portfolioList.length !== 0 ? (
          portfolioList.map((portfolio) => (
            <Grid item xs={12} sm={6} key={portfolio.id}>
              {/* Portfolio Card */}
              <Box sx={{ p: 2, backgroundColor: portfolio.bgColor, borderRadius: 2, display: 'flex' }}>
                {/* Portfolio Cover */}
                <Box
                  display="flex"
                  justifyContent="center"
                  maxWidth={{ xs: '100%', sm: '30%' }}
                  height={170}
                  borderRadius={2}
                  overflow="hidden"
                >
                  {portfolio.cover && (
                    <img
                      loading="lazy"
                      style={{ objectFit: 'contain', height: 'auto', width: '100%' }}
                      src={portfolio.cover}
                      alt={portfolio.title}
                    />
                  )}
                </Box>
                {/* Portfolio Details */}
                <Box mt={2} gap={1} display="flex" flexDirection="column" justifyContent="space-between">
                  <Box>
                    {/* Portfolio Title and Description */}
                    <Typography variant="h5">{portfolio.title}</Typography>
                    <Typography variant="body2">{portfolio.describe}</Typography>
                  </Box>
                  {/* Action Buttons */}
                  <Box display="flex" gap={1} justifyContent="flex-end">
                    {/* Edit Button */}
                    <Button variant="contained" size="small" color="primary" component={Link} to={`/portfolio/${portfolio.id}`}>
                      Изменить
                    </Button>
                    {/* Delete Button */}
                    <Button onClick={() => handleDelete(portfolio.id)} variant="contained" size="small" color="error">
                      Удалить
                    </Button>
                    {/* View on Site Button */}
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      component={Link}
                      to={`http://fatalitystudio.netlify.app/portfolio/${portfolio.id}`}
                    >
                      Посмотреть
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

// Prop types validation
PortfolioBase.propTypes = {
  serviceId: PropTypes.number,
  title: PropTypes.string
};

export default PortfolioBase;
