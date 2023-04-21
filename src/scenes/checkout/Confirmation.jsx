import { Box, Typography, useMediaQuery, Button } from "@mui/material"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import { useSelector } from "react-redux"
import HomeIcon from '@mui/icons-material/Home';


const Confirmation = () => {
  const userInfo = useSelector((state)=> state.cart.userInfo)
  const cart = useSelector((state)=> state.cart.items)
  const matches = useMediaQuery("(min-width:600px)")
  return (cart.length === 0 ? (
    <Box width="80%" m="200px auto" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
     <Typography variant={matches ? "h2" : "h3"} textAlign="center" mb="15px" fontWeight="bold">Your Cart Is Empty.</Typography>
     <Button variant="outlined" color="error" size="large" href="/" startIcon={<HomeIcon sx={{mr: "5px", fontSize: matches ? "25px" : "20px"}}/> }>
     Return Home</Button>
    </Box> 
   ) :
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —{" "}
        <strong>Congrats on Making your Purchase</strong>
        <Typography mt="5px" fontSize="11px">Receipt sent to: {userInfo.email}</Typography>
      </Alert>
    </Box>
  )
}

export default Confirmation
