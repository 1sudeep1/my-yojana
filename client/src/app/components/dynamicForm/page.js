'use client'
import React from 'react';
import {Input, Button } from "@nextui-org/react";
import { useFormik } from 'formik';


const DynamicForm = (props) => {
    const formik = useFormik({
        initialValues: {
        },

        onSubmit: values => {
            handleDynamicForm(values)
        }
    })

    const handleDynamicForm= async(inputItem)=>{
        try{
            console.log(inputItem)
        }catch(err){
            console.log(err)
        }        
    }

    return (

            <form onSubmit={formik.handleSubmit} >
                {props.formfields.map((item)=>(
                <Input type={item.type} id={item.label} name={item.label} label={item.label} onChange={formik.handleChange} value={formik.values[item.label]} placeholder={`Enter ${item.label}`} labelPlacement='outside' />
                ))}

                <Button className='my-5' type='submit' color='primary' variant='flat'>{props.buttonTitle}</Button>
            </form>

    )
}


export default DynamicForm