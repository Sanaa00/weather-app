import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Search from '../Component/Search'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    tagTypes: ['weather'],
  }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (search) =>
        `/weather?q=${search}&appid=${import.meta.env.VITE_API_KEY}`,
      providesTags: ['weather'],
    }),
    getCurrentWeather: builder.query({
      query: ({ lat, lon }) =>
        `weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`,
      providesTags: ['weather'],
    }),
    getHourlyCurrentWeather: builder.query({
      query: ({ lat, lon }) =>
        `forecast/hourly?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_API_KEY
        }`,
      providesTags: ['weather'],
    }),
    get5DayForecast: builder.query({
      query: ({ location }) =>
        `/forecast?q=${location}&appid=${import.meta.env.VITE_API_KEY}`,
      providesTags: ['5day-forecast'],
    }),
    get5DayForecastByCoords: builder.query({
      query: ({ lat, lon }) =>
        `forecast?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`,
      providesTags: ['5day-forecast'],
    }),
  }),
})

export const {
  useGetWeatherQuery,
  useGetCurrentWeatherQuery,
  useGetHourlyCurrentWeatherQuery,
  useGet5DayForecastQuery,
  useGet5DayForecastByCoordsQuery,
} = apiSlice
