'use client'

import UserTable from "@/components/user-table";
import axios from "axios";
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
      <h1 className="text-center mb-6 text-3xl font-bold text-teal-500">Data User</h1>
      <UserTable users={users} />
    </div>
  );
}
