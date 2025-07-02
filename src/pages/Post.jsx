import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configuration";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 bg-gray-50 min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="relative">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="w-full object-contain bg-gray-100 rounded-t-2xl"
                        />

                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-600 hover:bg-green-700">
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-600 hover:bg-red-700"
                                    onClick={deletePost}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
                        <div className="prose max-w-none prose-img:rounded-lg prose-headings:text-gray-800 prose-p:text-gray-700">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
