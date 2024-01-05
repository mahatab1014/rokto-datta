import { Avatar } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  return (
    <>
      <section className="bg-white rounded-box shadow-lg">
        <div>
          <figure className="h-40 md:h-80">
            <img
              className="w-full h-full object-cover rounded-t-box"
              src="https://images.unsplash.com/photo-1676372971824-ed309f425e21"
              alt=""
            />
          </figure>
          <div className="relative left-2 md:left-20 -top-8 md:-top-16 flex items-center sm:items-end flex-col sm:flex-row gap-5">
            <figure className="">
              <Avatar
                alt="Remy Sharp"
                src="https://i.ibb.co/HK43kSv/IMG-20231220-184846.jpg"
                className="!w-24 !h-24 md:!w-40 md:!h-40"
              />
            </figure>
            <div className="relative -top-1 md:-top-5 text-center sm:text-left">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                Mahatab Hossain Sudip
              </h2>
              <span>user</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
