import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { Equipo, Estado, Prioridad } from "../../storage/useStorage";



export const InputSelectComponent = ({title, id, selectInput }:{title: string, id:string, selectInput:Array<{ key: string; value: Equipo | Prioridad | Estado }>}) => {

const [inputValue, setInputValue] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
        setInputValue(selectedValue);
  
  };

  return (
    <FormControl sx={{
      mt:2,
    }}>
      <InputLabel id={id} >{title}</InputLabel>
      <Select
        labelId={id}
        id={id}
        value={inputValue}
        label={title}
        onChange={handleChange}
        name={title}
      >
        {selectInput.map( input => (
           <MenuItem key={input.key} value={input.value}>{input.value}</MenuItem>
        ))}
        
        
      </Select>
    </FormControl>
  );
};
