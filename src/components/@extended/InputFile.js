import React from 'react';
import PropTypes from 'prop-types';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Button } from '@mui/material';
const InputFileUpload = ({ setFile, children, setPreview, name = null, multiple = false, required = false }) => {
  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
      return;
    }
    if (!multiple) {
      if (name) {
        setFile({ target: { value: e.target.files[0], name: name } });
      } else setFile(e.target.files[0]);
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(fileUrl);
    } else {
      e.target.name = name;
      setFile(e);
      const { files } = e.target;
      const previews = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreview(previews);
    }
  };

  return (
    <Button type="button" component="label" variant="contained" startIcon={<CloudDownloadIcon />} sx={{ position: 'relative' }}>
      {children + (required ? ' *' : '')}
      <input
        accept="image/*"
        type="file"
        style={{ width: 1, height: 1, opacity: 0, pointerEvents: 'none', position: 'absolute' }}
        onChange={handleFileChange}
        required={required}
        name={name}
        multiple={multiple}
      />
    </Button>
  );
};

InputFileUpload.propTypes = {
  setFile: PropTypes.func.isRequired,
  setPreview: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  multiple: PropTypes.bool,
  required: PropTypes.bool
};

export default InputFileUpload;
