import { Avatar } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import useUserInfo from "../../../hooks/useUserInfo";
import Skeleton from "react-loading-skeleton";

const Profile = () => {
  const { user } = useAuth();
  const {userInfo, userInfoLoading}=useUserInfo(user?.uid)
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
              {userInfoLoading ? (
                <Skeleton circle className="!w-24 !h-24 md:!w-40 md:!h-40" />
              ) : (
                <Avatar
                  alt={userInfo?.user_info?.name}
                  src={
                    userInfo?.user_info?.profile_pic ||
                    userInfo?.user_info?.account_pic
                  }
                  className="!w-24 !h-24 md:!w-40 md:!h-40"
                />
              )}
            </figure>
            <div className="relative -top-1 md:-top-5 text-center sm:text-left">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                {userInfoLoading ? (
                  <Skeleton className="!w-40" />
                ) : (
                  <>{userInfo?.user_info?.name}</>
                )}
              </h2>
              <span>
                {userInfoLoading ? (
                  <Skeleton />
                ) : (
                  <>{userInfo?.user_info?.role || "user"}</>
                )}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
