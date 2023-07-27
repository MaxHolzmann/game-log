import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "../app/components/Navbar"

//cloudinary for profile pictures

export default function Profile() {
    return (
        <>
        <Navbar></Navbar>
        <h1>My Profile</h1>
        </>
        )
}