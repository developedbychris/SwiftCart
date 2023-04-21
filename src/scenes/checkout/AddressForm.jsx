import React from 'react'
import { useMediaQuery, TextField, Box, Select, MenuItem, InputLabel, FormControl, FormHelperText}  from "@mui/material"
import { getIn } from "formik"

const countries = [
  "United States",
  "Canada",
  "Mexico",
  "Germany",
  "France",
  "United Kingdom",
  "Italy",
  "Spain",
  "Netherlands",
]

const AddressForm = ({type, values, errors, touched, handleBlur, handleChange}) => {
  const matches = useMediaQuery("(min-width:600px)")
  const formattedName = (field) => `${type}.${field}`
  
  const formattedError = (field) =>
    Boolean(
        getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    )
  
  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field))

  return (
    <Box display="grid" gap="15px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
    sx={{"& > div": {gridColumn: matches ? undefined : "span 4"}}}>

        {/* FIRST NAME */}
        <TextField fullWidth type="text" label="First Name" onBlur={handleBlur}
        onChange={handleChange} value={values.firstName} name={formattedName("firstName")} 
        error={formattedError("firstName")} helperText={formattedHelper("firstName")} 
        sx={{gridColumn:"span 2"}}/>
        {/* LAST NAME */}
        <TextField fullWidth type="text" label="Last Name" onBlur={handleBlur}
        onChange={handleChange} value={values.lastName} name={formattedName("lastName")} 
        error={formattedError("lastName")} helperText={formattedHelper("lastName")} 
        sx={{gridColumn:"span 2"}}/>
        {/* COUNTRY */}
        <FormControl fullWidth sx={{gridColumn:"span 4"}}>
          <InputLabel>Country</InputLabel>
          <Select fullWidth label="Country" onBlur={handleBlur}
          onChange={handleChange} value={values.country} name={formattedName("country")} 
          error={formattedError("country")} >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
            
          </Select>
          {formattedError("country") && <FormHelperText error>required</FormHelperText>}
        </FormControl>
        {/* STREET 1 */}
        <TextField fullWidth type="text" label="Street Address 1" onBlur={handleBlur}
        onChange={handleChange} value={values.street1} name={formattedName("street1")} 
        error={formattedError("street1")} helperText={formattedHelper("street1")} 
        sx={{gridColumn:"span 2"}}/>
        {/* STREET 2 */}
        <TextField fullWidth type="text" label="Street Address 2" onBlur={handleBlur}
        onChange={handleChange} value={values.street2} name={formattedName("street2")} 
        error={formattedError("street2")} helperText={formattedHelper("street2")} 
        sx={{gridColumn:"span 2"}}/>
        {/* CITY */}
        <TextField fullWidth type="text" label="City" onBlur={handleBlur}
        onChange={handleChange} value={values.city} name={formattedName("city")} 
        error={formattedError("city")} helperText={formattedHelper("city")} 
        sx={{gridColumn:"span 2"}}/>
        {/* STATE */}
        <TextField fullWidth type="text" label="State" onBlur={handleBlur}
        onChange={handleChange} value={values.state} name={formattedName("state")} 
        error={formattedError("state")} helperText={formattedHelper("state")} 
        sx={{gridColumn:"span 1"}}/>
        {/* ZIP CODE */}
        <TextField fullWidth type="text" label="Zip Code" onBlur={handleBlur}
        onChange={handleChange} value={values.zipCode} name={formattedName("zipCode")} 
        error={formattedError("zipCode")} helperText={formattedHelper("zipCode")} 
        sx={{gridColumn:"span 1"}}/>
        
    </Box>
  )
}

export default AddressForm