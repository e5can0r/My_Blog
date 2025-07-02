import React, { useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/configuration";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post=null }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    if (!userData) {
    return <p className="text-center text-red-500 font-semibold">You must be logged in to create a post.</p>;
}

    // 🔧 Submit handler
    const submit = async (data) => {
        try {
            console.log("🚀 Submit triggered", data);

            // 🛡️ Protect against unauthenticated access
            if (!userData || !userData.$id) {
                alert("⚠️ You must be logged in to create or update a post.");
                return;
            }

            let fileId = post?.featuredImage || null;

            // ✅ Handle file upload if new image is selected
            if (data.image?.[0]) {
                const uploadedFile = await appwriteService.uploadFile(data.image[0]);
                if (uploadedFile) {
                    fileId = uploadedFile.$id;

                    // Delete old image if updating
                    if (post?.featuredImage) {
                        await appwriteService.deleteFile(post.featuredImage);
                    }
                } else {
                    alert("❌ Failed to upload image.");
                    return;
                }
            }

            if (post) {
                // 📝 Update existing post
                const updated = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: fileId,
                });

                if (updated) {
                    navigate(`/post/${updated.$id}`);
                }
            } else {
                // 🆕 Create new post
                const created = await appwriteService.createPost({
                    ...data,
                    featuredImage: fileId,
                    userid: userData.$id,
                });

                if (created) {
                    navigate(`/post/${created.$id}`);
                }
            }
        } catch (error) {
            console.error("❌ Submit Error:", error);
            alert("An unexpected error occurred. Check console for details.");
        }
    };

    // 🧠 Slug transformer
    const slugTransform = useCallback((value) => {
        return value?.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s+/g, "-") || "";
    }, []);

    // 🔁 Watch title changes to update slug
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: "Title is required" })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: "Slug is required" })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
               <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />

               
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post ? "Image is required" : false })}
                />
                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: "Status is required" })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
