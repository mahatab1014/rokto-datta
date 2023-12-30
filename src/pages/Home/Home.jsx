import DomHead from "../../components/shared/DomHead/DomHead";
import Button from "@mui/material/Button";
import CreatePost from "../../components/ui/CreatePost/CreatePost";

const Home = () => {
  return (
    <>
      <DomHead
        title="Home"
        metaDescription="রক্তদাতা ও রক্তগ্রহণের জন্য একটি সহজ ও নির্ভরযোগ্য অনলাইন প্ল্যাটফর্ম। বাংলাদেশের বিভিন্ন অঞ্চলে রক্ত সংগ্রহ এবং সরবরাহে সাহায্য করুন, জীবন বাচান।"
      />
      <section className="space-y-2 [&>div]:border [&>div]:rounded">

      <CreatePost />


        <div className="card w-full bg-base-100">
          <div className="card-body">
            <h2 className="card-title">
              "রক্তদাতা ও রক্তগ্রহণের জন্য একটি সহজ ও নির্ভরযোগ্য অনলাইন
              প্ল্যাটফর্ম। <br /> বাংলাদেশের বিভিন্ন অঞ্চলে রক্ত সংগ্রহ এবং
              সরবরাহে সাহায্য করুন, জীবন বাচান।
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <Button variant="contained">Hello world</Button>;
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
