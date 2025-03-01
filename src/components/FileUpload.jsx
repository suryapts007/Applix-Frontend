import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Typography, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadFile } from "../services/api";

const FileUpload = ({ fetchFiles }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage(`📄 ${event.target.files[0].name} is ready to upload`);
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
      fetchFiles(); // Refresh the files list
    } catch (error) {
      setMessage("❌ Upload failed!");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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