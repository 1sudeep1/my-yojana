"use client"
import AdminLayout from '@/app/components/adminLayout/page'
import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'

const Tasks = () => {
  const [sprintList, setSprintList] = useState([])
  const [issueList, setIssueList] = useState([])
  const [activeForm, setActiveForm] = useState([])

  const handleSprint = () => {
    const existingSprintList = [...sprintList]
    const sprintDetails = { sprintName: 'Yojana ' + (sprintList.length + 1) }
    existingSprintList.push(sprintDetails)
    setSprintList(existingSprintList)
  }
  return (
    <>
      <AdminLayout>
        <div className='flex flex-col items-end gap-5 p-5 h-full'>
          <Button onClick={handleSprint}>Create sprint</Button>
          <div className='w-full flex flex-col gap-10'>
            {sprintList && sprintList.map((sprintItem, sprintId) => {
              return (
                <div key={sprintId} className='p-4 bg-gray-100 w-full flex flex-col gap-1 items-start'>
                  {/* <Input label={item.sprintName} id={item.sprintName} name={item.sprintName} labelPlacement='outside' /> */}
                  <div className='flex items-center justify-between w-full'>
                    <p>{sprintItem.sprintName}</p>
                    <Button disabled={!issueList.length > 0} className={`rounded text-sm text-white ${issueList > 0 ? "bg-blue-700" : "bg-blue-500"}`}>
                      Start Sprint
                    </Button>
                  </div>
                  {issueList.length > 0 ? (
                    issueList.map((issueItem, issueId) => (
                      <div key={issueId} className='w-full bg-white p-2'>
                        {issueItem}
                      </div>
                    ))
                  ) : (
                    <div className='w-full py-2 text-center border border-gray-500 border-dashed'>
                      <p>
                        Plant a sprint by dragging a issue or by creating new one
                      </p>
                    </div>
                  )}
                  <div className='w-full relative'>
                    <Button className='w-full text-start hover:bg-gray-200 px-1 py-2 flex justify-start'>
                      + Create Issue
                    </Button>
                    <div className={`${activeForm === sprintId ? "flex" : "hidden"} absolute w-full h-full inset-0 bg-white  border border-blue-500 items-center gap-3 px-2`}>
                      <select name="" id="" className="focus:outline-none">
                        <option value="feature">Feature</option>
                        <option value="bug">Bug</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Enter issue title?"
                        className="w-full focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default Tasks
