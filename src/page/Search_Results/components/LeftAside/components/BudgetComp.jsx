import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, Slider, useTheme } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BudgetCompAccordion = ({ title, onBudgetChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);
const theme = useTheme()
  const handleSliderChange = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
    if (onBudgetChange) {
      onBudgetChange(newValue[0], newValue[1]);
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography fontWeight="bold">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box width="100%"
        padding={'1rem 0rem 0rem 0rem'}
        >
          <Slider
            value={[minPrice, maxPrice]}
            onChange={handleSliderChange}
            min={0}
            max={5000}
            step={50}
            marks
            valueLabelDisplay="on"
            sx={{
          "& .MuiSlider-valueLabel": {
            fontSize: "0.5rem",

            backgroundColor:theme.palette.primary.main
          },
        }}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default BudgetCompAccordion;
