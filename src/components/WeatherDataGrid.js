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
      width: 160,
    },
    {
      headerAlign: 'center',
      align: 'center',
      field: 'country',
      headerName: 'Country',
      width: 160,
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
    {
      headerAlign: 'center',
      align: 'center',
      field: 'delete',
      headerName: 'Delete',
      renderCell: (params) => <params.value />,
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
