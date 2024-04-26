"use client"
import AdminLayout from '@/app/components/adminLayout/page'
import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'

const Tasks = () => {
  const [sprintList, setSprintList] = useState([])
  const handleSprint = () => {
    const existingSprintList = [...sprintList]
    const sprintDetails = { sprintName: 'Yojana ' + (sprintList.length + 1) }
    existingSprintList.push(sprintDetails)
    setSprintList(existingSprintList)
  }
  return (
    <>
      <AdminLayout>
        <div>
          <Button onClick={handleSprint}>Create sprint</Button>
          {sprintList && sprintList.map((item) => (
            <div className='my-5 border bg-white p-2' key={item}>
              <form action="">
                <Input label={item.sprintName} id={item.sprintName} name={item.sprintName} labelPlacement='outside' />
              </form>
            </div>
          ))}
        </div>
      </AdminLayout>
    </>
  )
}

export default Tasks
