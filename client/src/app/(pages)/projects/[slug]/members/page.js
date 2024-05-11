"use client";
import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

import axios from "axios";
import AdminLayout from "@/app/components/adminLayout/page";

const UserTable = (props) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
      </TableHeader>
      <TableBody>
        {props.memberList.map((item)=>(
        <TableRow key={item}>
          <TableCell>{item}</TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const Members = () => {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/members/663f66d93a92f9ba937fa522`);
        setMemberList(response.data.projectList.members);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMember();
  }, []);

  return (
    <AdminLayout>
      <div>
        <h2 className="text-3xl font-semibold mb-4">Project Memberlist</h2>
        <UserTable memberList={memberList} />
      </div>
    </AdminLayout>
  );
};

export default Members;
