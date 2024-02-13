'use client'
import React from 'react';
import * as Yup from 'yup';
import FormSection from '../components/formSection/page'
import {Input, Button } from "@nextui-org/react";
import { useFormik } from 'formik';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: LoginSchema,

        onSubmit: values => {
            console.log(values)
        }
    })

    return (
        <FormSection>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit} >
                <div className='flex flex-col'>
                <Input className='my-5' id='email' name='email' label='Email' onChange={formik.handleChange} value={formik.values.email} placeholder='Enter email' labelPlacement='outside' />
                {formik?.errors.email}

                <Input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} label="password" placeholder="Enter password" labelPlacement="outside" />
                {formik?.errors.password}
                </div>

                <Button className='my-5' type='submit' color='primary' variant='flat'>Login</Button>
            </form>
        </FormSection>
    )
}


export default Login