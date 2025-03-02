import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Typography, CircularProgress, Box, FormControl, Select, MenuItem, IconButton, Collapse } from "@mui/material";
import { getData } from "../services/api";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const DataTable = ({ filteredData, setFilteredData, fileId, startTime, endTime, fetchTrigger }) => {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(25);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [totalFilteredRows, setTotalFilteredRows] = useState(0);
  const [meanTemperature, setMeanTemperature] = useState(0);
  const [medianTemperature, setMedianTemperature] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";

  const fetchFileData = async () => {
    if (!fileId) return;
    setLoading(true);
    try {
      const response = await getData(fileId, page, offset, startTime, endTime);

      if (response.data.records && Array.isArray(response.data.records)) {
        let records = response.data.records;
        setFilteredData(records);
        setTotalPages(response.data.totalPages || 1);
        setTotalRows(response.data.totalRows || 0);
        setTotalFilteredRows(response.data.totalFilteredRows || 0);
        setMeanTemperature(response.data.meanTemperature || 0);
        setMedianTemperature(response.data.medianTemperature || 0);
      } else {
        console.warn("Unexpected data format:", response.data);
        setFilteredData([]);
        setTotalPages(1);
        setTotalRows(0);
        setTotalFilteredRows(0);
        setMeanTemperature(0);
        setMedianTemperature(0);
      }
    } catch (error) {
      console.error("Error fetching file data:", error);
      setFilteredData([]);
      setTotalPages(1);
      setTotalRows(0);
      setTotalFilteredRows(0);
      setMeanTemperature(0);
      setMedianTemperature(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFileData();
  }, [page, offset, fileId, fetchTrigger]);

  return (
    <Paper sx={{ p: 3, mt: 3, position: "relative", borderRadius: "12px", boxShadow: 3 }}>
      <IconButton
        onClick={() => setExpanded(!expanded)}
        sx={{
          position: "absolute",
          top: -12,
          left: -12,
          backgroundColor: "rgb(173, 135, 197)",
          color: "#fff",
          border: "1px solid rgb(133, 98, 155)",
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

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ flexGrow: 1, color: darkMode ? "#90caf9" : "#000" }}>📊 Filtered Data</Typography>
      </Box>

      <Collapse in={expanded}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={2}>
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
          <>
            <Box sx={{ mb: 2, p: 2, borderRadius: "8px", backgroundColor: darkMode ? "#333" : "#f5f5f5" }}>
              <Typography variant="body1" sx={{ color: darkMode ? "#90caf9" : "#000" }}>Total Rows: {totalRows}</Typography>
              <Typography variant="body1" sx={{ color: darkMode ? "#90caf9" : "#000" }}>Total Filtered Rows: {totalFilteredRows}</Typography>
              <Typography variant="body1" sx={{ color: darkMode ? "#90caf9" : "#000" }}>Mean Temperature: {meanTemperature.toFixed(2)} °C</Typography>
              <Typography variant="body1" sx={{ color: darkMode ? "#90caf9" : "#000" }}>Median Temperature: {medianTemperature.toFixed(2)} °C</Typography>
            </Box>

            <Box sx={{ border: "2px solid #90caf9", borderRadius: "8px", padding: "8px", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 400, overflowY: "auto" }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: darkMode ? "#444" : "#eeeeee" }}>
                      <TableCell sx={{ color: darkMode ? "#fff" : "#000" }}><strong>Timestamp</strong></TableCell>
                      <TableCell align="right" sx={{ color: darkMode ? "#fff" : "#000" }}><strong>Temperature (°C)</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ color: darkMode ? "#fff" : "#000" }}>{row.timestampInstant || "N/A"}</TableCell>
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
          </>
        )}

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