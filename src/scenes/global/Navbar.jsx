import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Badge, Box, IconButton, useMediaQuery} from '@mui/material'
import {PersonOutline, ShoppingBagOutlined, SearchOutlined, MenuOutlined} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import SwiftCart from '../../assets/logo/swiftcartlogo.png'
import { setIsCartOpen } from "../../state"


const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const matches = useMediaQuery('(min-width:1200px)')

  return (
    <Box display="flex" alignItems="center" width="100%" height={matches ? "75px": "60px"}
     backgroundColor="rgba(255,255,255, 0.95)" color="black" position="fixed"
     top="0" left="0" zIndex="1">

      <Box width={matches ? "80%" : "90%"} margin="auto" display="flex" justifyContent="space-between" alignItems="center">

        <Box onClick={()=> navigate("/")} sx={{"&:hover": {cursor:"pointer"}, marginRight:"30px"}}>
          <img src={SwiftCart} alt="Swift Cart Logo" height={"auto"} width={matches ? 120 : 100} style={{objectFit:"contain"}} />
          
        </Box>
        
        <Box display="flex" justifyContent="space-between" columnGap="20px" zIndex="2">
          <IconButton sx={{color:"black"}}>
            <SearchOutlined/>
          </IconButton>
          <IconButton sx={{color:"black"}}>
            <PersonOutline/>
          </IconButton>

          <Badge badgeContent={cart.reduce((acc, item) => acc + item.count, 0)} color="secondary" invisible={cart.length === 0}
          sx={{ "& .MuiBadge-badge": {right: 5, top:5, padding: "0 4px", height: "14px", minWidth:"13px"}}}>
            <IconButton sx={{color:"black"}} onClick={()=> dispatch(setIsCartOpen({})) }>
              <ShoppingBagOutlined/>
            </IconButton>
          </Badge>

          <IconButton sx={{color:"black"}}>
            <MenuOutlined/>
          </IconButton>
        </Box>

      </Box>

    </Box>
  )
}

export default Navbar