import { getServerAuthSession } from "@/server/auth";

const Profile = async () => {
  const session = await getServerAuthSession();
  return (
    <>
      <h1 className="head-text">Profile</h1>
      {session !== null && session && (
        <h2 className="mt-10 text-lg text-light-3">{session.user.name}</h2>
      )}
    </>
  );
};

export default Profile;
