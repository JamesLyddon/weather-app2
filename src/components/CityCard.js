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
        localStorage.setItem('userData', JSON.stringify(tmpArr))
        return tmpArr
      })
    }
  }

  let currentHour = parseInt(currentWeather.location.localtime.slice(-5, -3))

  return (
    <Grid container direction="column">
      {/* <Item> */}
      <Paper
        elevation={3}
        sx={{ width: '400px', height: '400px', borderRadius: '5%' }}
      >
        {/* Favourite Icon */}
        <Grid textAlign={'end'}>
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
        <Grid>
          <Typography variant="h4">{currentWeather.location.name}</Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle1">
            {currentWeather.location.country}
          </Typography>
        </Grid>
        {/* Weather Icon */}
        <Grid>
          <img
            src={currentWeather.current.condition.icon}
            alt="w-icon"
            loading="lazy"
          />
        </Grid>
        {/* Temperature C/F */}
        <Grid>
          <Typography
            variant="h4"
            onClick={() => setTempCelcius((prev) => !prev)}
          >
            {tempCelcius
              ? `${currentWeather.current.temp_c.toFixed()}\u00B0C`
              : `${currentWeather.current.temp_f.toFixed()}\u00B0F`}
          </Typography>
        </Grid>
        {/* hourly forecast */}
        <Grid container flexDirection="row" justifyContent="center">
          {/* +1 hour Temperature C/F */}
          <Grid>
            <img
              src={
                currentWeather.forecast.forecastday[0].hour[currentHour + 1]
                  .condition.icon
              }
              alt="w-icon"
              loading="lazy"
            />
            <Typography
              variant="subtitle1"
              onClick={() => setTempCelcius((prev) => !prev)}
            >
              {tempCelcius
                ? `${currentWeather.forecast.forecastday[0].hour[
                    currentHour + 1
                  ].temp_c.toFixed()}\u00B0C`
                : `${currentWeather.forecast.forecastday[0].hour[
                    currentHour + 1
                  ].temp_f.toFixed()}\u00B0F`}
            </Typography>
          </Grid>
          {/* +2 hour Temperature C/F */}
          <Grid>
            <img
              src={
                currentWeather.forecast.forecastday[0].hour[currentHour + 2]
                  .condition.icon
              }
              alt="w-icon"
              loading="lazy"
            />
            <Typography
              variant="subtitle1"
              onClick={() => setTempCelcius((prev) => !prev)}
            >
              {tempCelcius
                ? `${currentWeather.forecast.forecastday[0].hour[
                    currentHour + 2
                  ].temp_c.toFixed()}\u00B0C`
                : `${currentWeather.forecast.forecastday[0].hour[
                    currentHour + 2
                  ].temp_f.toFixed()}\u00B0F`}
            </Typography>
          </Grid>
          {/* +3 hour Temperature C/F */}
          <Grid>
            <img
              src={
                currentWeather.forecast.forecastday[0].hour[currentHour + 3]
                  .condition.icon
              }
              alt="w-icon"
              loading="lazy"
            />
            <Typography
              variant="subtitle1"
              onClick={() => setTempCelcius((prev) => !prev)}
            >
              {tempCelcius
                ? `${currentWeather.forecast.forecastday[0].hour[
                    currentHour + 3
                  ].temp_c.toFixed()}\u00B0C`
                : `${currentWeather.forecast.forecastday[0].hour[
                    currentHour + 3
                  ].temp_f.toFixed()}\u00B0F`}
            </Typography>
          </Grid>
          {/* +4 hour Temperature C/F */}
          <Grid>
            <img
              src={
                currentWeather.forecast.forecastday[0].hour[currentHour + 4]
                  .condition.icon
              }
              alt="w-icon"
              loading="lazy"
            />
            <Typography
              variant="subtitle1"
              onClick={() => setTempCelcius((prev) => !prev)}
            >
              {tempCelcius
                ? `${currentWeather.forecast.forecastday[0].hour[
                    currentHour + 4
                  ].temp_c.toFixed()}\u00B0C`
                : `${currentWeather.forecast.forecastday[0].hour[
                    currentHour + 4
                  ].temp_f.toFixed()}\u00B0F`}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {/* </Item> */}
    </Grid>
  )
}

export default CityCard
