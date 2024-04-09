'use client'
import React from 'react'
import CardView from '../components/cardView/page'
import {Button, useDisclosure} from "@nextui-org/react"
import ModalView from '../components/modalView/page'
const Projects = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div>
      <Button onPress={onOpen} className='m-4' color='primary'>Add Projects</Button>
      <ModalView title="Add Projects" isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}>
        hello this is a form
      </ModalView>
      <CardView />
    </div>
  )
}

export default Projects
