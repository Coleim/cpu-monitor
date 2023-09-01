import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from '@reduxjs/toolkit'
import { DefaultApiFactory, Times } from "../_generated-api"
import { newCpuStateArrived } from "./overloadMonitorSlice"

export const fetchCpu = createAsyncThunk('cpu/fetchCpu', async () => {
    const response = await DefaultApiFactory().getCpu()
    return response.data
})

interface CpuUsage {
  id:number;
  model:string;
  usageHistory: number[];
}

interface cpuState {
  cpuUsage: CpuUsage[];
  status: string;
  error?: string;
}

const initialState: cpuState = {
  cpuUsage: [],
  status: 'idle'
}

const cpuStateSlice = createSlice({
  name: 'cpu',
  initialState,
  reducers: {
    reactionAdded(state, action) {
        console.log("reactionAdded")
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCpu.pending, (state, _) => {
        // state.status = 'loading'
      })
      .addCase(fetchCpu.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Initial setup
        if(state.cpuUsage.length === 0) {
          action.payload.forEach( (cpu) => {
            if(cpu.id !== undefined && cpu.model !== undefined && cpu.usage !== undefined) {
              let newCpu: CpuUsage = {
                id: cpu.id,
                model: cpu.model,
                usageHistory: [cpu.usage]
              };
              state.cpuUsage.push(newCpu)
            }
          })
        } else {
          state.cpuUsage.forEach( cpu => {
            const incomingCpu = action.payload[cpu.id];
            if(cpu.id === incomingCpu.id) {
              if(incomingCpu.usage) {
                cpu.usageHistory.push(incomingCpu.usage);
                // TODO if usageHistory too big , remove firsts N events
              }
            } else {
              //todo : raise error or hanfle exception by adding new cpu or rebind to correct one 
            }
          })
        }
      })
      .addCase(fetchCpu.rejected, (state, action) => {
        // state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { reactionAdded } = cpuStateSlice.actions

export default cpuStateSlice.reducer


export const cpuMiddleware = (store) => (next) => (action) => {
    if (action.type === fetchCpu.fulfilled.type) {
      store.dispatch(newCpuStateArrived(action.payload))
    }
    return next(action);
};

// TODO : https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization
export const selectLatestCpus = (state) => state.cpu.cpuUsage.map( (cpu: CpuUsage) => ({
  id: cpu.id,
  model: cpu.model,
  latestUsage: cpu.usageHistory[cpu.usageHistory.length-1],
}))
  