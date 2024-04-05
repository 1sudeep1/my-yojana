'use client'
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
const { NextUIProvider } = require("@nextui-org/react")
const Provider = ({ children }) => {
const router= useRouter()
    return (
        <NextUIProvider navigate={router.push}>
             <Toaster />
                {children}
        </NextUIProvider>
    )
}
export default Provider