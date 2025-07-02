import React from 'react'
import appwriteService from "../appwrite/configuration"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="w-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
        <div className="aspect-video overflow-hidden">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
