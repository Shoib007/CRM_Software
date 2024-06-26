import { Button, Select, Table, Tag } from 'antd'
import useRequestTraining from '../hooks/request_training_hook'
import useSchools from '../hooks/fetch_schools';
import {  TrainingStatus, TrainingType } from '../utils/MenuItems';
import useUserOptions from '../hooks/fetch_user';
import { SearchOutlined } from '@ant-design/icons';
import { TbChartBubbleFilled  } from "react-icons/tb";

function RequestTraining() {
    const { requestedTraining, refetchRquestedTraining, loading, filters, setFilters } = useRequestTraining();
    const { allSchoolOptions, fetchingAllSchools } = useSchools();
    const { userName } = useUserOptions();

    const columns = [
        {
            title: "School",
            dataIndex: "school",
            key: 1,
            render: (_, { school }) => (
                <div>
                    {school.name}
                </div>
            )
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: 2,
        },
        {
            title: "Requestor",
            dataIndex: "requestor",
            key: 3,
            render: (_, { requestor }) => (
                <div>
                    {requestor.username}
                </div>
            )
        },
        {
            title: "Date",
            dataIndex: "startDate",
            key: 4,
        },
        {
            title: "Start Time",
            dataIndex: "startTime",
            key: 5,
        },
        {
            key: 6,
            title: "Grades",
            dataIndex: "grades",
            render: (_, { grades }) => (
                <div>
                    {
                        <p> {grades[0].grades} - {grades[grades.length - 1].grades} </p>
                    }
                </div>
            )
        },
        {
            key: 7,
            title: "Status",
            dataIndex: "status",
            render: (_, { status }) => (
                <div>
                    <Tag color={status === "PENDING" ? "orange" : "green"}>{status}</Tag>
                </div>
            )
        },
        // {
        //     title: "Assign",
        //     key: 7,
        //     render: (data) => (
        //         <div className='flex gap-2'>
        //             <Button className='bg-green-400 text-white' size='small' icon={<EyeOutlined/>} onClick={() => {
        //                 setTrainingData(data);
        //                 setTrainingModal(true);
        //             }} />
        //         </div>
        //     )
        // }
    ]

    return (
        <div className=''>
            {/* <AddTrainingModal data={trainingData} /> */}
            <h1 className='flex gap-2 items-center font-medium text-red-400'> <TbChartBubbleFilled /> Training Request </h1>
            <Table columns={columns} loading={loading} dataSource={requestedTraining} size='small'
                className='border rounded-lg transition'
                title={() => (
                    <div className='flex gap-2'>
                        <Select options={allSchoolOptions} loading={fetchingAllSchools} placeholder="Filter By School" className=' w-40' allowClear onChange={(value) => setFilters({ ...filters, school: value })} size='small' />

                        <Select options={TrainingType} placeholder="Filter By Subject" className=' w-40' allowClear onChange={(value) => setFilters({ ...filters, subject: value })} size='small' />

                        <Select options={userName} placeholder="Filter By Users" className=' w-40' allowClear onChange={(value) => setFilters({ ...filters, requestor: value })} showSearch optionFilterProp='label' size='small' />

                        <Select options={TrainingStatus} placeholder="Filter By Status" className=' w-40' allowClear onChange={(value) => setFilters({ ...filters, status: value })} size='small' />

                        <Button type='primary' icon={<SearchOutlined />} onClick={() => refetchRquestedTraining()} size='small'/>
                    </div>
                )}
            />
        </div>
    )
}

export default RequestTraining