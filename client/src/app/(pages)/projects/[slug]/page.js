import AdminLayout from '@/app/components/adminLayout/page'
import React from 'react'

const ProjectDetails = ({ params }) => {
  return (
    <>
      <AdminLayout>
        <div>
          hello world
          <p>project Id is: {params.slug}</p>
        </div>
      </AdminLayout>
    </>
  )
}

export default ProjectDetails
