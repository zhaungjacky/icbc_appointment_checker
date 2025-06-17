import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export interface MyValueInterface<T>{
    val: T,
    setVal: React.Dispatch<React.SetStateAction<T>>,

}

export default function SelectLocation(  { val,setVal}:  Readonly<MyValueInterface<number>>) {


  const handleChange = (event: SelectChangeEvent) => {
    setVal(parseInt(event.target.value));
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Location</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={String(val)}
          onChange={handleChange}
          label="Location"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={2}>Bunary 3880</MenuItem>
          <MenuItem value={274}>Bunary 4399</MenuItem>
          <MenuItem value={73}>Port Coquitlam</MenuItem>
        </Select>
      </FormControl>
 
    </div>
  );
}
