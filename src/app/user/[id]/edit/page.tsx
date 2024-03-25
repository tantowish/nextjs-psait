'use client'

import Input from '@/components/input'
import InputUser from '@/components/input-user'
import React from 'react'

export default function page() {
  return (
    <div>
      <h1 className="text-center mb-6 text-3xl font-bold text-teal-500">Edit User</h1>
      <form action="">
        <Input name={'title'} />
        <Input name={'content'} />
        <InputUser />
      </form>
    </div>
  )
}
