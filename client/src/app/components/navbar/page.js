"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
const loggedInConfig = {
    true: [
        { label: "Your Work", href: "/my-work" },
        { label: "Members", href: "/members" },
        { label: "Projects", href: "/projects" },
        { label: "Dashboard", href: "/dashboard" },
    ],
    false: [
        { label: "About Us", href: "/about-us" },
        { label: "Contact", href: "/contact" },
    ],
};


const page = () => {
    const { isLoggedIn, userDetails } = useSelector(state => state.user)
    const AuthButtons = () => {
        return (
            <>
                <Button as={Link} color="primary" href="/login" variant="flat">
                    Login
                </Button>
                <NavbarItem>
                    <Button as={Link} color="primary" href="/register" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </>
        )
    }
    return (
        <>
            <Navbar>
                <NavbarBrand as={Link} href='/'>
                    <Image src="/yojana-logo.png" width={110} height={110} />
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {loggedInConfig[isLoggedIn].map((item, id) => {
                        return (
                            <NavbarItem key={id}>
                                <Link color="foreground" href={item.href}>
                                    {item.label}
                                </Link>
                            </NavbarItem>
                        )
                    })}

                </NavbarContent>
                <NavbarContent justify="end">
                    {isLoggedIn ?
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="secondary"
                                    name="Jason Hughes"
                                    size="sm"
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{userDetails.email}</p>
                                </DropdownItem>
                                <DropdownItem key="settings">
                                    <Link color="foreground" href="/profile">
                                        Profile
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                <DropdownItem key="analytics">Analytics</DropdownItem>
                                <DropdownItem key="system">System</DropdownItem>
                                <DropdownItem key="configurations">Configurations</DropdownItem>
                                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        :
                        <AuthButtons />}

                </NavbarContent>
            </Navbar>
        </>
    )
}

export default page