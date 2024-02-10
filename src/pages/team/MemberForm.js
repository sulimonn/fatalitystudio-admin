import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// project imports
import { addMember } from 'store/reducers/team';
import InputFileUpload from 'components/@extended/InputFile';

// material-ui
import { Box, Typography, TextField, Button } from '@mui/material';

const MemberForm = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const member = useSelector((state) => state.team.members.find((member) => member.id.toString() === id));
  const [memberData, setMemberData] = useState(member || {});
  const [avatarPreview, setAvatarPreview] = useState(null);
  useEffect(() => {
    if (id && member.avatar) {
      import(`assets/images/users/${member.avatar}`)
        .then((image) => {
          setAvatarPreview(image.default);
        })
        .catch((error) => {
          console.error('Error loading cover image:', error);
        });
    }
  }, [id, member.avatar]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberData({
      ...memberData,
      [name]: value
    });
  };

  const handleAvatarChange = (file) => {
    setMemberData({
      ...memberData,
      avatar: file
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addMember(memberData));
    setMemberData({
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      avatar: null,
      password: ''
    });
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" color="textPrimary" mb={3} sx={{ textAlign: 'center' }}>
        Форма добавления сотрудника
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
          {(id || avatarPreview) && (
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
          name="firstName"
          value={memberData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Фамилия"
          variant="outlined"
          name="lastName"
          value={memberData.lastName}
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
          value={memberData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Должность"
          variant="outlined"
          name="position"
          value={memberData.position}
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
          value={memberData.password}
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

export default MemberForm;
