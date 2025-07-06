import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/configuration'
import { Container, PostCard, Search, LoadingSkeleton, useToast } from '../components'

function Home() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { addToast, ToastProvider } = useToast()

  useEffect(() => {
    setLoading(true)
    appwriteService.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
        setFilteredPosts(posts.documents)
      } else {
        addToast('No posts found', 'info')
      }
    }).catch((error) => {
      addToast('Failed to load posts', 'error')
      console.error('Error loading posts:', error)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term.trim() === '') {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.content.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredPosts(filtered)
    }
  }

  if (loading) {
    return (
      <section className="w-full py-12 min-h-screen bg-gradient-to-br from-gray-200 via-slate-300 to-gray-200">
        <Container>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">📰 Latest Posts</h1>
            <div className="max-w-md mx-auto mb-8">
              <div className="h-12 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <LoadingSkeleton key={i} type="post" />
            ))}
          </div>
        </Container>
        <ToastProvider />
      </section>
    )
  }

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
            <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
              📰 Latest Posts
            </h1>
            
            <Search onSearch={handleSearch} placeholder="Search posts by title or content..." />
            
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {searchTerm ? (
                  <span>
                    Found <span className="font-semibold text-blue-600">{filteredPosts.length}</span> posts for "{searchTerm}"
                  </span>
                ) : (
                  <span>Showing <span className="font-semibold text-blue-600">{posts.length}</span> posts</span>
                )}
              </p>
            </div>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No posts found</h2>
                <p className="text-gray-600">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPosts.map((post) => (
                  <PostCard key={post.$id} {...post} />
                ))}
              </div>
            )}
          </>
        )}
      </Container>
      <ToastProvider />
    </section>
  )
}

export default Home
