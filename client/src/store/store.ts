
export const configuration = {
  threshold: 6705609,
  duration: 5
}


// https://redux.js.org/tutorials/essentials/part-5-async-logic
// https://codesandbox.io/s/github/reduxjs/redux-essentials-example-app/tree/checkpoint-3-postRequests/?from-embed

import { configureStore } from '@reduxjs/toolkit'
import cpuReducer, { cpuMiddleware } from '../store/cpuStateSlice'
import overloadReducer from '../store/overloadMonitorSlice'

export const store = configureStore({
    reducer: {
      cpu: cpuReducer,
      overload: overloadReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cpuMiddleware),
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

