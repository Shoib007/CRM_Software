import React, { useContext, useEffect, useState } from 'react'
import { Button, Table, Tooltip, Skeleton, Popconfirm, Select } from 'antd';
import useSchools, { useSchoolById } from '../hooks/fetch_schools';
import { ArrowLeftOutlined, DeleteOutlined, EyeOutlined, PlusCircleOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ModalContext } from '../context/modal_context';
import SchoolModal from '../modals/add_school';
import EditSchoolModel from '../modals/edit_school';
import { useNavigate, useParams } from 'react-router-dom';



function Schools() {
  const { schools, fetchingSchool, fetchingAllSchools, allSchoolOptions, fetchSchools, setPagination, pagination } = useSchools();
  const { setSchoolModal, setEditSchoolModal } = useContext(ModalContext);
  const [schoolData, setSchoolData] = useState({});
  const [school, setSchool] = useState(schools);
  const { deleteSchool, loading } = useSchoolById();

  const filterSchool = (schoolId) => {
    const school = []
    school.push(schools.find((school) => school.id === schoolId))
    setSchool(school);
    // console.log(school)
  }

  const onClear = () => {
    setSchool(schools);
  }

  const columns = [
    {
      title: 'School Name',
      dataIndex: 'name',
      key: 'id',
    },
    {
      title: 'ERP Code',
      dataIndex: 'erp_code',
      key: 'erp_code',
    },
    {
      title: 'Grades',
      dataIndex: 'grades',
      key: 'id',
      render: (_, { grades }) => (
        <div className='flex gap-1 flex-wrap'>
          {/* {console.log(grades)} */}
          <p className='p-2 bg-emerald-400 rounded-xl text-white'>{grades[0]?.grades} - {grades[grades.length - 1]?.grades}</p>
        </div>
      )
    },
    {
      title: 'Academic Manager',
      dataIndex: 'am',
      key: 'id',
      render: (text) => <p>{text?.username}</p>
    },
    {
      title: 'Operational Manager',
      dataIndex: 'om',
      key: 'id',
      render: (text) => <p>{text?.username}</p>
    },
    {
      title: "Action",
      key: "id",
      render: (school) => (
        <div className='flex gap-1'>

          <Tooltip title="View Details">
            <Button icon={<EyeOutlined />} onClick={() => {
              setSchoolData(school)
              setEditSchoolModal(true);
            }} />
          </Tooltip>

          <Popconfirm
            title={`Delete ${school.name}`}
            description="It will detelte the school permanently"
            onConfirm={() => deleteSchool(school.id)}
            onButtonProps={{ loading: loading }}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>

        </div>
      )
    }

  ]

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  }

  useEffect(() => {
    setSchool(schools)
  }, [schools])

  return (
    <div className=''>
      <EditSchoolModel schoolData={schoolData} />

      <Table columns={columns} dataSource={school} loading={fetchingSchool} size='small' className='border rounded-lg' title={() => (
        <div className='flex justify-end gap-4'>

          <Select placeholder="Search by School Name" options={allSchoolOptions} loading={fetchingAllSchools} optionFilterProp='label' allowClear suffixIcon={<SearchOutlined />} showSearch onSelect={value => filterSchool(value)} onClear={onClear}/>

          <Tooltip title="Add New School">
            <Button shape='round' icon={<PlusCircleOutlined />} onClick={() => setSchoolModal(true)}> ADD </Button>
          </Tooltip>

          <Tooltip title="Refresh Data">
            <Button shape='round' icon={<ReloadOutlined />} onClick={() => fetchSchools({ limit: pagination.pageSize, offset: (pagination.current - 1) * pagination.pageSize })} />
          </Tooltip>
        </div>
      )} pagination={pagination} onChange={handleTableChange} rowKey={record => record.id} />
      <SchoolModal />
    </div>
  )
}

export default Schools


export const ShowSchools = () => {
  const { id } = useParams()
  const { school, fetchingSchool } = useSchoolById(id)
  const navigate = useNavigate()

  return (
    <div className='w-full'>
      {/* Header Section */}
      <header className='w-full border p-2 rounded-md mb-2'>

        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />

        <div className='flex gap-4'>

          <Skeleton loading={fetchingSchool}>
            <h1> <span className='font-bold'>School Name</span> : {school?.name}</h1>
          </Skeleton>

          <Skeleton loading={fetchingSchool}>
            <p> <span className='font-bold'>ERP Code </span> : {school?.erp_code}</p>
          </Skeleton>

          <Skeleton loading={fetchingSchool}>
            <p> <span className='font-bold'>Academic Manager </span>: {school?.am?.username} </p>
          </Skeleton>

          <Skeleton loading={fetchingSchool}>
            <p> <span className='font-bold'>Operational Manager </span>: {school?.om?.username} </p>
          </Skeleton>

        </div>

      </header>

      {/* Body Section */}
      <main className='w-full border rounded-lg p-2'>
        Body
      </main>
    </div>
  )
}