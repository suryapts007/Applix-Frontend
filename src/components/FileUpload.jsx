import React, { useState } from "react";
import { Button, CircularProgress, Typography, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadFile } from "../services/api";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a file");
      return;
    }
    setLoading(true);
    try {
      await uploadFile(file);
      setMessage("✅ File uploaded successfully!");
    } catch (error) {
      setMessage("❌ Upload failed!");
    }
    setLoading(false);
  };

  return (
    <Box>
      <input
        type="file"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button
          component="span"
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
        >
          Choose File
        </Button>
      </label>

      <Button
        onClick={handleUpload}
        variant="contained"
        color="success"
        sx={{ ml: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : "Upload"}
      </Button>

      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default FileUpload;