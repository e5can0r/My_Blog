import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, PostCard, LoadingSkeleton, useToast, Search } from '../components'
import appwriteService from '../appwrite/configuration'

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const userData = useSelector((state) => state.auth.userData)
  const { addToast, ToastProvider } = useToast()

  useEffect(() => {
    if (userData?.$id) {
      setLoading(true)
      appwriteService.getAllPosts().then((allPosts) => {
        if (allPosts?.documents?.length) {
          const myPosts = allPosts.documents.filter(
            (post) => post.userid === userData.$id
          )
          setPosts(myPosts)
          setFilteredPosts(myPosts)
        } else {
          addToast('No posts found', 'info')
        }
      }).catch((error) => {
        console.error('Error loading posts:', error)
        addToast('Failed to load posts', 'error')
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [userData])

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
      <section className="py-12 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <Container>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">📝 My Posts</h1>
            <div className="max-w-md mx-auto mb-8">
              <div className="h-12 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <LoadingSkeleton key={i} type="post" />
            ))}
          </div>
        </Container>
        <ToastProvider />
      </section>
    )
  }

  return (
    <section className="py-12 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Container>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📝 My Posts</h1>
          <p className="text-gray-600 text-lg">Manage and view all your blog posts</p>
        </div>

        {posts.length > 0 ? (
          <>
            <Search onSearch={handleSearch} placeholder="Search your posts..." />
            
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {searchTerm ? (
                  <span>
                    Found <span className="font-semibold text-blue-600">{filteredPosts.length}</span> posts for "{searchTerm}"
                  </span>
                ) : (
                  <span>You have <span className="font-semibold text-blue-600">{posts.length}</span> posts</span>
                )}
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>All posts</span>
              </div>
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
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">✍️</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No posts yet</h2>
            <p className="text-gray-600 text-lg mb-8">Start sharing your thoughts with the world!</p>
            <button
              onClick={() => window.location.href = '/add-post'}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Your First Post
            </button>
          </div>
        )}
      </Container>
      <ToastProvider />
    </section>
  )
}

export default AllPosts
