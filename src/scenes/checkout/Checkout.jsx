import React, {useState, useEffect} from 'react'
import { useSelector } from "react-redux"
import { Box, Button, Stepper, Step, StepLabel, Typography, useMediaQuery } from "@mui/material"
import {Formik} from "formik"
import { shades } from "../../theme"
import { initialValues, checkoutSchema } from "./checkoutValues"
import Shipping from './Shipping'
import HomeIcon from '@mui/icons-material/Home';
import Payment from './Payment'


const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0)
  const cart = useSelector((state) => state.cart.cart)
  const isFirstStep = activeStep === 0
  const isSecondStep = activeStep === 1
  const matches = useMediaQuery("(min-width:600px)")

  const handleFormSubmit = async (values, actions) =>{
    setActiveStep(activeStep + 1)
    
    //! copies billing address onto shipping address
    if(isFirstStep && values.shippingAddress.isSameAddress){
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true
      })
    }

    if(isSecondStep){
      makePayment(values)
    } 

    actions.setTouched({})
  }

  async function makePayment(values) {
    // const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };


    // const session = await(createStripeCheckout(requestBody))
    // await stripe.redirectToCheckout({
    //   sessionId: session.id
    // });
  }


  return ( 
    cart.length === 0 ? (
     <Box width="80%" m="200px auto" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
      <Typography variant={matches ? "h2" : "h3"} textAlign="center" mb="15px" fontWeight="bold">Your Cart Is Empty.</Typography>
      <Button variant="outlined" color="error" size="large" href="/" startIcon={<HomeIcon sx={{mr: "5px", fontSize: matches ? "25px" : "20px"}}/> }>
      Return Home</Button>
     </Box> 
    ) : (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{m:"20px 0"}}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>

      <Box>
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema[activeStep]}>
          {
            ({values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue}) => (
              <form onSubmit={handleSubmit}>
                {
                  isFirstStep && (
                    <Shipping values={values} errors={errors} touched={touched}
                    handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue}/>
                  )
                }
                {
                  isSecondStep && (
                    <Payment values={values} errors={errors} touched={touched}
                    handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue}/>
                  )
                }

                <Box display="flex" justifyContent="space-between" gap="50px">
                  {!isFirstStep && (
                    <Button fullWidth color="primary" variant="contained" onClick={()=> setActiveStep(activeStep - 1)}
                    sx={{backgroundColor:shades.primary[200], boxShadow:"none", color:"white", borderRadius:0, padding:"15px 40px"}}>
                      Back
                    </Button>
                  )}
                  <Button fullWidth type="submit" color="primary" variant="contained"
                  sx={{backgroundColor:shades.primary[400], boxShadow:"none", color:"white", borderRadius:0, padding:"15px 40px"}}>
                    {isFirstStep ? "Next" : "Place Order"}
                  </Button>
                </Box>
              </form>
            )
          }
        </Formik>
      </Box>
    </Box>
  ))
}

export default Checkout