'use client'
import React from 'react';
import { Select, SelectItem, Avatar, Chip, Input, Button } from "@nextui-org/react";
import { useFormik } from 'formik';

const DynamicForm = (props) => {
    const [values, setValues] = React.useState(new Set([]));
    const formik = useFormik({
        initialValues: {

        },

        onSubmit: values => {
            handleDynamicForm(values)
        }
    })

    const handleDynamicForm = async (inputFields) => {
        try {
            // const formattedFields=Object.entries(inputFields).map((item)=>{
            //     item[0]= item[0][0].toLowerCase() + item[0].slice(1)
            //     const mappedObj= {[item[0].split(' ').join('')]:item[1]}
            //     return mappedObj
            // })
            // console.log(formattedFields)
            const map={}
            props.formfields.forEach(item=>{
                map[item.label]= item.type
            })

            for(let item in inputFields){
                if(map[item.type]=='dropdown'){
                    inputFields[item]= inputFields?.[item]?.split(',')
                }
            }
            debugger
        } catch (err) {
            console.log(err)
        }
    }


    return (

        <form onSubmit={formik.handleSubmit} >
            {props.formfields.map((item) => {
                if (item.type == 'dropdown') {
                    return (
                        <Select
                            items={item.userList}
                            label={item.label}
                            name={item.name}
                            onChange={formik.handleChange}
                            variant="bordered"
                            isMultiline={true}
                            selectionMode="multiple"
                            placeholder={`Select a ${item.label}`}
                            labelPlacement="outside"
                            classNames={{
                                base: "max-w-xs",
                                trigger: "min-h-unit-12 py-2",
                            }}
                            renderValue={(items) => {
                                return (
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((item) => (
                                            <Chip key={item.key}>{item.data.fullName}</Chip>
                                        ))}
                                    </div>
                                );
                            }}
                        >
                            {(user) => (
                                <SelectItem key={user.fullName} textValue={user.fullName}>
                                    <div className="flex gap-2 items-center">
                                        {/* <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} /> */}
                                        <div className="flex flex-col">
                                            <span className="text-small">{user.fullName}</span>
                                            <span className="text-tiny text-default-400">{user.email}</span>
                                        </div>
                                    </div>
                                </SelectItem>
                            )}
                        </Select>
                    )
                }
                return (
                    <Input type={item.type} id={item.label} name={item.name} label={item.label} onChange={formik.handleChange} value={formik.values[item.label]} placeholder={`Enter ${item.label}`} labelPlacement='outside' />
                )

            })}

            <Button className='my-5' type='submit' color='primary' variant='flat'>{props.buttonTitle}</Button>
        </form>

    )
}


export default DynamicForm