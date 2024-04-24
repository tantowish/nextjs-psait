import { user } from '@/types/user-type'
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'


export default function UserTable({ users }: { users: user[] }) {
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/api/user/${id}`)
                .then(response => {
                    console.log(response)
                    window.location.reload()
                })
        } catch (error) {
            console.error('Error deleting user: ', error)
        }
    }
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            no
                        </th>
                        <th scope="col" className="px-6 py-3">
                            email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? users.map((user, no) => (
                        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center py-8">
                            <td>{no + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className='text-white flex flex-wrap gap-2 justify-center my-3'>
                                <Link href={`/user/${user.id}/create`}>
                                    <div className='px-4 py-2 bg-yellow-500 rounded-lg w-fit'>Create Post</div>
                                </Link>
                                <button className='px-4 py-2 bg-red-500 w-fit rounded-lg'
                                    onClick={() => handleDelete(user.id)}>Delete</button>
                                <Link
                                    href={`/user/${user.id}/posts`}>
                                    <div className='px-4 py-2 bg-blue-500 w-fit rounded-lg'>Posts</div>
                                </Link>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td className='py-2 text-center' colSpan={4}>Data not found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
