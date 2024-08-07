import './Search.css'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'

function Search({handleSearch}) {


  return (
    <div className='adminSearch'>
        <TextField id="outlined-basic" 
        onChange={(e)=>handleSearch(e.target.value)}
        InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <SearchIcon fontSize="medium"/>
              </InputAdornment>
            ),
          }}
        label="Search User" variant="outlined"  fullWidth/>
    </div>
  )
}

export default Search