const PostByIdPage = async ({}) => {
  //   if (!params.id) return null;
  //   const user = await currentUser();
  //   if (!user) return null;
  //   const userInfo = await fetchUser(user.id);
  //   if (!userInfo?.onboarded) redirect("/onboarding");
  //   const thread = await fetchThreadByID(params.id);
  //   return (
  //     <section className="relative">
  //       <ThreadCards
  //         key={thread._id}
  //         id={JSON.stringify(thread._id)}
  //         currentUserId={user?.id ?? ""}
  //         parentId={JSON.stringify(thread.parentId)}
  //         content={thread.text}
  //         author={JSON.stringify(thread.author)}
  //         community={thread.community}
  //         createdAt={thread.createdAt}
  //         comments={JSON.stringify(thread.children)}
  //         isComment
  //         isThreadLiked={
  //           [...thread.likes].some((likeduser: { id: string | undefined }) => {
  //             return likeduser.id === user?.id;
  //           }) ?? false
  //         }
  //       />
  //       <div className="mt-7">
  //         <Comment
  //           threadId={thread.id}
  //           currentUserImg={userInfo.image}
  //           currentUserId={JSON.stringify(userInfo?._id)}
  //         />
  //       </div>
  //       <div className="mt-10">
  //         {thread.children.map((child: any) => {
  //           return (
  //             <div key={child._id.toString()} className="mt-10">
  //               <ThreadCards
  //                 key={child._id}
  //                 id={JSON.stringify(child._id)}
  //                 currentUserId={child?.id ?? ""}
  //                 parentId={JSON.stringify(child.parentId)}
  //                 content={child.text}
  //                 author={JSON.stringify(child.author)}
  //                 community={child.community}
  //                 createdAt={child.createdAt}
  //                 comments={JSON.stringify(child.children)}
  //                 isComment
  //                 isThreadLiked={
  //                   [...child.likes].some(
  //                     (likeduser: { id: string | undefined }) => {
  //                       return likeduser.id === user?.id;
  //                     },
  //                   ) ?? false
  //                 }
  //               />
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </section>
  //   );
  return <></>;
};

export default PostByIdPage;
