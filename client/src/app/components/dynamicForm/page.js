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
            formik.resetForm()
        }
    })

    const handleDynamicForm = async (inputFields) => {

        try {
            //to join keys and make a first letter small
            // const formattedFields=Object.entries(inputFields).map((item)=>{
            //     item[0]= item[0][0].toLowerCase() + item[0].slice(1)
            //     const mappedObj= {[item[0].split(' ').join('')]:item[1]}
            //     return mappedObj
            // })
            // console.log(formattedFields)

            const map = {}
            props.formFields.forEach(item => {
                map[item.name] = item.type
            })

            for (let item in inputFields) {
                if (map[item] == 'dropdown') {
                    inputFields[item] = inputFields?.[item]?.split(',')
                }

            }
            await props.onSave(inputFields)
        } catch (err) {
            console.log(err)
        }
    }

    console.log(formik)
    return (

        <form onSubmit={formik.handleSubmit} >
            {props.formFields.map((item) => {
                let membersDropdown;
                switch (item.type){
                    case 'dropdown':
                        let projectLeadDropdown;
                        switch (item.name){
                            case 'projectLead':
                                projectLeadDropdown=<Select
                                items={item.userList}
                                label={item.label}
                                name={item.name}
                                onChange={formik.handleChange}
                                variant="bordered"
                                isMultiline={true}
                                selectionMode="single"
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
                            break;
                            default:
                                projectLeadDropdown=<Select
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
                        }
                        return projectLeadDropdown
                    break;

                   default:
                    membersDropdown=<Input type={item.type} id={item.label} name={item.name} label={item.label} onBlur={(e) => { props.generateKey(formik.values['projectName'], e) }} onChange={formik.handleChange} value={formik.values[item.label]} placeholder={`Enter ${item.label}`} labelPlacement='outside' />
                        break;
                }
                return membersDropdown;

            })}

            <p className='my-5'>Project Key: {props.projectKey}</p>

            <Button type='submit' color='primary' variant='flat'>{props.buttonTitle}</Button>
        </form>
    )
}

export default DynamicForm