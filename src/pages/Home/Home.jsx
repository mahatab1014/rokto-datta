import DomHead from "../../components/shared/DomHead/DomHead";
import CreatePost from "../../components/ui/CreatePost/CreatePost";
import PostCard from "../../components/ui/PostCard/PostCard";
import { useEffect, useState } from "react";
import HomeRightMenu from "../../components/shared/HomeRightMenu/HomeRightMenu";
import Container from "../../components/ui/Container/Container";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/fake-post-data.json")
      .then((post) => post.json())
      .then((postData) => setData(postData));
  }, []);

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
                {data.map((postData, index) => (
                  <PostCard key={index} postData={postData} />
                ))}
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
