import { user } from '@/types/user-type';
import axios from 'axios';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

export default function InputUser() {
    const [users, setUsers] = useState<user[]>([])
    const [selectedUser, setSelectedUser] = useState('');

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

    const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedUser(event.target.value);
    };
    return (
        <div className='mb-6'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="userSelect">Select a user:</label>
            <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' id="userSelect" value={selectedUser} onChange={handleUserChange}>
                <option value="">Select user</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            {selectedUser && <p className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>You selected: {users.find(user => user.id === Number(selectedUser))?.name}</p>}
        </div>
    )
}
