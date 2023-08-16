import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
    palette:{
        primary: {
            main: '#2196F3' ,
        },
        secondary:{
            main:'#02B9ED',
        },
        error:{
            main: '#D32F2F'
        },
        success:{
            main: '#2E7D32',
        }
        
    },
    typography: {
        fontFamily: ['Open Sans', 'Arial', 'sans-serif'].join(','),
      },
})