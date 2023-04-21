import React from 'react'
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon  from "@mui/icons-material/NavigateNext"
import { shades } from "../../theme"

const importAll = r => 
    r.keys().reduce((acc, item) => {
        acc[item.replace("./", "")] = r(item)
        return acc
    }, {})
const heroTextureImports = importAll(
    require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
)

const MainCarousel = () => {
  const matches = useMediaQuery("(min-width:600px)")  

  return (
    <Carousel
    infiniteLoop={true} showThumbs={false} showIndicators={true} showStatus={false}
    renderArrowPrev={(onClickHandler) =>(
        <IconButton onClick={onClickHandler} 
        sx={{position: "absolute", top: "50%", left: "0", color: "white", 
        padding:"5px", zIndex:"10"}}>
            <NavigateBeforeIcon sx={{fontSize: 40}}/>        
        </IconButton>
    )}
    renderArrowNext={(onClickHandler) =>(
        <IconButton onClick={onClickHandler} 
        sx={{position: "absolute", top: "50%", right: "0", color: "white", 
        padding:"5px", zIndex:"10"}}>
            <NavigateNextIcon sx={{fontSize: 40}}/>        
        </IconButton>
    )}>

        {Object.values(heroTextureImports).map((texture, i)=>(
            <Box key={`carousel-image-${i}`}>
            <img src={texture} alt={`carousel-${i}`}
            style={{width:"100%", height:"700px", objectFit:"cover", backgroundAttachment:"fixed"}}/>

                <Box color="white" padding="20px" borderRadius="4px" textAlign="left" backgroundColor="rgba(0,0,0,0.4)"
                position="absolute" top="50.5%" left={matches ? "10%" : "0"} right={matches ? undefined : "0"}
                margin={matches ? undefined : "0 auto"} maxWidth={matches ? undefined : "240px"}>
                    <Typography color={shades.secondary[200]}>→ NEW ITEMS</Typography>
                    <Typography variant="h1">Summer Sale</Typography>
                    <Typography fontWeight="bold" color={shades.secondary[200]} sx={{textDecoration:"underline"}}>Discover More</Typography>
                </Box>

            </Box>
        ))}

    </Carousel>
  )
}

export default MainCarousel