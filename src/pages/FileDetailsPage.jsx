import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Paper, Box, CircularProgress } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import FilterByTime from "../components/FilterByTime";
import DataTable from "../components/DataTable";
import DataChart from "../components/DataChart";
import ThemeToggle from "../components/ThemeToggle";

const FileDetailsPage = () => {
  const { fileId } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <ThemeToggle />
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>📜 File Details</Typography>
        <Typography variant="h6" color="gray">Viewing Data for File ID: {fileId}</Typography>

          {/* Filter Data */}
          <FilterByTime 
            setFilteredData={setFilteredData} 
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            triggerFetch={() => setFetchTrigger((prev) => prev + 1)} // Update state to trigger DataTable re-fetch
          />

          {/* Data Table (Pass fileId for backend request) */}
          <DataTable 
            filteredData={filteredData} 
            setFilteredData={setFilteredData} 
            fileId={fileId} 
            startTime={startTime} 
            endTime={endTime} 
            fetchTrigger={fetchTrigger} // Watch for filter trigger
          />

          {/* Data Charts */}
          <DataChart records={filteredData || []} />
        </Paper>
    </Container>
  );
};

export default FileDetailsPage;