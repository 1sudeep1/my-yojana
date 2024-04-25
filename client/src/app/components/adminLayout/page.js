import Sidebar from '@/app/components/sidebar/page'
import React from 'react'

const AdminLayout = ({children}) => {
    return (
        <>
            <Sidebar />
            <div className='pl-48'>
                <div className='p-4'>{children}</div>
            </div>
        </>
    )
}

export default AdminLayout
