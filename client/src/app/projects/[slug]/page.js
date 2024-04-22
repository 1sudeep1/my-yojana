import React from 'react'

const ProjectDetails = ({params}) => {
  return (
    <div>
      project Id is: {params.slug}
    </div>
  )
}

export default ProjectDetails
