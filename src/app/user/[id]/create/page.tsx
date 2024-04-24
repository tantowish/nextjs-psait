'use client'

import Input from '@/components/input'
import InputUser from '@/components/input-user'
import axios from 'axios'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'

export default function page() {
  const params = useParams()
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    published: true,
    authorId: parseInt(params.id as unknown as string, 10)
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/post", formData);
      // Optionally, handle success or navigation after successful submission
      router.push(`/user/${params.id}/posts`); // Navigate to the posts endpoint
      console.log("Post submitted successfully!");
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div>
        <div className="mb-4">
          <Link href={'/user'} className="px-3 py-1.5 bg-blue-500 mb-8 text-white rounded-xl">Back</Link>
      </div>
      <h1 className="text-center mb-6 text-3xl font-bold text-teal-500">Create Posts</h1>
      <form onSubmit={handleSubmit}>
        <Input name="title" value={formData.title} onChange={handleChange} />
        <Input name="content" value={formData.content} onChange={handleChange} />
        <button type='submit' className='px-3 py-1.5 bg-blue-500 mb-8 text-white rounded-xl'>Submit</button>
      </form>
    </div>
  );
}
