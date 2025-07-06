import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configuration";
import { Button, Container, LoadingSkeleton, useToast } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToast, ToastProvider } = useToast();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    // Calculate reading time
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
            month: 'long',
            day: 'numeric'
        })
    }

    // Share functions
    const sharePost = (platform) => {
        const url = window.location.href
        const title = post?.title || 'Check out this blog post'
        
        switch (platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
                break
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
                break
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
                break
            case 'copy':
                navigator.clipboard.writeText(url)
                addToast('Link copied to clipboard!', 'success')
                break
        }
    }

    useEffect(() => {
        if (slug) {
            setLoading(true)
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                } else {
                    navigate("/")
                    addToast('Post not found', 'error')
                }
            }).catch((error) => {
                console.error('Error loading post:', error)
                addToast('Failed to load post', 'error')
                navigate("/")
            }).finally(() => {
                setLoading(false)
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])

    const deletePost = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage)
                    addToast('Post deleted successfully', 'success')
                    navigate("/")
                } else {
                    addToast('Failed to delete post', 'error')
                }
            }).catch((error) => {
                console.error('Error deleting post:', error)
                addToast('Failed to delete post', 'error')
            })
        }
    }

    if (loading) {
        return (
            <div className="py-12 bg-gray-50 min-h-screen">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <LoadingSkeleton type="post" />
                    </div>
                </Container>
                <ToastProvider />
            </div>
        )
    }

    return post ? (
        <div className="py-12 bg-gray-50 min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back to posts</span>
                    </button>

                    <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Featured Image */}
                        <div className="relative">
                            <img
                                src={appwriteService.getFileView(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            
                            {/* Author Actions */}
                            {isAuthor && (
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button bgColor="bg-green-600 hover:bg-green-700" className="shadow-lg">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        bgColor="bg-red-600 hover:bg-red-700"
                                        onClick={deletePost}
                                        className="shadow-lg"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="p-8">
                            {/* Post Meta */}
                            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {post.userid ? post.userid.charAt(0).toUpperCase() : 'A'}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Published on</p>
                                        <p className="font-medium text-gray-900">{formatDate(post.$createdAt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{calculateReadingTime(post.content)} min read</span>
                                    </div>
                                </div>
                            </div>

                            {/* Post Title */}
                            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

                            {/* Post Content */}
                            <div className="prose prose-lg max-w-none prose-img:rounded-xl prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900">
                                {parse(post.content)}
                            </div>

                            {/* Social Sharing */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this post</h3>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => sharePost('twitter')}
                                        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                        <span>Twitter</span>
                                    </button>
                                    
                                    <button
                                        onClick={() => sharePost('facebook')}
                                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                        <span>Facebook</span>
                                    </button>
                                    
                                    <button
                                        onClick={() => sharePost('linkedin')}
                                        className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                        <span>LinkedIn</span>
                                    </button>
                                    
                                    <button
                                        onClick={() => sharePost('copy')}
                                        className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span>Copy Link</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </Container>
            <ToastProvider />
        </div>
    ) : null;
}
