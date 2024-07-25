import { Box } from '@mui/material'
import React from 'react'

const Side_Image = () => {
  return (
    <>
         <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: "2rem",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${"/loginsideimage.png"})`,

                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "none",
                  height: "60vh",
                  width: "100%",
                }}
              ></Box>
            </Box>
    </>
  )
}

export default Side_Image