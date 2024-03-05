import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// project imports
import InputFileUpload from 'components/@extended/InputFile';
import { useAddMemberMutation, useUpdateMemberMutation } from 'store/reducers/team';

// material-ui
import { Box, Typography, TextField, Button, FormHelperText } from '@mui/material';
import Loader from 'components/Loader';
import getChangedFields from 'utils/getChangedData';
import convertToFormData from 'utils/convertToFormData';

const MemberForm = ({ id = null, member = {} }) => {
  const navigate = useNavigate();
  const [addMember] = useAddMemberMutation();
  const [updateMember] = useUpdateMemberMutation();

  const [memberData, setmemberData] = useState(member);
  const [avatarPreview, setAvatarPreview] = useState(member?.avatar);
  const [errors, setErrors] = useState();
  useEffect(() => {
    if (member?.avatar) {
      setAvatarPreview(member?.avatar);
    }
  }, [member?.avatar]);

  if (id && !member.id) {
    return <Loader />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setmemberData({
      ...memberData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: null
    });
  };

  const handleAvatarChange = (file) => {
    setmemberData({
      ...memberData,
      avatar: file
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (id) {
      const changedFields = getChangedFields(member, memberData);
      const formData = convertToFormData(changedFields);
      const response = await updateMember({ ...formData, id });
      if (!response.error) {
        return navigate('/team');
      }
      setErrors(response.error.data);
    } else {
      const formData = convertToFormData(memberData);
      const response = await addMember(formData);
      if (!response.error) {
        return navigate('/team');
      }
      setErrors(response.error.data);
    }
  };
  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" color="textPrimary" mb={3} sx={{ textAlign: 'center' }}>
        Форма добавления сотрудника
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
          {((id && avatarPreview) || avatarPreview) && (
            <Box cols={1} borderRadius={2} sx={{ maxWidth: 210, maxHeight: 210, overflow: 'hidden' }}>
              <img src={avatarPreview} alt="img" loading="lazy" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
            </Box>
          )}
          <Box display="flex" justifyContent="center">
            <InputFileUpload setPreview={setAvatarPreview} setFile={handleAvatarChange}>
              Загрузить аватар
            </InputFileUpload>
          </Box>
        </Box>

        {errors?.avatar && (
          <FormHelperText sx={{ mb: 1 }} error id="standard-weight-helper-text-avatar">
            {errors?.avatar}
          </FormHelperText>
        )}
        <TextField
          label="Имя"
          variant="outlined"
          name="first_name"
          value={memberData.first_name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={Boolean(errors?.first_name)}
        />

        {errors?.first_name && (
          <FormHelperText sx={{ mb: 1 }} error id="standard-weight-helper-text-first_name">
            {errors?.first_name}
          </FormHelperText>
        )}
        <TextField
          label="Фамилия"
          variant="outlined"
          name="last_name"
          value={memberData.last_name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={Boolean(errors?.last_name)}
        />

        {errors?.last_name && (
          <FormHelperText sx={{ mb: 1 }} error id="standard-weight-helper-text-last_name">
            {errors?.last_name}
          </FormHelperText>
        )}
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={memberData.email || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={Boolean(errors?.email)}
        />

        {errors?.email && (
          <FormHelperText sx={{ mb: 1 }} error id="standard-weight-helper-text-email">
            {errors?.email}
          </FormHelperText>
        )}
        <TextField
          label="Должность"
          variant="outlined"
          name="position"
          value={memberData.position || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={Boolean(errors?.position)}
        />

        {errors?.position && (
          <FormHelperText sx={{ mb: 1 }} error id="standard-weight-helper-text-position">
            {errors?.position}
          </FormHelperText>
        )}
        <TextField
          label="Username"
          variant="outlined"
          type="text"
          name="username"
          value={memberData.username || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={Boolean(errors?.username)}
        />

        {errors?.username && (
          <FormHelperText sx={{ mb: 1 }} error id="standard-weight-helper-text-username">
            {errors?.username}
          </FormHelperText>
        )}
        <TextField
          label="Пароль"
          variant="outlined"
          type="password"
          name="password"
          value={memberData.password || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={Boolean(errors?.password)}
        />

        {errors?.password && (
          <FormHelperText sx={{ mb: 1 }} error id="standard-weight-helper-text-password">
            {errors?.password}
          </FormHelperText>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {id ? 'Изменить' : 'Добавить сотрудника'}
        </Button>
      </form>
    </Box>
  );
};

MemberForm.propTypes = {
  id: PropTypes.string,
  member: PropTypes.object
};

export default MemberForm;
