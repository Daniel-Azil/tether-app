import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { retrieveUserQR } from "@/lib/backend.imp/user.implementation";
import AccountProfile from "@/components/forms/UserProfile";

// Copy paste most of the code as it is from the /setup

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await retrieveUserQR(user.id);
  if (!userInfo?.onboarded) redirect("/setup");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <>
      <h1 className='head-text'>Edit Profile</h1>
      <p className='mt-3 text-base-regular text-light-2'>Make any changes</p>

      <section className='mt-12'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </>
  );
}

export default Page;
