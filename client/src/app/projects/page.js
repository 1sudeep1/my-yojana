'use client'
import React, { useEffect, useState } from 'react'
import CardView from '../components/cardView/page'
import { Button, useDisclosure } from "@nextui-org/react"
import ModalView from '../components/modalView/page'
import DynamicForm from '../components/dynamicForm/page'
import axios from "axios";
const Projects = () => {
  const [members, setMembers]= useState([])
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fetchAllMembers=async()=>{
    try{
        const res= await axios.get(`http://localhost:4000/users`)
        const data= res.data
        setMembers(data.userList)
    }catch(err){
        console.log(err)
    }
}
  useEffect(()=>{
    fetchAllMembers()
},[])


  return (
    <div>
      <Button onPress={onOpen} className='m-4' color='primary'>Add Projects</Button>
      <ModalView title="Add Projects" isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}>
        <DynamicForm
          buttonTitle='Add'
          formFields={[
            { label: 'Project Name', name:'projectName' },
            { label: 'Project Description', name:'projectDescription' },
            { label: 'Members', type: 'dropdown', userList:members, name:'members'}
          ]}
        />
      </ModalView>
      <CardView />
    </div>
  )
}

export default Projects
