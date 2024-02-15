'use client'
import { Toaster } from 'react-hot-toast';
const { NextUIProvider } = require("@nextui-org/react")
const Provider = ({ children }) => {

    return (
        <NextUIProvider>
             <Toaster />
                {children}
        </NextUIProvider>
    )
}
export default Provider