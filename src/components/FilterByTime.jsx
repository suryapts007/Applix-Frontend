import React, { useState, useContext } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeContext } from "../context/ThemeContext";
import { format, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

const FilterByTime = ({ setFilteredData, startTime, endTime, setStartTime, setEndTime, triggerFetch }) => {
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFilter = async () => {
    if (!startTime || !endTime) {
      setError("❌ Please select both start and end time.");
      return;
    }
    setError("");
    triggerFetch();
  };

  const handleReset = () => {
    setStartTime(null);
    setEndTime(null);
    setFilteredData([]);
    setError("");
    triggerFetch();
  };

  const handleStartTimeChange = (newValue) => {
    const utcTime = zonedTimeToUtc(newValue, 'UTC');
    setStartTime(utcTime);
  };

  const handleEndTimeChange = (newValue) => {
    const utcTime = zonedTimeToUtc(newValue, 'UTC');
    setEndTime(utcTime);
  };

  return (
    <Box sx={{ p: 3, mt: 3, border: "1px solid #ddd", borderRadius: "8px", textAlign: "center", backgroundColor: darkMode ? "#1e1e1e" : "#fff" }}>
      <Typography variant="h6" gutterBottom color={darkMode ? "#90caf9" : "black"}>
        ⏳ Filter Data by Time Range
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Start Time (UTC)"
          value={startTime ? utcToZonedTime(startTime, 'UTC') : null}
          onChange={handleStartTimeChange}
          renderInput={(params) => (
            <TextField {...params} sx={{ input: { color: darkMode ? "#e0e0e0" : "black" } }} />
          )}
        />
        <DateTimePicker
          label="End Time (UTC)"
          value={endTime ? utcToZonedTime(endTime, 'UTC') : null}
          onChange={handleEndTimeChange}
          renderInput={(params) => (
            <TextField {...params} sx={{ input: { color: darkMode ? "#e0e0e0" : "black" }, ml: 2 }} />
          )}
        />
      </LocalizationProvider>

      <Box sx={{ mt: 2 }}>
        <Button
          onClick={handleFilter}
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mr: 2 }}
        >
          {loading ? "Filtering..." : "Filter"}
        </Button>

        <Button
          onClick={handleReset}
          variant="outlined"
          color="secondary"
        >
          Reset Filter
        </Button>
      </Box>

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
};

export default FilterByTime;