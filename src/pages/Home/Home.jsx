import DomHead from "../../components/shared/DomHead/DomHead";
import Container from "../../components/ui/Container/Container";

const Home = () => {
  return (
    <>
      <DomHead
        title="Home"
        metaDescription="রক্তদাতা ও রক্তগ্রহণের জন্য একটি সহজ ও নির্ভরযোগ্য অনলাইন প্ল্যাটফর্ম। বাংলাদেশের বিভিন্ন অঞ্চলে রক্ত সংগ্রহ এবং সরবরাহে সাহায্য করুন, জীবন বাচান।"
      />
      <section>
        <Container>
          <h2 className="text-3xl text-center py-5 font-bangla">
            "রক্তদাতা ও রক্তগ্রহণের জন্য একটি সহজ ও নির্ভরযোগ্য অনলাইন
            প্ল্যাটফর্ম। <br /> বাংলাদেশের বিভিন্ন অঞ্চলে রক্ত সংগ্রহ এবং
            সরবরাহে সাহায্য করুন, জীবন বাচান।
          </h2>
        </Container>
      </section>
    </>
  );
};

export default Home;
