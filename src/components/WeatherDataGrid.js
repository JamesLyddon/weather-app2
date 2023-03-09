import React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

const WeatherDataGrid = ({ weatherData, useCelcius, setUseCelcius }) => {
  const handleClick = (e) => {
    if (e.field === 'current_temp') {
      setUseCelcius(!useCelcius)
    }
  }

  const columns = [
    {
      headerAlign: 'center',
      align: 'center',
      field: 'id',
      headerName: 'ID',
      width: 50,
    },
    {
      headerAlign: 'right',
      align: 'right',
      field: 'current_datetime',
      headerName: 'Time',
      width: 80,
    },
    {
      headerAlign: 'center',
      align: 'center',
      field: 'city',
      headerName: 'City',
      width: 200,
    },
    {
      headerAlign: 'center',
      align: 'center',
      field: 'country',
      headerName: 'Country',
      width: 200,
    },
    {
      headerAlign: 'center',
      align: 'center',
      field: 'current_temp',
      sortable: false,
      headerName: useCelcius ? '\u00B0C' : '\u00B0F',
      width: 100,
    },
    {
      headerAlign: 'center',
      align: 'center',
      field: 'icon',
      headerName: 'Conditions',
      renderCell: (params) => <img src={params.value} />,
      width: 100,
    },
    {
      headerAlign: 'center',
      align: 'center',
      field: 'plus_one_temp_c',
      headerName: '+ 1hr',
      sortable: false,
      width: 100,
    },
    {
      headerAlign: 'center',
      align: 'center',
      field: 'plus_two_temp_c',
      headerName: '+ 2hr',
      sortable: false,
      width: 100,
    },
    {
      headerAlign: 'center',
      align: 'center',
      field: 'plus_three_temp_c',
      headerName: '+ 3hr',
      sortable: false,
      width: 100,
    },
    {
      headerAlign: 'center',
      align: 'center',
      field: 'plus_four_temp_c',
      headerName: '+ 4hr',
      sortable: false,
      width: 100,
    },
  ]

  return (
    <Box sx={{ height: '50dvh', width: '100%' }}>
      <DataGrid
        sx={{ marginTop: '20px' }}
        getRowHeight={() => 'auto'}
        rows={weatherData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnMenu
        onColumnHeaderClick={(e) => handleClick(e)}
      />
    </Box>
  )
}

export default WeatherDataGrid

// import './App.css'
// import Box from '@mui/material/Box'
// import Container from '@mui/material/Container'
// import Grid from '@mui/material/Grid'
// import Paper from '@mui/material/Paper'
// import Typography from '@mui/material/Typography'
// import { DataGrid } from '@mui/x-data-grid'

// const columns = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'firstName',
//     headerName: 'First name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ]

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ]

// function App() {
//   return (
//     <div className="App">
//       <Box sx={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: {
//                 pageSize: 5,
//               },
//             },
//           }}
//           pageSizeOptions={[5]}
//           checkboxSelection
//           disableRowSelectionOnClick
//         />
//       </Box>
//     </div>
//   )
// }

// export default App