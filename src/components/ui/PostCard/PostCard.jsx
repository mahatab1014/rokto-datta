import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { RxCalendar } from "react-icons/rx";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { MdOutlineLocationCity } from "react-icons/md";

const PostCard = ({ postData }) => {
  console.log(postData);
  return (
    <article className="card card-compact lg:card-side bg-base-100 border rounded">
      <figure className="lg:w-5/12 min-h-44 max-h-72">
        <img
          className="w-full h-full object-cover"
          src={postData?.cover_img}
          alt={postData?.title}
        />
      </figure>
      <div className="lg:w-7/12 card-body">
        <div className="card-title">
          <h2>{postData?.title}</h2>
          <div className="badge badge-warning gap-2 capitalize">
            {postData?.post_type}
          </div>
        </div>
        <p>
          {postData?.description && postData.description.length > 200
            ? `${postData.description.slice(0, 200)}....`
            : postData?.description}
        </p>
        <div className="text-gray-600 [&>div>span]:text-xs [&>div>span]:font-semibold">
          <div className="flex items-center gap-3">
            <RxCalendar className="text-lg" />
            <span>02-01-2024 | 10:00 am</span>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineLocationCity className="text-lg" />
            <span>{postData?.hospital_name}</span>
          </div>
          <div className="flex items-center gap-3">
            <HiOutlineLocationMarker className="text-lg" />
            <span>{postData?.hospital_address}</span>
          </div>
        </div>
        <div>
          <Button variant="outlined">Details</Button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;

PostCard.propTypes = {
  postData: PropTypes.object.isRequired,
};
