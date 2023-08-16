
import { Edit, FileCopy, Print, Save, Share } from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

const actions = [
  { icon: <FileCopy />, name: 'Copy' },
  { icon: <Save />, name: 'Save' },
  { icon: <Print />, name: 'Print' },
  { icon: <Share />, name: 'Share' },
];

export function MenuButtonComponent() {
  return (
    <Box sx={{display:'flex',justifyContent:'center', height: 320, flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Actions"
        sx={{ position: 'fixed',  bottom: 16 }}
        icon={<SpeedDialIcon  openIcon={<Edit />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
