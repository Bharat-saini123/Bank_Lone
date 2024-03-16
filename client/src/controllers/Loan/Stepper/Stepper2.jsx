import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
"page 1",
"page 2"
];

export default function Stepper2() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel sx={{fontSize:'1.5rem'}}>
        {steps.map((label) => (
          <Step key={label} sx={{fontSize:'1.5rem'}}>
            <StepLabel sx={{fontSize:'1.5rem'}}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}