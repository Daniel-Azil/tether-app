import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import StyleUserCard from "@/components/UIStyleCards/StyleUserCard";
import QRbar from "@/components/distributedObjects/Search";
import PagePagination from "@/components/distributedObjects/PagePagination";

import { retrieveUserQR, fetchUsers } from "@/lib/backend.imp/user.implementation";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await retrieveUserQR(user.id);
  if (!userInfo?.onboarded) redirect("/setup");

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>

      <QRbar routeType='search' />

      <div className='mt-14 flex flex-col gap-9'>
        {result.users.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.users.map((person) => (
              <StyleUserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>

      <PagePagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}

export default Page;
