import DomHead from "../../components/shared/DomHead/DomHead";
import CreatePost from "../../components/ui/CreatePost/CreatePost";
import PostCard from "../../components/ui/PostCard/PostCard";
import HomeRightMenu from "../../components/shared/HomeRightMenu/HomeRightMenu";
import Container from "../../components/ui/Container/Container";
import usePostsData from "../../hooks/usePostsData";
import Skeleton from "react-loading-skeleton";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import PaginationButton from "../../components/ui/PaginationButton/PaginationButton";
import { useEffect, useState } from "react";

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postTypeParam = queryParams.get("postType");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { postsData, postsDataLoading } = usePostsData(
    postTypeParam,
    page,
    rowsPerPage
  );

  useEffect(() => {
    setPage(0);
  }, [postTypeParam]);

  const totalPosts = postsData?.data_count;

  return (
    <>
      <DomHead
        title="Home"
        metaDescription="রক্তদাতা ও রক্তগ্রহণের জন্য একটি সহজ ও নির্ভরযোগ্য অনলাইন প্ল্যাটফর্ম। বাংলাদেশের বিভিন্ন অঞ্চলে রক্ত সংগ্রহ এবং সরবরাহে সাহায্য করুন, জীবন বাচান।"
      />
      <Container>
        <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-5 pt-5">
          <div className="w-full md:w-9/12">
            <section className="space-y-2">
              <CreatePost />

              <div className="space-y-3 !bg-transparent [&>div]:bg-base-100">
                {postsDataLoading ? (
                  <>
                    {[1, 2, 3].map((skeleton3Times) => (
                      <article
                        key={skeleton3Times}
                        className="card card-compact lg:card-side bg-base-100 border rounded"
                      >
                        <div className="lg:w-5/12 -mt-1">
                          <Skeleton className="w-full !h-[98%] !rounded" />
                        </div>
                        <div className="lg:w-7/12 card-body">
                          <div className="">
                            <Skeleton className="!w-11/12 h-6" />
                          </div>
                          <p>
                            <Skeleton className="!w-10/12" />
                            <Skeleton className="!w-12/12" />
                            <Skeleton className="!w-11/12" />
                          </p>
                          <div className="">
                            <Skeleton className="!w-4/12 h-2.5" />
                            <Skeleton className="!w-5/12 h-2.5" />
                            <Skeleton className="!w-3/12 h-2.5" />
                          </div>
                        </div>
                      </article>
                    ))}
                  </>
                ) : (
                  <>
                    {postsData?.status === 200 &&
                    postsData?.data.length !== 0 ? (
                      <>
                        {postsData?.data?.map((postData) => (
                          <PostCard key={postData._id} postData={postData} />
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="py-10 text-center space-y-5 border rounded">
                          <h2 className="text-2xl font-semibold">
                            Something went wrong!
                          </h2>
                          <p className="text-lg pb-5">No data found</p>
                          <div className="space-x-3">
                            <Button
                              variant="contained"
                              onClick={() => window.location.reload()}
                            >
                              Refresh
                            </Button>
                            <Link to="/contact-us">
                              <Button variant="outlined">Contact us</Button>
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                <PaginationButton
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalPosts={totalPosts}
                />
              </div>
            </section>
          </div>
          <div className="w-full md:w-3/12 bg-white border rounded md:sticky md:top-20">
            <HomeRightMenu />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
