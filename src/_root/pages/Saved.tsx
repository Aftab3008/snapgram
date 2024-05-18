import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { getPostById } from "@/lib/appwrite/api";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { useQuery } from "@tanstack/react-query";
import { Models } from "appwrite";

const useSavedPosts = (currentUser: Models.Document) => {
  const { isLoading, data } = useQuery({
    queryKey: ["savedPosts", currentUser],
    queryFn: async () => {
      if (!currentUser?.save) {
        return [];
      }

      const posts = await Promise.all(
        currentUser.save.map(async (savePost: Models.Document) => {
          const data = await getPostById(savePost.post.$id);
          return {
            ...savePost.post,
            creator: {
              imageUrl: data?.creator.imageUrl,
            },
          };
        })
      );

      return posts.reverse();
    },
    enabled: !!currentUser,
    staleTime: Infinity,
  });

  return { isLoading, savePosts: data };
};

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  // const savePosts = currentUser?.save
  //   .map((savePost: Models.Document) => {
  //     return {
  //       ...savePost.post,
  //       creator: {
  //         imageUrl: currentUser.imageUrl,
  //       },
  //     };
  //   })
  //   .reverse();
  const { isLoading, savePosts } = useSavedPosts(
    currentUser as Models.Document
  );
  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {isLoading || !currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts && savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts || []} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
