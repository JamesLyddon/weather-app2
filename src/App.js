import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Container, Grid, TextField } from '@mui/material'

import CityCard from './components/CityCard'
import WeatherDataGrid from './components/WeatherDataGrid'

import DeleteIcon from '@mui/icons-material/Delete'

function App() {
  const apiKey = 'd34d7bc68efa4646b33143938230303'
  const [searchTerm, setSearchTerm] = useState('')
  const [forecastWeather, setForecastWeather] = useState()
  const [favouriteLocations, setFavouriteLocations] = useState(
    JSON.parse(localStorage.getItem('userData'))
  )
  const [favouriteWeather, setFavouriteWeather] = useState([])
  const [useCelcius, setUseCelcius] = useState(true)

  useEffect(() => {
    getForecastWeather()
  }, [searchTerm])

  useEffect(() => {
    getFavWeather()
  }, [favouriteLocations])

  useEffect(() => {
    console.log(forecastWeather)
  }, [forecastWeather])

  const getForecastWeather = async () => {
    try {
      if (searchTerm.length < 3) return
      const res = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchTerm}`,
        {
          withCredentials: false,
        }
      )
      setForecastWeather(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getFavWeather = async () => {
    try {
      if (favouriteLocations < 1) return
      let urls = favouriteLocations.map(
        (city) =>
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`
      )

      const requests = urls.map((url) =>
        axios.get(url, {
          withCredentials: false,
        })
      )
      axios.all(requests).then((responses) => {
        setFavouriteWeather(responses)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const weatherData = favouriteWeather.map((entry, index) => {
    let currentHour = parseInt(entry.data.location.localtime.slice(-5, -3))

    return {
      id: index + 1,
      city: entry.data.location.name,
      country: entry.data.location.country,
      icon: entry.data.current.condition.icon,
      current_temp: useCelcius
        ? entry.data.current.temp_c.toFixed()
        : entry.data.current.temp_f.toFixed(),
      current_datetime: entry.data.location.localtime.slice(-5),
      plus_one_temp_c: useCelcius
        ? entry.data.forecast.forecastday[0].hour[
            currentHour + 1
          ].temp_c.toFixed()
        : entry.data.forecast.forecastday[0].hour[
            currentHour + 1
          ].temp_f.toFixed(),
      plus_two_temp_c: useCelcius
        ? entry.data.forecast.forecastday[0].hour[
            currentHour + 2
          ].temp_c.toFixed()
        : entry.data.forecast.forecastday[0].hour[
            currentHour + 2
          ].temp_f.toFixed(),
      plus_three_temp_c: useCelcius
        ? entry.data.forecast.forecastday[0].hour[
            currentHour + 3
          ].temp_c.toFixed()
        : entry.data.forecast.forecastday[0].hour[
            currentHour + 3
          ].temp_f.toFixed(),
      plus_four_temp_c: useCelcius
        ? entry.data.forecast.forecastday[0].hour[
            currentHour + 4
          ].temp_c.toFixed()
        : entry.data.forecast.forecastday[0].hour[
            currentHour + 4
          ].temp_f.toFixed(),
      delete: DeleteIcon,
    }
  })

  return (
    <Container
      sx={{ justifyContent: 'center', textAlign: 'center', marginTop: '120px' }}
    >
      <Grid container direction="column">
        <Grid item sx={{ m: 'auto' }}>
          {forecastWeather && (
            <CityCard
              currentWeather={forecastWeather}
              setFavouriteLocations={setFavouriteLocations}
              setFavouriteWeather={setFavouriteWeather}
            />
          )}
        </Grid>
      </Grid>
      <TextField
        inputProps={{ style: { textAlign: 'center', margin: '20px' } }}
        variant="standard"
        placeholder="city"
        onChange={(e) => setSearchTerm(e.target.value.trim())}
      />
      <WeatherDataGrid
        weatherData={weatherData}
        useCelcius={useCelcius}
        setUseCelcius={setUseCelcius}
        getFavWeather={getFavWeather}
      />
    </Container>
  )
}

export default App
