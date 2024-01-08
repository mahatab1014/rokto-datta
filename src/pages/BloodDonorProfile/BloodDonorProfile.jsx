import useSingleDonorData from "../../hooks/useSingleDonorData";
import { Link, useParams } from "react-router-dom";
import CoverPhoto from "../../assets/images/toa-heftiba-_UIVmIBB3JU-unsplash.jpg";
import Container from "../../components/ui/Container/Container";
import { Avatar, Button } from "@mui/material";
import DomHead from "../../components/shared/DomHead/DomHead";
import { HiPhone } from "react-icons/hi";
import { HiEnvelope } from "react-icons/hi2";
import { MdOutlineLocationOn } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

const BloodDonorProfile = () => {
  const { id } = useParams();
  const { singleDonorData, singleDonorDataLoading } = useSingleDonorData(id);
  const donor = singleDonorData?.data;
  return (
    <>
      <DomHead
        title={donor?.name}
        metaDescription={donor?.bio}
        metaAuthorName={donor?.name}
        metaImageURL={donor?.profile_pic}
      />
      <section className="pb-10">
        <figure>
          <img
            className="w-full h-60 md:h-80 object-cover pointer-events-none"
            src={CoverPhoto}
            alt="cover photo"
          />
        </figure>
        <Container>
          {singleDonorDataLoading ? (
            <>
              <div className="flex gap-4 items-center bg-base-100 rounded-full border">
                <div className="-mt-1">
                  <Skeleton circle height={100} width={100} />
                </div>
                <div className="w-full pr-5">
                  <Skeleton height={20} className="!w-full md:!w-80" />
                  <Skeleton height={8} className="!w-full md:!w-60" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="w-full bg-base-100 rounded-box p-5 border">
                  <Skeleton count={5} />
                </div>
                <div className="w-full bg-base-100 rounded-box p-5 border">
                  <Skeleton count={5} />
                </div>
              </div>
            </>
          ) : (
            <div className="mt-5 space-y-5">
              <div className="p-5 sm:p-8 md:p-0 bg-base-100 md:rounded-full border flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <figure>
                    <Avatar
                      className="!w-14 !h-14 sm:!w-20 sm:!h-20 md:!w-40 md:!h-40"
                      alt={donor?.name}
                      src={donor?.profile_pic}
                    />
                  </figure>
                  <div className="space-y-1">
                    <h2 className="font-semibold text-xl md:text-3xl">
                      {donor?.name}
                    </h2>
                    <div className="text-left md:text-lg -mt-1">
                      <span className="font-medium">Blood Group : </span>
                      <span>{donor?.blood_group}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outlined">Call Now</Button>
                  <Button variant="outlined">E-mail Now</Button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full bg-base-100 rounded-box border p-5 sm:p-8">
                  <h1 className="text-2xl font-semibold">
                    About {donor?.name}!
                  </h1>
                  <p>{donor?.bio}</p>
                </div>
                <div className="w-full bg-base-100 rounded-box border p-5 sm:p-8 flex flex-col justify-evenly">
                  <Link
                    className="flex items-center gap-2 font-semibold"
                    to={`tel:${donor?.phone_number}`}
                  >
                    <HiPhone />
                    <span>{donor?.phone_number}</span>
                  </Link>
                  <Link
                    className="flex items-center gap-2 font-semibold"
                    to={`mailto:${donor?.email}`}
                  >
                    <HiEnvelope />
                    <span>{donor?.email}</span>
                  </Link>
                  <div className="flex items-center gap-2 font-semibold">
                    <MdOutlineLocationOn />
                    <span className="capitalize">
                      {donor?.upazilla_data}, {donor?.district_data},{" "}
                      {donor?.division_data}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default BloodDonorProfile;
