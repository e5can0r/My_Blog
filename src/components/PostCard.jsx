import React from 'react'
import appwriteService from "../appwrite/configuration"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, content, $createdAt, userid }) {
  // Calculate estimated reading time
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, '').split(' ').length
    const minutes = Math.ceil(words / wordsPerMinute)
    return minutes
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Generate random avatar color
  const getAvatarColor = (userId) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-yellow-500']
    const index = userId ? userId.charCodeAt(0) % colors.length : 0
    return colors[index]
  }
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/post/${$id}`} className="block">
        <div className="aspect-[16/10] overflow-hidden relative">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${getAvatarColor(userid)}`}>
                {userid ? userid.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="text-sm text-gray-600">
                {formatDate($createdAt)}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{calculateReadingTime(content)} min read</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {title}
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {content.replace(/<[^>]*>/g, '').substring(0, 150)}...
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-1 text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors duration-200">
              <span>Read More</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">Published</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PostCard
