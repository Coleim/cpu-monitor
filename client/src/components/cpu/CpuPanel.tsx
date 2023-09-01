import CpuHistory from "./CpuHistory"
import CurrentCpu from "./CurrentCpu"

function CpuPanel() {
    return (
        <div>
            <CurrentCpu></CurrentCpu>
            <CpuHistory></CpuHistory>
        </div>
    )
}

export default CpuPanel
