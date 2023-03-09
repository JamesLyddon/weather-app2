import {
  Checkbox,
  Container,
  Grid,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material'

import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'

import { useState } from 'react'

const CityCard = ({
  currentWeather,
  setFavouriteLocations,
  formerFavourite,
}) => {
  const [favourited, setFavourited] = useState(formerFavourite)
  const [tempCelcius, setTempCelcius] = useState(true)

  const onChange = () => {
    setFavourited((prev) => !prev)
    const location = currentWeather.location.name.toLowerCase()
    if (favourited) {
      setFavouriteLocations((prev) => prev.filter((name) => name !== location))
    } else {
      setFavouriteLocations((prev) => {
        if (prev && prev.includes(location)) return prev
        const tmpArr = [location, ...prev]

        return tmpArr
      })
    }
  }

  return (
    <Grid container direction="column">
      {/* <Item> */}
      <Paper
        elevation={3}
        sx={{ width: '400px', height: '400px', borderRadius: '5%' }}
      >
        {/* Favourite Icon */}
        <Grid item textAlign={'end'}>
          <FormControlLabel
            control={
              <Checkbox
                checked={favourited}
                onChange={onChange}
                icon={<FavoriteBorderRoundedIcon />}
                checkedIcon={<FavoriteRoundedIcon />}
              />
            }
          />
        </Grid>
        {/* Location */}
        <Grid item>
          <Typography variant="h4">{currentWeather.location.name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            {currentWeather.location.country}
          </Typography>
        </Grid>
        {/* Weather Icon */}
        <Grid item>
          <img
            src={currentWeather.current.condition.icon}
            alt="w-icon"
            loading="lazy"
          />
        </Grid>
        {/* Temperature C/F */}
        <Grid item>
          <Typography
            variant="h4"
            onClick={() => setTempCelcius((prev) => !prev)}
          >
            {tempCelcius
              ? `${currentWeather.current.temp_c.toFixed()}\u00B0C`
              : `${currentWeather.current.temp_f.toFixed()}\u00B0F`}
          </Typography>
        </Grid>
      </Paper>
      {/* </Item> */}
    </Grid>
  )
}

export default CityCard
