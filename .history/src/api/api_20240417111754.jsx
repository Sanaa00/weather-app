import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    tagTypes: ['weather', '5day-forecast'],
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

    get5DayForecast: builder.query({
      query: (search) =>
        `/forecast?q=${search}&appid=${import.meta.env.VITE_API_KEY}`,
      providesTags: ['5day-forecast'],
    }),
    get5DayForecastByCoords: builder.query({
      query: ({ lat, lon }) =>
        `forecast?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`,
      providesTags: ['5day-forecast'],
    }),
    getCitySuggestions: builder.query({
      query: (input) =>
        `/find?q=${input}&appid=${import.meta.env.VITE_API_KEY}`,
    }),
  }),
})

export const {
  useGetWeatherQuery,
  useGetCurrentWeatherQuery,
  useGet5DayForecastQuery,
  useGet5DayForecastByCoordsQuery,
  useGetCitySuggestionsQuery,
} = apiSlice
