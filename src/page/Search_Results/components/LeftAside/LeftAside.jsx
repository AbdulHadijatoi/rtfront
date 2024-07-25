import React from "react";
import AccordionComp from "./components/AccordionComp";
import { Stack } from "@mui/material";
import BudgetComp from "./components/BudgetComp";

const LeftAside = ({ onCategorySelect, onBudgetChange }) => {
  return (
    <Stack spacing={4}>
      <AccordionComp title="Categories" onCategorySelect={onCategorySelect} defaultExpanded={true}/>
      <BudgetComp title="Budget" onBudgetChange={onBudgetChange}/>
      {/* <AccordionComp title="Language" /> */}
    </Stack>
  );
};

export default LeftAside;
