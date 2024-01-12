import dynamic from "next/dynamic";

const PostForm = dynamic(() => import("@/components/forms/post"));

const CreatePost = () => {
  return (
    <>
      <h1 className="head-text">Create Post</h1>
      <PostForm />
    </>
  );
};

export default CreatePost;
