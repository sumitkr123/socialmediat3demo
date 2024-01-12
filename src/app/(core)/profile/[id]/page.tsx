import { api } from "@/trpc/server";
import { ProfilePageParams } from "@/types";

const Profile = async ({ params }: ProfilePageParams) => {
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
