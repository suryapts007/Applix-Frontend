import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Typography, CircularProgress, Box, FormControl, InputLabel, Select, MenuItem, IconButton, Collapse } from "@mui/material";
import { getData } from "../services/api";
import { useTheme } from "@mui/material/styles"; // Import theme hook
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const DataTable = ({ filteredData, setFilteredData, fileId }) => {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(25); // Default offset
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1); // Store total pages from API
  const [expanded, setExpanded] = useState(true); // State to toggle collapse

  const theme = useTheme(); // Get current theme
  const darkMode = theme.palette.mode === "dark"; // Check if dark mode is enabled

  // Fetch Data from Backend
  const fetchFileData = async () => {
    if (!fileId) return;
    setLoading(true);
    try {
      const response = await getData(fileId, page, offset);
      console.log("Backend Response:", response.data); // DEBUGGING LOG

      if (response.data.records && Array.isArray(response.data.records)) {
        let records = response.data.records;
        console.log("records", records);  // DEBUGGING LOG
        setFilteredData(records);
        console.log("filtered", filteredData);  // DEBUGGING LOG
        setTotalPages(response.data.totalPages || 1); // Update total pages from API response
      } else {
        console.warn("Unexpected data format:", response.data);
        setFilteredData([]); // Avoid undefined issues
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching file data:", error);
      setFilteredData([]);
      setTotalPages(1);
    }
    setLoading(false);
  };

  // Fetch data when fileId, page, or offset changes
  useEffect(() => {
    if (filteredData.length === 0) {
      fetchFileData();
    }
  }, [page, offset, fileId]);

  return (
    <Paper sx={{ p: 3, mt: 3, position: "relative"}}>
      {/* Collapse Toggle Button - Positioned at Left Top Side */}
      <IconButton
        onClick={() => setExpanded(!expanded)}
        sx={{
          position: "absolute",
          top: -12,
          left: -12,
          backgroundColor: "rgb(173, 135, 197)", // Violet background
          color: "#fff",
          border: "1px solid rgb(133, 98, 155)", // Darker violet border
          borderRadius: "50%",
          width: 26,
          height: 26,
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "#6a1b9a",
          },
        }}
      >
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>

      {/* Header with Collapse Toggle */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" sx={{ flexGrow: 1 }}>📊 Filtered Data</Typography>
      </Box>


      <Collapse in={expanded}>
        {/* Adjust layout to prevent overlap */}
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={2}>
          {/* Offset Selection Dropdown */}
          <FormControl size="small" sx={{ minWidth: 100, maxWidth: 120, ml: "auto" }}>
            <Select
              value={offset}
              onChange={(e) => setOffset(e.target.value)}
              sx={{
                backgroundColor: darkMode ? "#444" : "#f9f9f9",
                borderRadius: "4px",
                fontSize: "0.9rem",
                padding: "4px 8px",
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={500}>500</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        ) : (
          // Scrollable Table with Border
          <Box sx={{ border: "2px solid #90caf9", borderRadius: "8px", padding: "8px", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 400, overflowY: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#eeeeee" }}>
                    <TableCell sx={{ color: darkMode ? "#fff" : "#000" }}><strong>Timestamp</strong></TableCell>
                    <TableCell align="right" sx={{ color: darkMode ? "#fff" : "#000" }}><strong>Temperature (°C)</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: darkMode ? "#fff" : "#000" }}>{row.timestamp || "N/A"}</TableCell>
                        <TableCell align="right" sx={{ color: darkMode ? "#fff" : "#000" }}>{row.temperature || "N/A"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center" sx={{ color: darkMode ? "#fff" : "#000" }}>
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Pagination with dynamic total page count */}
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={(e, value) => setPage(value)} 
          siblingCount={1} 
          boundaryCount={1} 
          sx={{ 
            mt: 2, 
            display: "flex", 
            justifyContent: "center",
            "& .MuiPaginationItem-root": { 
              backgroundColor: darkMode ? "#444" : "#f9f9f9",
              borderRadius: "4px",
              color: darkMode ? "#fff" : "#000",
              "&:hover": { backgroundColor: darkMode ? "#666" : "#ddd" }
            },
            "& .Mui-selected": { 
              backgroundColor: darkMode ? "#222" : "#bbb",
              color: darkMode ? "#fff" : "#000",
              fontWeight: "bold"
            }
          }} 
        />
      </Collapse>
    </Paper>
  );
};

export default DataTable;