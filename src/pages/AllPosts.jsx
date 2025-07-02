import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/configuration'

function AllPosts() {
  const [posts, setPosts] = useState([])
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    if (userData?.$id) {
      appwriteService.getAllPosts().then((allPosts) => {
        if (allPosts?.documents?.length) {
          const myPosts = allPosts.documents.filter(
            (post) => post.userid === userData.$id
          )
          setPosts(myPosts)
        }
      })
    }
  }, [userData])

  return (
    <section className="py-12 min-h-screen bg-gray-100">
      <Container>
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {/* 📌 My Posts */}
        </h1>
        {posts.length > 0 ? (
          <div className="flex flex-wrap -m-2">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">You haven't created any posts yet.</p>
        )}
      </Container>
    </section>
  )
}

export default AllPosts
