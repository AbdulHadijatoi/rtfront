import React, { useState } from "react";
import Page from "../../components/page";
import { Box, Button, Grid } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import LeftAside from "./components/LeftAside";
import RightAside from "./components/RightAside";
import { useLocation, useNavigate } from "react-router";
const Search_Results = ({nameProp}) => {

  const location = useLocation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);

  const handleCategorySelect = (categoryId, subcategoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subcategoryId);
  };


  const handleBudgetChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <Page title={nameProp}>
      <Box sx={{ p: 5 }}>
        <Button variant="contained" startIcon={<ArrowBack />} onClick={handleBackClick}>
          Back to homepage
        </Button>

<Grid container spacing={4} mt={1}>
  <Grid item lg={3} md={3} sm={12} xs={12}>
  <LeftAside onCategorySelect={handleCategorySelect} onBudgetChange={handleBudgetChange}/>

  </Grid>

  <Grid item lg={9} md={9} sm={12} xs={12}>
  <RightAside selectedCategory={selectedCategory} selectedSubcategory={selectedSubcategory} minPrice={minPrice} maxPrice={maxPrice}/>
  </Grid>

</Grid>


        {/* <Box sx={{ display: "flex", mt: 4, gap: 4 }}>
          <Box flex={1}>
            <LeftAside onCategorySelect={handleCategorySelect} onBudgetChange={handleBudgetChange}/>
          </Box>
          <Box flex={3}>
            <RightAside selectedCategory={selectedCategory} selectedSubcategory={selectedSubcategory} minPrice={minPrice} maxPrice={maxPrice}/>
          </Box>
        </Box> */}
      </Box>
    </Page>
  );
};

export default Search_Results;
