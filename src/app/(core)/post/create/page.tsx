import PostForm from "@/components/forms/post";

const CreateThread = async (_props: any) => {
  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostForm />
    </>
  );
};

export default CreateThread;
