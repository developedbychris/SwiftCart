import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Box, Button, Typography, useMediaQuery, Divider } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { countryToAlpha2 } from "country-to-iso"
import { FlexBox } from "../../global/CartMenu"
import { useNavigate } from "react-router-dom"
import { clearCart } from "../../../state"

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const cart = useSelector((state)=> state.cart.cart)
  const subtotal = useSelector((state) => state.cart.subtotal)
  const userInfo = useSelector((state) => state.cart.userInfo)
  const matches = useMediaQuery("(min-width:600px)")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const paymentHandler = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: subtotal * 100 }),
    }).then((res) => {
      return res.json()
    })
    const {
      paymentIntent: { client_secret },
    } = response
    console.log(client_secret)

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${userInfo.firstName} ${userInfo.lastName}`,
          // address:{
          //   city: userInfo.city,
          //   country: countryToAlpha2(userInfo.country),
          //   state: userInfo.state,
          //   line1: userInfo.street1,
          //   line2: userInfo.street2,
          //   postal_code: userInfo.zipCode
          // }
        },
      },
    })

    if (paymentResult.error) {
      alert(paymentResult.error.message)
      console.log(paymentResult.error)
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        console.log(userInfo)
        dispatch(clearCart([]))
        navigate("/checkout/success")
      }
    }
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="start" alignItems="center" p="80px 40px"  mt={matches ? "0" : "100px"}>
      <Typography></Typography>
      <Box>
        {cart.map((item)=>(
          <Box key={`${item?.name}-${item?.id}`}>
          <FlexBox p="15px 0">
            <Box flex="1 1 40%" mr="20px">
                <img alt={item?.name} width="123px" height="164px" 
                src={item?.imageUrl} />
            </Box>

            <Box flex="1 1 40%">
              {/* ITEM NAME */}
              <Typography fontWeight="bold">
                  {item?.name}
              </Typography>
                {/* AMOUNT - PLUS MINUS */}
                <FlexBox m="15px 0">
                  <Box display="flex" alignItems="center">
                      <Typography>X {item.count}</Typography>
                  </Box>
                  {/* PRICE */}
                  <Typography fontWeight="bold">${item?.price}</Typography>                                        
                </FlexBox>
            </Box>
          </FlexBox>
          <Divider/>
        </Box>
        ))}
      </Box>
      
      <Typography variant="h4" gutterBottom>
        Payment Details
      </Typography>
      <Box mt={4} width={matches ? "40%" : "90%"}>
        <CardElement />
      </Box>
      <Box mt={4} width={matches ? "40%" : "80%"} mb="20px">
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={paymentHandler}
        >
          Pay Now
        </Button>
      </Box>
      <Box m="20px">
        <Typography variant="h3"> Your Total: $<b>{subtotal}</b></Typography>
      </Box>
      <Typography m="10px">To test your purchase use:</Typography>
      <Typography mb="10px"><b>Card</b>: 4242 4242 4242 4242</Typography>
      <Typography mb="10px"><b>Exp Date</b>: Any future date</Typography>
      <Typography mb="10px"><b>CVC</b>: Any 3 digits</Typography>
      <Typography mb="10px"><b>ZIP</b>: 12345</Typography>
      
    </Box>
  )
}

export default PaymentForm
