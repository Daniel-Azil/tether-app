import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostThread from "@/components/forms/PostThread";
import { retrieveUserQR } from "@/lib/backend.imp/user.implementation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await retrieveUserQR(user.id);
  if (!userInfo?.onboarded) redirect("/setup");

  return (
    <>
      <h1 className='head-text'>Create Post</h1>

      <PostThread userId={userInfo._id} />
    </>
  );
}

export default Page;
