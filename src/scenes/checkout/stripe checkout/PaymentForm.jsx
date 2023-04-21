import { CardElement } from "@stripe/react-stripe-js";
import { Box, Button } from "@mui/material";

import React from 'react'

const PaymentForm = () => {
  return (
    <Box>
        <CardElement/>
        <Button color="primary">Pay Now</Button>
    </Box>
  )
}

export default PaymentForm