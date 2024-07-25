import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../../../store/actions/categoriesActions";

const AccordionComp = ({ title, onCategorySelect, defaultExpanded }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    dispatch(getCategories())
      .then((result) => {
        setCategories(result.data.payload);
        setLoading(false);
        setExpandedSections(Array(result.data.payload.length).fill(false));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "ERRR");
      });
  }, [dispatch]);

  const handleCheckboxChange = (index) => (event) => {
    const newExpandedSections = Array(categories.length).fill(false);
    newExpandedSections[index] = true;
    setExpandedSections(newExpandedSections);

    const category = categories[index];
    setSelectedCategory(category.id);
    setSelectedSubcategory(null);
    onCategorySelect(category.id, null);
  };

  const handleDropDown = (index, category) => () => {
    const newExpandedSections = [...expandedSections];
    newExpandedSections[index] = !newExpandedSections[index];
    setExpandedSections(newExpandedSections);
    onCategorySelect(category.id, null);
  };

  const handleSubcategorySelect = (category, subcategory) => () => {
    setSelectedCategory(category.id);
    setSelectedSubcategory(subcategory.id);
    onCategorySelect(category.id, subcategory.id);
  };

  const renderDetails = (index, category) => (
    <AccordionDetails key={index}>
      <Box onClick={handleDropDown(index, category)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory === category.id}
                onChange={handleCheckboxChange(index)}
              />
            }
            label={category.name}
          />
          <ExpandMoreIcon
            sx={{
              transform: expandedSections[index] ? "rotate(180deg)" : "none",
            }}
          />
        </Box>
      </Box>

      <Collapse in={expandedSections[index]} timeout="auto" unmountOnExit>
        <Box sx={{ ml: 2, display: "flex", flexDirection: "column" }}>
          {category.sub_category.map((subCategory, idx) => (
            <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={selectedSubcategory === subCategory.id}
                  onChange={handleSubcategorySelect(category, subCategory)}
                />
              }
              label={subCategory.name}
            />
          ))}
        </Box>
      </Collapse>
    </AccordionDetails>
  );

  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography fontWeight="bold" fontSize='16px'>{title}</Typography>
      </AccordionSummary>
      <Divider />
      {categories.map((category, index) => renderDetails(index, category))}
    </Accordion>
  );
};

export default AccordionComp;
