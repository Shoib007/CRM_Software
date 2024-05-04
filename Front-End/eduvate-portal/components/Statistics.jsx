import { TableOutlined, UserOutlined } from "@ant-design/icons"
import { Statistic } from "antd"
import { useAllTrainings } from "../hooks/fetch_training"
import useUserOptions from "../hooks/fetch_user"
import useFilterTraining from "../hooks/filter_training"


export const HeaderStatistics = () => {
    const { cs, loading, robotics, aeromodelling, dc } = useAllTrainings();
    const { ccs, crobotics, caeromodelling, cdc } = useFilterTraining({ trainingStatus: "ONGOING", active: true });
    const { userName } = useUserOptions();
    const { trainingsData } = useAllTrainings()
    const ongoingTrainings = trainingsData?.filter(training => training.trainingStatus === "ONGOING");

    // console.log(crobotics);
    return (
        <div className="flex gap-4 overflow-x-auto">

            <div className="px-6 py-2 border-b-4 w-44 border-amber-400 rounded-lg border cursor-pointer">
                <Statistic title="TOTAL TRAININGS" value={ongoingTrainings?.length} prefix={<TableOutlined />} suffix={`/ ${trainingsData?.length}`} loading={loading} />
            </div>

            <div className="px-6 py-2 border-b-4 w-40 border-emerald-400 rounded-lg border cursor-pointer">
                <Statistic title="TOTAL TRAINERS" value={userName ? userName?.length : ""} prefix={<UserOutlined />} loading={loading} />
            </div>

            <div className="px-6 py-2 border-b-4 w-40 border-purple-300 rounded-lg border cursor-pointer">
                <Statistic title="CS" value={ccs.length} prefix={<TableOutlined />} suffix={`/${cs.length}`} loading={loading} />
            </div>

            <div className="px-6 py-2 border-b-4 w-40 border-red-300 rounded-lg border cursor-pointer">
                <Statistic title="ROBOTICS" value={crobotics.length} prefix={<TableOutlined />} suffix={"/" + robotics.length} loading={loading} />
            </div>

            <div className="px-6 py-2 border-b-4 w-40 border-pink-400 rounded-lg border cursor-pointer">
                <Statistic title="AEROMODELLING" value={aeromodelling.length} prefix={<TableOutlined />} suffix={`/${caeromodelling.length}`} loading={loading} />
            </div>

            <div className="px-6 py-2 border-b-4 w-40 border-cyan-400 rounded-lg border cursor-pointer">
                <Statistic title="DOUBT SESSION" value={cdc.length} prefix={<TableOutlined />} suffix={`/${dc.length}`} loading={loading} />
            </div>
        </div>
    )
}


