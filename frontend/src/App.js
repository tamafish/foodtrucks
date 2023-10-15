import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import axios from 'axios';

export default function BasicTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://127.0.0.1:8080')
          .then( response => {
              setData(response.data);
          })
    };
    fetchData();
  }, []);

  const changeQuery = (e) => { 
    let value = e.target.value;
    setSearchQuery(value);
  }

  const handleChange = (e) => {
    setFilterValue(e.target.value)
  }

  const filteredData = data.filter((item) => {
    // filter out expired vendors
    const intime = new Date(item.ExpirationDate) > new Date()
    // Apply search filter
    const searchMatch = item.Applicant.toLowerCase().includes(searchQuery.toLowerCase()) 
                        || item.FoodItems.toLowerCase().includes(searchQuery.toLowerCase());
    // Apply filter by status
    const filterMatch = filterValue === '' || item.Status === filterValue;

    return intime && searchMatch && filterMatch;
  });

  return (
    <div>
      <div style={{ width: '100%' }}>
      <Select
        id="demo-simple-select"
        sx={{ m: 1, minWidth: 120 }}
        value={filterValue}
        label="status"
        onChange={handleChange}
      >
        <MenuItem value='APPROVED'>Available</MenuItem>
        <MenuItem value='REQUESTED'>Coming soon</MenuItem>
      </Select>

        <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 2, flex: 2 , textAlign: 'right'}}
        placeholder="Search Food Trucks"
        inputProps={{ 'aria-label': 'search food trucks' }}
        onChange={changeQuery}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Vendor</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Foods</TableCell>
            <TableCell align="right">Schedule</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow
              key={row.locationid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Applicant}
              </TableCell>
              <TableCell align="right">{row.Address}</TableCell>
              <TableCell align="right">{row.FoodItems}</TableCell>
              <TableCell align="right"><a href={row.Schedule} target="_blank">View Schedule</a></TableCell>
              <TableCell align="right">{row.Status==="APPROVED"? "Available" : "Coming soon" }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}