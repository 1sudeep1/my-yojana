'use client'
import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import axios from "axios";
import { useSelector } from 'react-redux';
const columns = [
  {name: "EMAIL", uid: "email"},
  {name: "ROLE", uid: "role"},
  {name: "FULL NAME", uid: "fullName"},
  {name: "ACTIONS", uid: "actions"},
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const UserTable=(props)=> {
const {userDetails}= useSelector(state=>state.user)

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: user.avatar}}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                Eye
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                Edit
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                Delete
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
  <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={props.userList}>
        {(item) => (
          <TableRow key={item}>
            {(columnKey) => <TableCell className={`${userDetails._id==item._id? 'bg-gray-300 p-2': null}`}>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}


const Members = () => {
  const [userList, setUserList]= useState([])
  const fetchAllUsers= async()=>{
    try{
      const res= await axios.get('http://localhost:4000/users')
      const data= await res.data.userList
      setUserList(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchAllUsers()
  }, [])
  return (
    <div>
      <UserTable userList={userList} />
    </div>
  )
}

export default Members
