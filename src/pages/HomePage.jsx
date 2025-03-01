import React, { useEffect, useState, useContext } from "react";
import { Container, Typography, Paper, Box, Card, CardContent, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh"; // Refresh button
import CloudDoneIcon from "@mui/icons-material/CloudDone"; // Ready icon
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"; // Processing icon
import FileUpload from "../components/FileUpload";
import { getUploadedFiles } from "../services/api";
import ThemeToggle from "../components/ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";

const HomePage = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch uploaded files
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await getUploadedFiles();
      setFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
    setLoading(false);
  };

  // Fetch files on page load
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <ThemeToggle />

      {/* File Upload Section */}
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center", mb: 4, backgroundColor: darkMode ? "#1e1e1e" : "#fff" }}>
        <Typography variant="h5" gutterBottom color={darkMode ? "#90caf9" : "black"}>
          📂 Upload a File
        </Typography>
        <Box sx={{ border: "2px dashed #90caf9", padding: 3, borderRadius: "8px", backgroundColor: darkMode ? "#2a2a2a" : "#f5f5f5" }}>
          <FileUpload fetchFiles={fetchFiles} />
        </Box>
      </Paper>

      {/* Uploaded Files List with Refresh Button */}
      <Paper elevation={3} sx={{ padding: 4, backgroundColor: darkMode ? "#1e1e1e" : "#fff" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color={darkMode ? "#90caf9" : "black"}>
            📜 Uploaded Files
          </Typography>
          <Tooltip title="Refresh Files">
            <IconButton onClick={fetchFiles} sx={{ color: darkMode ? "#90caf9" : "black" }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* File List as a Single Column */}
        <Box sx={{ mt: 2 }}>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress sx={{ color: darkMode ? "#90caf9" : "inherit" }} />
            </Box>
          ) : files.length > 0 ? (
            files.map((file) => (
              <Card
                key={file.id}
                sx={{
                  cursor: file.status === 1 ? "pointer" : "not-allowed",
                  backgroundColor: file.status === 0 ? (darkMode ? "#444" : "#f0f0f0") : darkMode ? "#333" : "#fff",
                  color: file.status === 0 ? (darkMode ? "#bbbbbb" : "#777") : darkMode ? "#e0e0e0" : "black",
                  border: file.status === 1 ? "1px solid #4caf50" : "1px solid rgb(186, 170, 146)",
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": file.status === 1 ? { boxShadow: 6, transform: "scale(1.02)" } : {}, // Make only ready files react on hover
                  mb: 0.4, // Less space between files to fit more on screen
                  padding: "0px 12px", // Reduce padding for a compact look
                  opacity: file.status === 0 ? 0.5 : 1, // Make processing files look disabled
                }}
                onClick={file.status === 1 ? () => window.open(`/file/${file.id}`, "_blank") : null} // Open in a new tab if ready
              >
                <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px" }}>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "14px" }}>
                      {file.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                      {file.status === 1 ? "✅ Ready" : "⏳ Processing"}
                    </Typography>
                  </Box>
                  
                  {file.status === 1 ? (
                    <CloudDoneIcon sx={{ color: "#4caf50", fontSize: 20 }} />
                  ) : (
                    <HourglassEmptyIcon sx={{ color: "#ff9800", fontSize: 20 }} />
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography align="center" color={darkMode ? "#e0e0e0" : "black"}>
              No files uploaded yet.
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;