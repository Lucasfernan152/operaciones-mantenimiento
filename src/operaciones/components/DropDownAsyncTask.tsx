
import {CircularProgress, Autocomplete, TextField} from "@mui/material";
import { useEffect, useState } from "react";
import { getCollection } from "../../firebase/providers";





export const DropDownAsyncTask = ({ column, onSelect }: any) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly any[]>([]);
  const [selectedValue, setSelectedValue] = useState<any | null>(null);
  const loading = open && options.length === 0;

  const getCollectionOfFirestore = async () => {
    const response = await getCollection(column);
    setOptions(response);
  };

   const handleSelection = (event: any, value: any | null) => {
    setSelectedValue(value);
    onSelect(value, column); // Llama a la función de manejo con el valor seleccionado
  };


  useEffect(() => {
    let isActive = true;

    if (!loading) {
      return undefined;
    }

    if (isActive) {
      setOptions([]);
      getCollectionOfFirestore();
    }

    return () => {
      isActive = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous"
      sx={{ width: {xs: '100%', md: 'calc(50% - 6px)'}, marginBottom: {xs: 2, md: 0}}}
      open={open}
      onOpen={() => {
        getCollectionOfFirestore();
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(data, value) => data.id === value.id}
      getOptionLabel={(data) => data.nombre}
      options={options}
      loading={loading}
      value={selectedValue} // Cambio aquí: Usar el objeto de opción en lugar del ID
      onChange={handleSelection}
      renderInput={(params) => (
        <TextField
          {...params}
          label={`${column} a Asignar`}
          name="assignedUser"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};