import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DomHead from "../../components/shared/DomHead/DomHead";
import BloodDonorCard from "../../components/ui/BloodDonorCard/BloodDonorCard";
import Container from "../../components/ui/Container/Container";
import Kids from "../../assets/images/kids.jpg";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import useDivisions from "../../hooks/useDivisions";
import useDistricts from "../../hooks/useDistricts";
import { FaCloudUploadAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { uploadImageImgBB } from "../../utility/utility";
import useDonorsData from "../../hooks/useDonorsData";

const BloodDonors = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { donorsData, donorsDataLoading } = useDonorsData();
  const [posting, setPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const { divisionsData, divisionsDataLoading } = useDivisions();
  const { districtsData, districtsDataLoading } =
    useDistricts(selectedDivision);

  useEffect(() => {
    const upazilasData = districtsData?.data?.find(
      (district) => district?._id === selectedDistrict
    );
    setUpazilas(upazilasData);
  }, [districtsData?.data, selectedDistrict]);

  const handlePost = async (e) => {
    e.preventDefault();
    setPosting(true);
    const form = e.target;
    const image = form.image.files[0];
    const name = form.name.value;
    const phone_number = form.phone_number.value;
    const bio = form.bio.value;
    const blood_group = form.blood_group.value;
    const division_data = form.division_data.value;
    const district_data = form.district_data.value;
    const upazilla_data = form.upazilla_data.value;

    if (!image) {
      setPosting(false);
      return setErrorMessage("Image must be non-empty");
    }
    if (!user) {
      setPosting(false);
      return setErrorMessage("User must be logged in");
    }

    const imageUpload = await uploadImageImgBB(image);
    const profile_picture = imageUpload?.data?.display_url
      ? imageUpload.data.display_url
      : null; // /assets/icons/user.png

    const data = {
      uid: user?.uid,
      email: user?.email,
      role: "donor",
      profile_pic: profile_picture,
      name: name,
      phone_number: phone_number,
      bio: bio,
      blood_group: blood_group,
      division_data: division_data,
      district_data: district_data,
      upazilla_data: upazilla_data,
    };

    axiosSecure.patch("users", data).then((res) => {
      console.log(res.data);
      setPosting(false);
    });
  };
  const bloodGroups = [
    { type: "A", Rh: "+" }, // A positive
    { type: "A", Rh: "-" }, // A negative
    { type: "B", Rh: "+" }, // B positive
    { type: "B", Rh: "-" }, // B negative
    { type: "AB", Rh: "+" }, // AB positive
    { type: "AB", Rh: "-" }, // AB negative
    { type: "O", Rh: "+" }, // O positive
    { type: "O", Rh: "-" }, // O negative
  ];

  const handleImage = (e) => {
    const image = e.target.files[0];
    if (image instanceof Blob) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataUrl = reader.result;
        setSelectedImage(imageDataUrl);
      };
      reader.readAsDataURL(image);
    } else {
      console.error("Selected file is not a valid image");
    }
  };

  return (
    <>
      <DomHead title="Blood Donors" />

      <section className="bg-slate-200">
        <Container>
          <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
              <img src={Kids} className="md:max-w-md rounded-lg shadow-2xl" />
              <div>
                <h2 className="text-xl md:text-3xl font-bold">
                  Join the Lifesaving Team:{" "}
                  <span className="text-blue-600">Be A Blood Donor!</span> 🩸
                </h2>
                <p className="py-6 font-medium">
                  Every drop counts, and so does your compassion. Take a moment
                  to make a difference <br /> — become a blood donor today. Your
                  act of kindness can save lives and bring hope to those in
                  need.
                </p>
                <Button
                  onClick={() =>
                    document.getElementById("donor_reg_modal_show").showModal()
                  }
                  variant="contained"
                >
                  Join Now
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 bg-white">
        <Container>
          <div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {donorsData?.data?.map((donor) => (
              <BloodDonorCard donor={donor} key={donor?._id} />
            ))}
          </div>
        </Container>
      </section>

      <dialog
        id="donor_reg_modal_show"
        className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
      >
        <div className="modal-box">
          {user ? (
            <>
              <h3 className="font-bold text-lg border-b-2 mb-3 text-center">
                Become A Blood Donors
              </h3>
              <div>
                <form className="space-y-2 label-style" onSubmit={handlePost}>
                  {errorMessage && (
                    <div className="bg-error font-semibold text-center rounded text-white">
                      {errorMessage}
                    </div>
                  )}

                  {selectedImage && (
                    <div className="flex py-3 justify-center">
                      <div className="w-40 rounded-full">
                        <img src={selectedImage} />
                      </div>
                    </div>
                  )}
                  <div>
                    <Button
                      component="label"
                      variant="contained"
                      className="!normal-case w-full !text-white relative"
                      startIcon={<FaCloudUploadAlt />}
                    >
                      Upload Image
                      <input
                        className="absolute top-0 left-0 w-full h-full opacity-0"
                        id="cover-img"
                        onChangeCapture={handleImage}
                        type="file"
                        name="image"
                        accept="image/*"
                      />
                    </Button>
                  </div>
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      placeholder="write your"
                      defaultValue={user?.displayName}
                      className="post-form-field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                      type="number"
                      id="phone_number"
                      name="phone_number"
                      min={0}
                      className="post-form-field"
                      placeholder="Ex: 01775025349"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      className="post-form-field"
                      placeholder="write description about yourself"
                      name="bio"
                      id="bio"
                      required
                    ></textarea>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-full">
                      <label htmlFor="blood_group">Blood Group</label>
                      <select
                        id="blood_group"
                        name="blood_group"
                        className="post-form-field"
                        required
                      >
                        <option disabled selected>
                          Blood Group
                        </option>
                        {bloodGroups.map((bloodGroup, index) => (
                          <option
                            value={`${bloodGroup?.type}${bloodGroup?.Rh}`}
                            key={index}
                          >
                            {bloodGroup?.type} ({bloodGroup.Rh})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <div>
                      <label htmlFor="division_data">Select Division:</label>
                      <select
                        className="post-form-field"
                        id="division_data"
                        name="division_data"
                        value={selectedDivision}
                        onChange={(e) => {
                          setSelectedDivision(e.target.value);
                          setSelectedDistrict(""); // Reset district when division changes
                        }}
                        required
                      >
                        <option value="" selected>
                          Select Division
                        </option>
                        {divisionsData?.data?.map((division) => (
                          <option key={division._id} value={division._id}>
                            {division.division}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedDivision && (
                      <div>
                        <label htmlFor="district_data">Select District:</label>
                        <select
                          className="post-form-field"
                          id="district_data"
                          name="district_data"
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                          required
                        >
                          <option value="" selected>
                            Select District
                          </option>
                          {districtsData?.data?.map((district) => (
                            <option key={district._id} value={district._id}>
                              {district.district}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {selectedDistrict && (
                      <div>
                        <label htmlFor="upazilla_data">Select Upazilla:</label>
                        <select
                          id="upazilla_data"
                          name="upazilla_data"
                          className="post-form-field"
                          required
                        >
                          <option value="" selected>
                            Select District
                          </option>
                          {upazilas?.upazilla?.map((upazilla, index) => (
                            <option key={index} value={upazilla}>
                              {upazilla}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="!gap-2 !normal-case bg-gradient-to-r from-[#e855de] to-[#5400ee] !text-gray-100"
                    >
                      Join
                      {posting && <span className="loading" />}
                    </Button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-bold text-lg border-b-2 mb-3">
                For creating post you need to be valid user
              </h3>
              <div>
                <span className="font-medium [&>a]:text-blue-700">
                  If you already have an account, please{" "}
                  <Link to="/sign-in">log in</Link>. If not, no worries – you
                  can easily create a new account by clicking on{" "}
                  <Link to="/sign-up">Create new account</Link>
                </span>
              </div>
            </>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default BloodDonors;
