import { Box, Typography } from "@mui/material";

export const Heading = ({ children, ...props }) => {
  return (
    <Typography variant="h3" fontWeight="bold" color="primary" {...props} fontSize={'18px'}>
      {children}
    </Typography>
  );
};
export const Paragraph = ({ children, ...props }) => {
  return (
    <Typography sx={{ mt: 2, color: "grey", fontSize:'13px' }} {...props}>
      {children}
    </Typography>
  );
};

export const CH_Box_Text = ({ text, ...props }) => {
  return (
    <Box sx={{ display: "flex", mt: 2, alignItems: "center" }} {...props}>
      <img src="/icons/tickmark.svg" height={'15px'} width={'15px'}/>
      <Typography fontWeight="bold" sx={{ ml: 1.5 }} fontSize={'12px'}>
        {text}
      </Typography>
    </Box>
  );
};

export const List = ({ txt }) => {
  return (
    <ul style={{ marginLeft: "25px" }}>
      <li>
        <Heading sx={{ mt: 3, color: "#000" }} variant="h6">
          {txt}
        </Heading>
      </li>
    </ul>
  );
};
