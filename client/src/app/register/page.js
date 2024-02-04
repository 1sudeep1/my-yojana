'use client'
import React , {useState} from 'react';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import FormSection from '../components/formSection/page'
import { CiMail } from "react-icons/ci";
import {Dropdown,Input, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useFormik } from 'formik';
const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),

});

const roles = ['Project Manager', 'Developer', 'Designer', 'Staff', 'Software Engineer']

const Register = () => {
    const router = useRouter()
    const [organization, setOrganization] = useState('gmail')
    const [selectedRole, setSelectedRole] = useState('')
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            values.role = selectedRole
            values.email = values.email + '@' + organization + '.com'
            handleRegister(values);
            formik.resetForm()
        }
    })

    const handleRegister = async(inputFields)=>{
        try{
          const res = await fetch('http://localhost:4000/register/',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(inputFields)
          })
          const data = await res.json()
    
          toast( data.msg,
              {
                icon: res.status == 200 ? '✅' : '❌',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }
            );
            if(res.status == 200) router.push('/login')
        }catch(err){
          console.log(err)
        }
      
      }

    return (
        <>
            <FormSection>
                <h1>Signup</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-5 my-5">
                        <Input type="organization" name="organization" label="Organization" placeholder="Enter organization" labelPlacement="outside" value={formik.values.organization} onChange={(e) => { formik.handleChange(e); setOrganization(e.target.value?.split(' ').join('').toLowerCase()) }} />
                        <Input type="email" label="Email" onChange={formik.handleChange} placeholder='Enter email' labelPlacement='outside' startContent={<CiMail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />} endContent={<div className="pointer-events-none flex items-center"> <span className="text-default-400 text-small">@{organization}.com</span></div>} /> {formik?.errors.email}
                        <Input type="text" name="fullName" onChange={formik.handleChange} label="fullName" placeholder="Enter fullName" labelPlacement="outside" /> {formik?.errors.fullName}
                        <Input type="password" name="password" onChange={formik.handleChange} label="password" placeholder="Enter password" labelPlacement="outside" /> {formik?.errors.password}
                        <Dropdown >
                            <DropdownTrigger >
                                <Button variant="bordered" >{selectedRole || 'Choose role'}</Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                {roles.map((item) => {
                                    return (
                                        <DropdownItem onClick={(e) => setSelectedRole(e.target.outerText)} key={item}>{item}</DropdownItem>
                                    )
                                })}

                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <Button onSubmit={handleRegister} type="submit" color="primary" variant="flat">
                        Register
                    </Button>
                </form>
            </FormSection>
        </>
    )
}

export default Register