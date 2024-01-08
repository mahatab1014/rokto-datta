import { Link } from "react-router-dom";
import SvgWave from "../../../assets/images/svg/svg_wave.svg";
import { Avatar } from "@mui/material";
import { HiPhone, HiEnvelope } from "react-icons/hi2";
import { MdOutlineLocationOn } from "react-icons/md";
import PropTypes from "prop-types";

const BloodDonorCard = ({ donor }) => {
  return (
    <div className="relative overflow-hidden [&>img]:hover:h-[250px] border rounded-box bg-base-100">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <figure>
            <Link to={`/donor/${donor?._id}`}>
              <Avatar alt={donor?.name} src={donor?.profile_pic} />
            </Link>
          </figure>
          <div>
            <Link to={`/donor/${donor?._id}`}>
              <h2 className="font-semibold">{donor?.name}</h2>
            </Link>
            <div className="text-left text-sm -mt-1">
              <span className="font-medium">Blood Group : </span>
              <span>{donor?.blood_group}</span>
            </div>
          </div>
        </div>
        <div className="pt-3">
          <p className="">{donor?.bio}</p>
          <div className="space-y-1 mt-3">
            <Link
              className="flex items-center gap-2 text-sm font-semibold"
              to={`tel:${donor?.phone_number}`}
            >
              <HiPhone />
              <span>{donor?.phone_number}</span>
            </Link>
            <Link
              className="flex items-center gap-2 text-sm font-semibold"
              to={`mailto:${donor?.email}`}
            >
              <HiEnvelope />
              <span>{donor?.email}</span>
            </Link>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MdOutlineLocationOn />
              <span className="capitalize">
                {donor?.district_data}, {donor?.division_data}
              </span>
            </div>
          </div>
        </div>
      </div>
      <img
        className="bottom-0 opacity-5 h-60 absolute object-cover transition-all pointer-events-none"
        src={SvgWave}
        alt=""
      />
    </div>
  );
};

export default BloodDonorCard;

BloodDonorCard.propTypes = {
  donor: PropTypes.object.isRequired,
};
