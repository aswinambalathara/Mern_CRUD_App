import './Search.css'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'

function Search() {
  return (
    <div className='adminSearch'>
        <TextField id="outlined-basic" 
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