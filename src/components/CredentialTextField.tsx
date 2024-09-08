import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MyValueInterface } from './SelectComponent';

export interface MyCredentialProp extends MyValueInterface<string>{
  title: string
}

export default function CredentialTextField( { val,setVal,title}: Readonly<MyCredentialProp>) {

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id={title}
        label={title}
        value={val}
        // type={textType ?? "text"}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setVal(event.target.value);
          localStorage.setItem(title,event.target.value);
        }}
      />
  
    </Box>
  );
}
