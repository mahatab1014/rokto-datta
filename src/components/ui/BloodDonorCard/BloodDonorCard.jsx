import { Link } from "react-router-dom";
import SvgWave from "../../../assets/images/svg/svg_wave.svg";
import { Avatar } from "@mui/material";
import { HiPhone, HiEnvelope } from "react-icons/hi2";
import { MdOutlineLocationOn } from "react-icons/md";

const BloodDonorCard = () => {
  return (
    <div className="relative overflow-hidden [&>img]:hover:h-56 border rounded-box bg-base-100">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <figure>
            <Link>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Link>
          </figure>
          <div>
            <Link>
              <h2 className="font-semibold">Mahatab Hossain Sudip</h2>
            </Link>
            <div className="text-left text-sm -mt-1">
              <span className="font-medium">Blood Group : </span>
              <span>AB +</span>
            </div>
          </div>
        </div>
        <div className="pt-3">
          <p className="">
            I'm a Front-End web developer creating seamless interfaces.
            Committed to crafting user-friendly interfaces and empowering fellow
            developers on the journey.
          </p>
          <div className="space-y-1 mt-3">
            <Link
              className="flex items-center gap-2 text-sm font-semibold"
              to={`tel:01775025349`}
            >
              <HiPhone />
              <span>01775025349</span>
            </Link>
            <Link
              className="flex items-center gap-2 text-sm font-semibold"
              to={`mailto:mhsudip815@gmail.com`}
            >
              <HiEnvelope />
              <span>mhsudip815@gmail.com</span>
            </Link>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MdOutlineLocationOn />
              <span>Jamalpur, Mymensingh</span>
            </div>
          </div>
        </div>
      </div>
      <img
        className="bottom-0 opacity-15 h-60 absolute object-cover transition-all pointer-events-none"
        src={SvgWave}
        alt=""
      />
    </div>
  );
};

export default BloodDonorCard;
