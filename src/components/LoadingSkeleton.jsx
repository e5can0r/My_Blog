import React from 'react'

function LoadingSkeleton({ type = 'post' }) {
  if (type === 'post') {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
        <div className="aspect-[16/10] bg-gray-300"></div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'header') {
    return (
      <div className="bg-gray-200 border-b-4 border-gray-300 animate-pulse">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-300 rounded"></div>
              <div>
                <div className="h-6 bg-gray-300 rounded w-24 mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-300 rounded-full w-20"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  )
}

export default LoadingSkeleton
