import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import UserComment from "@/components/forms/UserComment";
import PostCard from "@/components/UIStyleCards/PostCard";

import { retrieveUserQR } from "@/lib/backend.imp/user.implementation";
import { retrievePostQR } from "@/lib/backend.imp/post.implementation";

export const count = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await retrieveUserQR(user.id);
  if (!userInfo?.onboarded) redirect("/setup");

  const thread = await retrievePostQR(params.id);

  return (
    <section className='relative'>
      <div>
        <PostCard
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className='mt-7'>
        <UserComment
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className='mt-10'>
        {thread.children.map((childItem: any) => (
          <PostCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;
