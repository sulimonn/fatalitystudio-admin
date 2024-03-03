import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// project imports
import InputFileUpload from 'components/@extended/InputFile';
import { useAddMemberMutation, useUpdateMemberMutation } from 'store/reducers/team';

// material-ui
import { Box, Typography, TextField, Button } from '@mui/material';
import Loader from 'components/Loader';

const MemberForm = ({ id = null, member = {} }) => {
  const navigate = useNavigate();
  const [addMember, addResponse] = useAddMemberMutation();
  const [updateMember, updateResponse] = useUpdateMemberMutation();
  const [memberData, setmemberData] = useState(member);
  const [avatarPreview, setAvatarPreview] = useState(member?.avatar);
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
  };

  const handleAvatarChange = (file) => {
    setmemberData({
      ...memberData,
      avatar: file
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    Object.entries(memberData).forEach(([key, value]) => {
      if (id) {
        if (memberData[key] !== data[key])
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
      } else {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    if (id) {
      await updateMember({ ...formData, id });
      if (!updateResponse.error) {
        return navigate('/team');
      }
      return alert('Error updating member');
    } else {
      await addMember(formData);
      if (!addResponse.error) {
        return navigate('/team');
      }
      return alert('Error adding member');
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
        <TextField
          label="Имя"
          variant="outlined"
          name="first_name"
          value={memberData.first_name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Фамилия"
          variant="outlined"
          name="last_name"
          value={memberData.last_name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
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
        />
        <TextField
          label="Должность"
          variant="outlined"
          name="position"
          value={memberData.position || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
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
        />
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
        />
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
