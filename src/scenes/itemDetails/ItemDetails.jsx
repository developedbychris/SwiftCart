import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { IconButton, Box, Typography, Button, Tabs, Tab, useMediaQuery } from "@mui/material"
import { NavigateBefore, NavigateNext } from "@mui/icons-material"
import FavoriteBorderOutlinedIcon  from "@mui/icons-material/FavoriteBorderOutlined"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { shades } from "../../theme"
import { addToCart } from "../../state"
import { useNavigate , useParams } from "react-router-dom"
import Item from "../../components/Item"
import { db } from "../../firebase/config"
import {collection, getDocs,} from "firebase/firestore"

const ItemDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { itemId } = useParams()
  const [value, setValue] = useState("description")
  const [count, setCount] = useState(1)
  const [item, setItem] = useState(null)
  const [items, setItems] = useState([])
  const [category, setCategory] = useState(null)
  const matches = useMediaQuery("(min-width:600px)")
  const handleChange = (_, newValue) => setValue(newValue)
  const clothesCollectionRef = collection(db, "categories")

  async function getItem(){
    try {
          const data = await getDocs(clothesCollectionRef)
          const formattedData = data.docs.map((doc)=> ({
            ...doc.data(),
            id: doc.id
          }))
          const allItems = formattedData?.reduce((accumulator, category) => {
            return accumulator.concat(category.items);
          }, []);
          const itemDoc = allItems.filter(item => item.id === Number(itemId))
          setItem(itemDoc[0])
          const itemCategory = formattedData.find((doc) => doc?.items?.find((item) => item?.id === Number(itemId))).title
          setCategory(itemCategory)
    } catch (error) {
      console.error(error)
    }
  }

  //** gets related items
  async function getItems(){
    const data = await getDocs(clothesCollectionRef)
        const formattedData = data?.docs.map((doc)=> ({
          ...doc.data(),
           id: doc.id
        }))
    dispatch(setItems(formattedData))
  }

  useEffect(()=>{
    getItem()
    getItems()
  }, [itemId]) 

  const filteredItems = items?.find(doc => doc.title === category)?.items
    .filter(items => items.id !== item?.id)

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img src={item?.imageUrl} 
          alt={item?.name} width="100%" height="100%" style={{objectFit:"contain"}}/>
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent={matches ? "end" : "center" } alignItems="center">
            {itemId > 1 && 
            <IconButton onClick={()=> navigate(`/item/${Number(itemId) - 1}`)}>
              <NavigateBefore sx={{fontSize:"40px"}}/>
            </IconButton>}
            {itemId < 18 && 
            <IconButton onClick={()=> navigate(`/item/${Number(itemId) + 1}`)}>
              <NavigateNext sx={{fontSize:"40px"}}/>
            </IconButton>}
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.name}</Typography>
            <Typography sx={{mt:"5px"}}>${item?.price}</Typography>
            <Typography sx={{mt:"20px"}}> {item?.longDesc}</Typography>
          </Box>

          {/* COUNT & BUTTONS */}
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box display="flex" alignItems="center" border={`1.5px solid${shades.neutral[300]}`} 
            mr="20px" p="2px 5px">
              
              <IconButton onClick={()=> setCount(Math.max(count -1, 1))}>
                <RemoveIcon/>
              </IconButton>
              <Typography sx={{p: "0 5px"}}>{count}</Typography>
              <IconButton onClick={()=> setCount(count + 1)}>
                <AddIcon/>
              </IconButton>
            </Box>

            <Button sx={{backgroundColor: "#222222", color:"white", borderRadius:0, minWidth:"150px", padding: "10px 40px"}}
            onClick={()=> dispatch(addToCart({item: {...item, count}}))}>
              ADD TO CART
            </Button>
          </Box>

          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon/>
              <Typography sx={{ml: "5px"}}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORY: {category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description"/>
          <Tab label="REVIEWS" value="reviews"/>
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item?.longDesc}</div>
        )}
        {value === "reviews" && <div>N/A</div>}
      </Box>
      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold" textAlign="center"> Related Products </Typography>
      </Box>
      <Box mt="20px" display="flex" flexWrap="wrap" columnGap="1.33%" justifyContent="center">
        {filteredItems?.map(item =>(
          <Item category={category} key={`${item?.name}-${item.id}`} item={item}/>
        ))
        }
      </Box>
    </Box>
  )
}

export default ItemDetails