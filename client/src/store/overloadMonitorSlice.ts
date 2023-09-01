import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

const overloadMonitorSlice = createSlice({
  name: 'cpu/overload',
  initialState,
  reducers: {
    newCpuStateArrived(state, action) {
      // console.log("newCpuStateArrived")
      // console.log("state : " , state)
      // console.log("action : " , action)
    }
  }
})

export const { newCpuStateArrived } = overloadMonitorSlice.actions

export default overloadMonitorSlice.reducer

