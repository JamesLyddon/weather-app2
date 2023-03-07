import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'

const CityCard = ({ currentWeather }) => {
  return (
    <div>
      <Typography variant="h3">
        {currentWeather.current.temp_c}&deg;C
      </Typography>
      <Typography variant="h3">{currentWeather.location.name}</Typography>
      <Typography variant="h6">{currentWeather.location.country}</Typography>
    </div>
  )
}

export default CityCard
