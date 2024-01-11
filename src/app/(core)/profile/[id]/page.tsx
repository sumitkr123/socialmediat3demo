import { api } from "@/trpc/server";

const Profile = async ({ params }: { params: { id: string } }) => {
  const profileData = await api.user.getUserById.query({
    userId: params.id,
  });

  return (
    <>
      <h1 className="head-text">Profile by id</h1>
      <h2 className="mt-10 text-lg text-light-3">{profileData?.name}</h2>
    </>
  );
};

export default Profile;
