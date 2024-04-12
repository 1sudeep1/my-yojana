import React from 'react'
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
const CardView = (props) => {
  return (
    <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0">
        <p className='px-3 text-lg font-bold'>{props.item.projectName}</p>
        <p className='px-3'>{props.item.projectDescription}</p>
      </CardBody>
      <CardFooter className="text-small justify-between">
      </CardFooter>
    </Card>
  )
}

export default CardView
