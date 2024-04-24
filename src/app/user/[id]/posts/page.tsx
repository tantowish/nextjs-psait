'use client'

import PostCard from "@/components/post-card";
import { Post } from "@/types/post-type";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
    const [posts, setPosts] = useState([])
    const [name, setName] = useState('')
    const params = useParams()

    useEffect(() => {
      axios.get(`http://localhost:8000/api/user/${params.id}/posts`)
        .then(response => {
          console.log(response.data)
          setPosts(response.data.posts); // Extract posts from response
          setName(response.data.name)
        })
        .catch(error => {
          console.error('Error fetching users data:', error);
        });
    }, []);
    return (
    <div>
        <div className="mb-4">
            <Link href={'/user'} className="px-3 py-1.5 bg-blue-500 mb-8 text-white rounded-xl">Back</Link>
        </div>
        <h1 className="text-3xl font-bold mb-6">{name} Posts</h1>
        <div className="flex flex-wrap gap-4 justify-items-stretch">
            {posts.map(post => (
                <PostCard key={post} post={post} />
            ))}
        </div>
    </div>
    )
}
