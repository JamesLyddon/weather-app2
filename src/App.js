import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'

import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'

import CityCard from './components/CityCard'

function App() {
  const apiKey = 'd34d7bc68efa4646b33143938230303'

  const [searchTerm, setSearchTerm] = useState('London')
  const [favourite, setFavourite] = useState(false)
  const [favLocationNames, setFavLocationNames] = useState([])
  const [favLocationData, setFavLocationData] = useState([])
  const [currentWeather, setCurrentWeather] = useState({
    location: {
      name: 'London',
      region: 'City of London, Greater London',
      country: 'United Kingdom',
      lat: 51.52,
      lon: -0.11,
      tz_id: 'Europe/London',
      localtime_epoch: 1678196002,
      localtime: '2023-03-07 13:33',
    },
    current: {
      last_updated_epoch: 1678195800,
      last_updated: '2023-03-07 13:30',
      temp_c: 3.0,
      temp_f: 37.4,
      is_day: 1,
      condition: {
        text: 'Light sleet',
        icon: '//cdn.weatherapi.com/weather/64x64/day/317.png',
        code: 1204,
      },
      wind_mph: 6.9,
      wind_kph: 11.2,
      wind_degree: 330,
      wind_dir: 'NNW',
      pressure_mb: 1000.0,
      pressure_in: 29.53,
      precip_mm: 0.2,
      precip_in: 0.01,
      humidity: 81,
      cloud: 100,
      feelslike_c: 0.6,
      feelslike_f: 33.1,
      vis_km: 10.0,
      vis_miles: 6.0,
      uv: 1.0,
      gust_mph: 6.3,
      gust_kph: 10.1,
    },
  })

  // autocomplete weather search by location
  useEffect(() => {
    getWeather()
    console.log(favLocationData)
  }, [searchTerm])

  // update favourite location weather data
  useEffect(() => {
    favLocationNames.forEach((name) => {
      const getFavWeather = async () => {
        try {
          // early return to prevent serch queries under 3 letters
          if (searchTerm.length < 3) return
          const res = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${name}`,
            {
              withCredentials: false,
            }
          )
          setFavLocationData((prev) => [...prev, res.data])
        } catch (err) {
          console.log(err)
        }
      }
      getFavWeather()
    })
  }, [favLocationNames])

  const getWeather = async () => {
    try {
      // early return to prevent serch queries under 3 letters
      if (searchTerm.length < 3) return
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchTerm}`,
        {
          withCredentials: false,
        }
      )
      console.log(res.data)
      setCurrentWeather(res.data)
      if (favLocationNames.includes(res.data.location.name)) {
        setFavourite(true)
      } else {
        setFavourite(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onFavourite = (e) => {
    setFavourite(e.target.checked)
    if (
      !favourite &&
      !favLocationNames.includes(currentWeather.location.name)
    ) {
      // add location to favourite list
      setFavLocationNames((prev) => [...prev, currentWeather.location.name])
    } else if (favourite) {
      //remove location from favourite list
      setFavLocationNames((prev) =>
        prev.filter((name) => name !== currentWeather.location.name)
      )
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <FormControlLabel
          control={
            <Checkbox
              checked={favourite}
              onChange={(e) => onFavourite(e)}
              icon={<FavoriteBorderRoundedIcon />}
              checkedIcon={<FavoriteRoundedIcon />}
            />
          }
        />
        <Typography variant="h3">
          {currentWeather.current.temp_c}&deg;C
        </Typography>
        <Typography variant="h3">{currentWeather.location.name}</Typography>
        <Typography variant="h6">{currentWeather.location.country}</Typography>
        <TextField
          variant="standard"
          placeholder="city"
          onChange={(e) => setSearchTerm(e.target.value.trim())}
        />
        <Typography variant="p">
          {favLocationData.map((item) => (
            <CityCard key={item.location.lon} currentWeather={item} />
          ))}
        </Typography>
      </header>
    </div>
  )
}

export default App

// import './App.css'
// import axios from 'axios'
// import { useState, useEffect } from 'react'
// import {
//   Checkbox,
//   FormControlLabel,
//   TextField,
//   Typography,
// } from '@mui/material'

// import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
// import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'

// function App() {
//   const apiKey = 'd34d7bc68efa4646b33143938230303'

//   const [searchTerm, setSearchTerm] = useState('London')
//   const [favourite, setFavourite] = useState(false)
//   const [favLocationNames, setFavLocationNames] = useState([])
//   const [favLocationData, setFavLocationData] = useState([])
//   const [currentWeather, setCurrentWeather] = useState({
//     location: {
//       name: 'London',
//       region: 'City of London, Greater London',
//       country: 'United Kingdom',
//       lat: 51.52,
//       lon: -0.11,
//       tz_id: 'Europe/London',
//       localtime_epoch: 1678196002,
//       localtime: '2023-03-07 13:33',
//     },
//     current: {
//       last_updated_epoch: 1678195800,
//       last_updated: '2023-03-07 13:30',
//       temp_c: 3.0,
//       temp_f: 37.4,
//       is_day: 1,
//       condition: {
//         text: 'Light sleet',
//         icon: '//cdn.weatherapi.com/weather/64x64/day/317.png',
//         code: 1204,
//       },
//       wind_mph: 6.9,
//       wind_kph: 11.2,
//       wind_degree: 330,
//       wind_dir: 'NNW',
//       pressure_mb: 1000.0,
//       pressure_in: 29.53,
//       precip_mm: 0.2,
//       precip_in: 0.01,
//       humidity: 81,
//       cloud: 100,
//       feelslike_c: 0.6,
//       feelslike_f: 33.1,
//       vis_km: 10.0,
//       vis_miles: 6.0,
//       uv: 1.0,
//       gust_mph: 6.3,
//       gust_kph: 10.1,
//     },
//   })

//   // autocomplete weather search by location
//   useEffect(() => {
//     getWeather()
//     console.log(favLocationData)
//   }, [searchTerm])

//   // update favourite location weather data
//   useEffect(() => {
//     favLocationNames.forEach((name) => {
//       const getFavWeather = async () => {
//         try {
//           // early return to prevent serch queries under 3 letters
//           if (searchTerm.length < 3) return
//           const res = await axios.get(
//             `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${name}`,
//             {
//               withCredentials: false,
//             }
//           )
//           setFavLocationData((prev) => [...prev, res.data])
//         } catch (err) {
//           console.log(err)
//         }
//       }
//       getFavWeather()
//     })
//   }, [favLocationNames])

//   const getWeather = async () => {
//     try {
//       // early return to prevent serch queries under 3 letters
//       if (searchTerm.length < 3) return
//       const res = await axios.get(
//         `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchTerm}`,
//         {
//           withCredentials: false,
//         }
//       )
//       console.log(res.data)
//       setCurrentWeather(res.data)
//       if (favLocationNames.includes(res.data.location.name)) {
//         setFavourite(true)
//       } else {
//         setFavourite(false)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const onFavourite = (e) => {
//     setFavourite(e.target.checked)
//     if (
//       !favourite &&
//       !favLocationNames.includes(currentWeather.location.name)
//     ) {
//       // add location to favourite list
//       setFavLocationNames((prev) => [...prev, currentWeather.location.name])
//     } else if (favourite) {
//       //remove location from favourite list
//       setFavLocationNames((prev) =>
//         prev.filter((name) => name !== currentWeather.location.name)
//       )
//     }
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={favourite}
//               onChange={(e) => onFavourite(e)}
//               icon={<FavoriteBorderRoundedIcon />}
//               checkedIcon={<FavoriteRoundedIcon />}
//             />
//           }
//         />
//         <Typography variant="h3">
//           {currentWeather.current.temp_c}&deg;C
//         </Typography>
//         <Typography variant="h3">{currentWeather.location.name}</Typography>
//         <Typography variant="h6">{currentWeather.location.country}</Typography>
//         <TextField
//           variant="standard"
//           placeholder="city"
//           onChange={(e) => setSearchTerm(e.target.value.trim())}
//         />
//         <Typography variant="p">
//           {favLocationData.map((item) => item.location.region)}
//         </Typography>
//       </header>
//     </div>
//   )
// }

// export default App
