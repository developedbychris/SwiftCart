import React from 'react'
import {Box, Typography, useTheme, useMediaQuery} from "@mui/material"
import { shades } from "../../theme"
import SwiftCart from "../../assets/logo/swiftcartlogo.png"

const Footer = () => {
  const matches = useMediaQuery("(min-width:600px)")
  const mbVal = matches ? "30px" : "15px"
  const widthVal = matches ? "20%" : "40%"
  const {palette: {neutral}} = useTheme()
  return (
    <Box mt="70px" p="40px 0"  backgroundColor={neutral.light}>
        <Box width="85%" margin="auto" display="flex" justifyContent="space-between" 
        flexWrap="wrap" rowGap="30px" columnGap="clamp(20px, 30px, 40px)">
            <Box width={`clamp(20%, ${widthVal}, 45%)`}>
                <img src={SwiftCart} alt="swiftcart-logo" width={matches ? 150 : 100} height={"auto"} style={{objectFit:"contain", marginBottom:"15px"}}/>
                <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, cum assumenda doloribus 
                labore expedita.</Typography>
            </Box>
            <Box>
                <Typography variant="h4" fontWeight="bold" mb={mbVal}>About Us</Typography>
                <Typography mb={mbVal}>Careers</Typography>
                <Typography mb={mbVal}>Our Stores</Typography>
                <Typography mb={mbVal}>Terms & Conditions</Typography>
                <Typography mb={mbVal}>Privacy Policy</Typography>
            </Box>
            <Box>
                <Typography variant="h4" fontWeight="bold" mb={mbVal}>Customer Care</Typography>
                <Typography mb={mbVal}>Help Center</Typography>
                <Typography mb={mbVal}>Track Your Order</Typography>
                <Typography mb={mbVal} fontSize="">Corporate & Bulk Purchasing</Typography>
                <Typography mb={mbVal}>Returns & Refunds</Typography>
            </Box>
            <Box width="clamp(25%, 40%, 50%)">
                <Typography variant="h4" fontWeight="bold" mb={mbVal}>Contact Us</Typography>
                <Typography mb={mbVal}>123 Main Street Anytown, USA 54321</Typography>
                <Typography mb={mbVal} sx={{ wordWrap: "break-word" }}> Email: swiftcart@gmail.com</Typography>
                <Typography mb={mbVal}>(222)333-4444</Typography>
            </Box>
            
        </Box>
        <h4 style={{textAlign:"center", margin:"40px 0 auto"}}>© 2023 SwiftCart. All rights reserved.</h4>
    </Box>
  )
}

export default Footer