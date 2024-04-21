'use client'
import React, { useEffect, useState } from 'react'
import CardView from '../components/cardView/page'
import { Button, input, useDisclosure } from "@nextui-org/react"
import ModalView from '../components/modalView/page'
import DynamicForm from '../components/dynamicForm/page'
import axios from "axios";
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast';
const Projects = () => {
  const { userDetails } = useSelector(state => state.user)
  const [members, setMembers] = useState([])
  const [allProjects, setallProjects] = useState([])
  const [projectKey, setProjectKey]= useState('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fetchAllMembers = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      const data = res.data
      setMembers(data.userList)
    } catch (err) {
      console.log(err)
    }
  }


  const onSave = async (inputFields) => {
    try {
        inputFields.organization = userDetails.organization;
        inputFields.projectKey= projectKey
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/projects`, inputFields);
        const data = await res.data;
        toast(data.msg, {
            icon: res.status === 200 ? '✅' : '❌',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
        onOpenChange();
        fetchAllProjects();
    } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 400) {
            // Handle 400 Bad Request errors
            toast('Poject already exist', {
                icon: '❌',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } else {
            // Handle other errors
            toast('Failed to save: Network error', {
                icon: '❌',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }
}

const generateKey=(inputProject, event)=>{
if(event.target.name==='projectName'){
  if(!inputProject) return ''
  let finalKey=userDetails.organization?.charAt(0).toUpperCase()+inputProject?.split(' ').map(item=>item[0]).join('').toUpperCase()
  const projectKeys= allProjects.map((item)=>{
    return item.projectKey
  })
  if(projectKeys.includes(finalKey)){
    finalKey= finalKey+ inputProject[Math.floor(Math.random()*inputProject.length)].toUpperCase()
  }
  setProjectKey(finalKey)
  return finalKey
}

}


  const fetchAllProjects = async () => {
    const allProjects = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
    const data = allProjects.data
    setallProjects(data.allProjects)
  }

  useEffect(() => {
    fetchAllMembers()
    fetchAllProjects()
  }, [])
  console.log(projectKey, 'hello')
  return (
    <div>
      <Button onPress={onOpen} className='m-4' color='primary'>Add Projects</Button>
      <ModalView title="Add Projects" isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}>
        <DynamicForm
          buttonTitle='Add'
          onSave={onSave}
          generateKey={generateKey}
          projectKey={projectKey}
          formFields={[
            { label: 'Project Name', name: 'projectName' },
            { label: 'Project Description', name: 'projectDescription' },
            { label: 'Members', type: 'dropdown', userList: members, name: 'members' }
          ]}
        />
      </ModalView>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {allProjects.map((item) => (
          <CardView item={item} />
        ))}
      </div>
    </div>
  )
}

export default Projects
