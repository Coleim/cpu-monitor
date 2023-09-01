import { useEffect, useState } from 'react'
import './App.css'
import CpuPanel from './components/cpu/CpuPanel';
import AlertPanel from './components/alerts/AlertPanel';
import AlertBar from './components/alerts/AlertBar';
import { useAppDispatch } from './store/hooks';
import { fetchCpu } from './store/cpuStateSlice';
import { newCpuStateArrived } from './store/overloadMonitorSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchCpu())
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="main-page">
      <div className="alert-bar"><AlertBar></AlertBar></div>
      <div className="monitor-panel">
        <div className='cpu-panel'><CpuPanel></CpuPanel></div>
        <div className='alert-panel'><AlertPanel></AlertPanel></div>
      </div>
    </div>
  )
}

export default App
