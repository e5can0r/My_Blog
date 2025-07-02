import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <section className="py-12 bg-gray-100 min-h-screen">
      <Container>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">📝 Create a New Post</h1>
          <PostForm />
        </div>
      </Container>
    </section>
  )
}

export default AddPost
