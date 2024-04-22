import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import Link from 'next/link';

const columns = [
    {
        key: "projectKey",
        label: "ID",
    },
    {
        key: "projectName",
        label: "PROJECT NAME",
    },
    {
        key: "projectLead",
        label: "PROJECT LEAD",
    },
    {
        key: "projectType",
        label: "PROJECT TYPE",
    },
    {
        key: "actions",
        label: "ACTIONS",
    },
];
const TableView = (props) => {
    return (
        <Table
            aria-label="Controlled table example with dynamic content"
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={props.allProjects}>
                {(item) => (
                    <TableRow key={item}>
                        {(columnKey) => {
                            if (columnKey === "projectName") {
                                return <TableCell><Link className='text-blue-700' href={`/projects/${item.projectKey}`}>{getKeyValue(item, columnKey)}</Link></TableCell>
                            } else {
                                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                            }
                        }}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default TableView
