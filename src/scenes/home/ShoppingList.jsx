import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material"
import Item from "../../components/Item"
import { setItems } from "../../state"
import { db } from "../../firebase/config"
import {collection, getDocs} from "firebase/firestore"


const ShoppingList = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState("all")
    const items = useSelector((state) => state.cart.items)
    const matches = useMediaQuery("(min-width:600px)")
    const handleChange = (_, newValue) => setValue(newValue)
    const clothesCollectionRef = collection(db, "categories")

    async function getItems(){
      const data = await getDocs(clothesCollectionRef)
      const formattedData = data.docs.map((doc)=> ({
        ...doc.data(),
          id: doc.id
      }))
      dispatch(setItems(formattedData))
    }

    useEffect(()=>{
      getItems()

    }, [])

    const topRatedItems = items?.find(doc => doc.id === "topRated")?.items
    const newArrivalsItems = items?.find(doc => doc.id === "newArrivals")?.items
    const bestSellersItems = items?.find(doc => doc.id === "bestSellers")?.items


  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">Our Featured <b>Products</b></Typography>
      
      <Tabs textColor="primary" indicatorColor="primary" value={value} onChange={handleChange}
       centered TabIndicatorProps={{ sx: {display: matches ? "block": "none"}}}
       sx={{m: "25px", "& .MuiTabs-flexContainer": { flexWrap:"wrap"}}}>

        <Tab label="ALL" value="all"/>
        <Tab label="NEW ARRIVALS" value="newArrivals"/>
        <Tab label="BEST SELLERS" value="bestSellers"/>
        <Tab label="TOP RATED" value="topRated"/>
      </Tabs>

      <Box margin="0 auto" display="grid" gridTemplateColumns="repeat(auto-fill, 300px)"
      justifyContent="space-around" rowGap="20px" columnGap="1.33%">
        {value === "all" && items?.map((doc) => (doc?.items?.map(item =>{ 
          const category = doc?.title
          return <Item category={category} item={item} key={`${item.id}-${item.title}`}/>
        })))}
        {value === "newArrivals" && newArrivalsItems.map((item) => (
          <Item item={item} key={`${item.id}-${item.title}`}/>
        ))}
        {value === "bestSellers" && bestSellersItems.map((item) => (
          <Item item={item} key={`${item.id}-${item.title}`}/>
        ))}
        {value === "topRated" && topRatedItems.map((item) => (
          <Item item={item} key={`${item.id}-${item.title}`}/>
        ))}
      </Box>

    </Box>
  )
}

export default ShoppingList