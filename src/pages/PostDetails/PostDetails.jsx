import { useParams } from "react-router-dom";
import useSinglePostData from "../../hooks/useSinglePostData";
import Container from "../../components/ui/Container/Container";
import moment from "moment-timezone";

import { RxCalendar } from "react-icons/rx";
import { HiOutlineLocationMarker, HiOutlinePhone } from "react-icons/hi";
import { MdOutlineLocationCity, MdOutlineBloodtype } from "react-icons/md";
import { TbUrgent } from "react-icons/tb";

import { Avatar } from "@mui/material";
import DomHead from "../../components/shared/DomHead/DomHead";
import Skeleton from "react-loading-skeleton";
import React from "react";

const PostDetails = () => {
  const { id } = useParams();

  const { singlePostData, singlePostDataLoading } = useSinglePostData(id);

  const data = singlePostData?.data;

  // TIME ZONE
  const postedTimeUTC = moment.utc(data?.posted_at);
  // Get the user's time zone (you may need to get this information from the user somehow)
  const userTimeZone = moment.tz.guess();
  // Convert the posted time to the user's time zone
  const postedTimeUserTZ = postedTimeUTC.tz(userTimeZone);
  // Calculate the duration
  const duration = moment.duration(moment().diff(postedTimeUserTZ));
  const minutes = duration.asMinutes();
  const hours = duration.asHours();
  const days = duration.asDays();
  const weeks = duration.asWeeks();
  const years = duration.asYears();

  return (
    <>
      <DomHead
        title={data?.title}
        metaDescription={data?.description}
        metaImageURL={data?.image_info?.image_url}
        metaAuthorName={data?.author?.name}
      />
      <section className="py-5">
        <Container>
          {singlePostData?.status === 200 ? (
            <>
              {singlePostDataLoading ? (
                <>
                  <article className="">
                    <div className="flex flex-col md:flex-row gap-5">
                      <div className="md:w-6/12 min-h-60 max-h-80 skeleton bg-[#dddd] rounded"></div>
                      <div className="md:w-6/12 flex flex-col justify-evenly">
                        <div className="flex gap-3">
                          <Skeleton circle className="!w-10 h-10" />
                          <div className="">
                            <Skeleton className="!rounded-full !w-60 h-5" />
                            <Skeleton className="!w-20 h-2" />
                          </div>
                        </div>
                        <div className="space-y-1 text-gray-600 [&>div>span]:text-sm md:[&>div>span]:text-base [&>div>span]:font-semibold">
                          <Skeleton className="!rounded-full !w-4/12 h-3" />
                          <Skeleton className="!rounded-full !w-3/12 h-3" />
                          <Skeleton className="!rounded-full !w-5/12 h-3" />
                          <Skeleton className="!rounded-full !w-2/12 h-3" />
                        </div>
                      </div>
                    </div>
                    <div className="py-5 space-y-3">
                      <Skeleton className="!rounded-full !w-12/12 h-8 mb-5" />
                      <Skeleton className="!rounded-full !w-7/12 h-3" />
                      <Skeleton className="!rounded-full !w-9/12 h-3" />
                      <Skeleton className="!rounded-full !w-5/12 h-3" />
                      <Skeleton className="!rounded-full !w-11/12 h-3" />
                      <Skeleton className="!rounded-full !w-8/12 h-3" />
                    </div>
                  </article>
                </>
              ) : (
                <article className="">
                  <div className="flex flex-col md:flex-row gap-5">
                    <figure className="md:w-6/12 max-h-80 skeleton bg-[#dddd]  rounded flex justify-center">
                      <img
                        className="rounded object-contain"
                        src={
                          data?.image_info?.md_image_url ||
                          data?.image_info?.image_url
                        }
                        alt={data?.title}
                      />
                    </figure>
                    <div className="md:w-6/12 flex flex-col justify-evenly">
                      <div className="flex items-center gap-3 mb-5">
                        <Avatar
                          // sx={{ width: 32, height: 32 }}
                          alt={data?.author?.name}
                          src={data?.author?.profile_pic}
                        />
                        <div>
                          <div className="font-bold">{data?.author?.name}</div>
                          <div className="text-xs font-semibold">
                            {(minutes < 60 && (
                              <>{`${Math.round(minutes)} minute${
                                Math.round(minutes) !== 1 ? "s" : ""
                              } ago`}</>
                            )) ||
                              (hours < 24 && (
                                <>{`${Math.round(hours)} hour${
                                  Math.round(hours) !== 1 ? "s" : ""
                                } ago`}</>
                              )) ||
                              (days < 7 && (
                                <>{`${Math.round(days)} day${
                                  Math.round(days) !== 1 ? "s" : ""
                                } ago`}</>
                              )) ||
                              (weeks < 52 && (
                                <>{`${Math.round(weeks)} week${
                                  Math.round(weeks) !== 1 ? "s" : ""
                                } ago`}</>
                              )) || (
                                <>{`${Math.round(years)} year${
                                  Math.round(years) !== 1 ? "s" : ""
                                } ago`}</>
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1 text-gray-600 [&>div>span]:text-sm md:[&>div>span]:text-base [&>div>span]:font-semibold">
                        {data?.post_type !== "event" && (
                          <div className="flex items-center gap-3">
                            <MdOutlineBloodtype className="text-xl" />
                            <span>{data?.blood_group}</span>
                          </div>
                        )}

                        {data?.post_type && (
                          <div className="flex items-center gap-3 capitalize">
                            <TbUrgent className="text-xl" />
                            <span>{data?.post_type}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <HiOutlinePhone className="text-xl" />
                          <span>{data?.phone_number}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <RxCalendar className="text-xl" />
                          <span>
                            {moment(data?.blood_need_deadline).format(
                              "DD-MM-YYYY | h:mm a"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MdOutlineLocationCity className="text-xl" />
                          <span>{data?.hospital_name}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <HiOutlineLocationMarker className="text-xl mt-1" />
                          <div>
                            <span className="text-sm md:text-base font-semibold">
                              {data?.hospital_address}
                            </span>
                            <span className="block capitalize text-sm">
                              {data?.division_name}, {data?.district_name},{" "}
                              {data?.upazilla_name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-5 space-y-3">
                    <h1 className="text-xl md:text-3xl font-bold">
                      {data?.title}
                    </h1>
                    <p className="text-lg font-medium text-gray-700">
                      {data?.description?.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          <>{line}</>
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </article>
              )}
            </>
          ) : (
            <></>
          )}
        </Container>
      </section>
    </>
  );
};

export default PostDetails;
