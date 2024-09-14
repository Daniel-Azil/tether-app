import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import QRbar from "@/components/distributedObjects/Search";
import PagePagination from "@/components/distributedObjects/PagePagination";
import CommunityGroupCard from "@/components/UIStyleCards/CommunityGroupCard";

import { retrieveUserQR } from "@/lib/backend.imp/user.implementation";
import { RetrieveGroup } from "@/lib/backend.imp/group.implementation";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await retrieveUserQR(user.id);
  if (!userInfo?.onboarded) redirect("/setup");

  const result = await RetrieveGroup({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <>
      <h1 className='head-text'>Communities</h1>

      <div className='mt-5'>
        <QRbar routeType='communities' />
      </div>

      <section className='mt-9 flex flex-wrap gap-4'>
        {result.communities.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityGroupCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>

      <PagePagination
        path='communities'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Page;
