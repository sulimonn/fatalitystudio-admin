import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import { TextField, Button, Grid, Paper, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

// project import
import { useAddPortfolioMutation, useDeletePortfolioMutation, useEditPortfolioMutation } from 'store/reducers/portfolio';
import { useCurrentPath } from 'hooks/use-navigate';
import { useFetchServicesQuery } from 'store/reducers/services';

const ProjectForm = ({ id, response = {} }) => {
  const navigate = useNavigate();
  const { currentPath } = useCurrentPath();
  const services = useFetchServicesQuery().data || [];

  const [updateProject, updateRes] = useEditPortfolioMutation();
  const [addProject, addRes] = useAddPortfolioMutation();
  const [deleteProject, deleteResponse] = useDeletePortfolioMutation();

  const [project, setProject] = useState({});

  useEffect(() => {
    if (response.data) {
      setProject(response.data);
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      await addProject(project);
      if (addRes.error) {
        console.log(addRes.error.data.message);
      } else navigate(currentPath);
    } else {
      await updateProject({ id, project });
      if (updateRes.error) {
        console.log(updateRes.error.data.message);
      } else {
        console.log(currentPath);
        navigate(currentPath);
      }
    }
  };
  const handleDelete = async () => {
    if (id) {
      await deleteProject(project.id);
      if (deleteResponse.error) {
        console.log(deleteResponse.error.data.message);
      } else navigate(currentPath);
    }
  };

  return (
    <Grid item xs={10} sm={8} md={6}>
      <Paper elevation={3} style={{ padding: 20, bgImage: 'none' }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          {!id ? 'Добавить проект' : 'Изменить проект'}
        </Typography>
        <form onSubmit={handleSubmit} method="post">
          <TextField
            required
            label="Заголовок"
            variant="outlined"
            fullWidth
            margin="normal"
            value={project?.title || ''}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />
          <TextField
            required
            label="О проекте"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={project?.about || ''}
            onChange={(e) => setProject({ ...project, about: e.target.value })}
          />
          <TextField
            required
            label="Решение"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={project?.solution}
            onChange={(e) => setProject({ ...project, solution: e.target.value })}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Сервис</InputLabel>
            <Select
              required
              labelId="demo-simple-select-helper-label"
              id="service_id"
              label="Автор"
              value={project?.service_id || ''}
              onChange={(e) => setProject({ ...project, service_id: e.target.value })}
            >
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container justifyContent="flex-end" columns={{ xs: 12, sm: 8, md: 12 }}>
            <Button color="primary" type="submit" variant="contained" disabled={addRes.isLoading || updateRes.isLoading}>
              {!id ? 'Добавить проект' : 'Сохранить'}
            </Button>
            {id && (
              <>
                <Button sx={{ mx: 1 }} color="error" onClick={handleDelete} variant="contained">
                  Удалить
                </Button>
                <Button
                  color="secondary"
                  component={Link}
                  to={'https://fatalitystudio.netlify.app/blog/' + id}
                  target="_blank"
                  variant="contained"
                >
                  На сайте
                </Button>
              </>
            )}
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

ProjectForm.propTypes = {
  id: PropTypes.string,
  response: PropTypes.object,
  handleSubmit: PropTypes.func,
  action: PropTypes.object
};

export default ProjectForm;
