'use client'

import UserTable from "@/components/user-table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users`)
      .then(response => {
        console.log(response.data)
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users data:', error);
      });
  }, []);


  return (
    <div>
      <div className="mb-4">
        <Link href={'/user/create'} className="px-3 py-1.5 bg-blue-500 mb-8 text-white rounded-xl">Create User</Link>
      </div>
      <h1 className="text-center mb-6 text-3xl font-bold text-teal-500">Data User</h1>
      <UserTable users={users} />
    </div>
  );
}
