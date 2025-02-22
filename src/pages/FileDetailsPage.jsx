import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Paper } from "@mui/material";
import FilterByTime from "../components/FilterByTime";
import DataTable from "../components/DataTable";
import ThemeToggle from "../components/ThemeToggle";

const FileDetailsPage = () => {
  const { fileId } = useParams();
  const [filteredData, setFilteredData] = useState(null);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <ThemeToggle />
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>📜 File Details</Typography>
        <Typography variant="h6" color="gray">Viewing Data for File ID: {fileId}</Typography>

        {/* Filter Data */}
        <FilterByTime setFilteredData={setFilteredData} />

        {/* Data Table (Pass fileId for backend request) */}
        <DataTable filteredData={filteredData} fileId={fileId} />
      </Paper>
    </Container>
  );
};

export default FileDetailsPage;