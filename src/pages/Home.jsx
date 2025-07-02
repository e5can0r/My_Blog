import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/configuration'
import { Container, PostCard } from '../components'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (
    <section className="w-full py-12 min-h-screen bg-gradient-to-br from-gray-200 via-slate-300 to-gray-200">
      <Container>
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🚫 No Posts Available
            </h1>
            <p className="text-gray-700 text-lg">
              Please <span className="font-semibold text-blue-600">Login</span> to read posts.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
              📰 Latest Posts
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  )
}

export default Home
