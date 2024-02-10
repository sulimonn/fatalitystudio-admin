import React from 'react';
import PropTypes from 'prop-types';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Button } from '@mui/material';
const InputFileUpload = ({ setFile, children, setPreview }) => {
  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
      return;
    }
    setFile(e.target.files[0]);
    const fileUrl = URL.createObjectURL(e.target.files[0]);
    console.log(fileUrl);
    setPreview(fileUrl);
  };

  return (
    <Button component="label" variant="contained" startIcon={<CloudDownloadIcon />}>
      {children}
      <input accept="image/*" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
    </Button>
  );
};

InputFileUpload.propTypes = {
  setFile: PropTypes.func.isRequired,
  setPreview: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  file: PropTypes.object
};

export default InputFileUpload;
