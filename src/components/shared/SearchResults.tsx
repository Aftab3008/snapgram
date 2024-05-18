/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  isSearchingFectching: boolean;
  searchedPosts: any;
};

export default function SearchResults({
  isSearchingFectching,
  searchedPosts,
}: SearchResultsProps) {
  if (isSearchingFectching) {
    return <Loader />;
  }
  if (
    searchedPosts &&
    searchedPosts.documents &&
    searchedPosts.documents.length > 0
  ) {
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  );
}
