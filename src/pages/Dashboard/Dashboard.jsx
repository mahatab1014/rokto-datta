import DomHead from "../../components/shared/DomHead/DomHead";
import JohnPng from "../../assets/images/illustration-john-2.png";
import { MdOutlinePostAdd } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";

export default function Dashboard() {
  const { user } = useAuth();
  const userLastName = user?.displayName?.split(" ")?.slice(-1);
  const { userInfo, userInfoLoading } = useUserInfo(user?.uid);

  return (
    <>
      <DomHead title={"Dashboard"} />
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="md:col-span-2 shadow-lg bg-white rounded-box relative flex flex-col-reverse md:flex-row items-center p-5">
            <div className="z-20 space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold">
                Thank you {userLastName}!
              </h2>
              <p className="text-gray-600">
                Your decision to become a blood donor is a shining example of
                compassion and generosity. By joining our lifesaving team, you
                are making a significant impact on the lives of those in need.
              </p>
            </div>
            <div className="md:px-24">
              <img
                className="md:absolute bottom-0 right-0 h-full lg:h-[110%] object-contain pointer-events-none"
                src={JohnPng}
                alt=""
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="shadow-lg bg-white rounded-box p-5 text-center">
              <div className="inline-block bg-[#16b1ff] text-white p-1 text-2xl rounded-full">
                <MdOutlinePostAdd />
              </div>
              <div className="text-sm font-semibold text-gray-700">
                Total Posts
              </div>
              <div className="text-xl md:text-3xl">
                {userInfoLoading ? (
                  <span className="loading" />
                ) : (
                  <>{userInfo?.total_posts}</>
                )}
              </div>
              <div className="text-xs">From to now</div>
            </div>
            <div className="shadow-lg bg-white rounded-box p-5 text-center">
              <div className="inline-block bg-[#16b1ff] text-white p-1 text-2xl rounded-full">
                <BiDonateHeart />
              </div>
              <div className="text-sm font-semibold text-gray-700">
                Total Donations
              </div>
              <div className="text-xl md:text-3xl">00</div>
              <div className="text-xs">From to now</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
