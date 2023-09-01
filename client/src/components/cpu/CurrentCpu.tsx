
import { useSelector } from 'react-redux';
import {cpus, configuration} from '../../store/store'

import './CurrentCpu.css'
import { selectLatestCpus } from '../../store/cpuStateSlice';

function CpuItem({cpu, threshold}) {
    
    const userUsage = cpu.latestUsage;
    const aboveThreshold = userUsage > threshold;
    // clay-neutral
    //   // <div className={`cpu-pill clay ${aboveThreshold ? 'active' : 'ddd'}`} />
    return (
        <div className={`cpu-pill clay ${aboveThreshold ? 'clay-red' : 'clay-green'}`} >
            <span className='cpu-id'>CPU#{cpu.id}</span>
            <span className='cpu-name'>{cpu.model}</span>
            <span className='cpu-usage'>{userUsage}</span>
        </div>
    )
}


function CurrentCpu() {

    const latestCpus = useSelector((state) => selectLatestCpus(state))

    function renderCpuItems() {
        const cpuRows = [];
        latestCpus.forEach( (cpu) => {
            console.log(cpu)
            cpuRows.push(
                <CpuItem key={cpu.idx} cpu={cpu} threshold={configuration.threshold} ></CpuItem>
            );
        })
        return cpuRows;
    }
    
    return (
        <div className="cpu-pills-list">
            { renderCpuItems() }
        </div>
    )
}

export default CurrentCpu
