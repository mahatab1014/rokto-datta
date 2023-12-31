import { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { FaRegImage } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";

import useDivisions from "../../../hooks/useDivisions";
import useDistricts from "../../../hooks/useDistricts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { uploadImageImgBB } from "../../../utility/utility";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreatePost = () => {
  const { user, userLoading } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [posting, setPosting] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setPosting(true);
    const form = e.target;
    const image = form.image.files[0];
    const title = form.title.value;
    const description = form.description.value;
    const blood_group = form.blood_group.value;
    const post_type = form.post_type.value;
    const phone_number = form.number.value;
    const hospital_name = form.hospital_name.value;
    const hospital_address = form.hospital_address.value;
    const division_name = form.division_data.value;
    const district_name = form.district_data.value;
    const upazilla_name = form.upazilla_data.value;

    const imageUpload = {}; //await uploadImageImgBB(image);
    const imgData = imageUpload?.data;
    // console.log(imgData);

    if (!user) {
      return;
    }

    const data = {
      title: title,
      description: description,
      blood_group: blood_group,
      image_info: {
        image_url: imgData?.url,
        md_image_url: imgData?.medium?.url,
        image_delete_url: imgData?.delete_url,
      },
      post_type: post_type,
      phone_number: phone_number,
      hospital_name: hospital_name,
      hospital_address: hospital_address,
      division_name: division_name,
      district_name: district_name,
      upazilla_name: upazilla_name,
      posted_at: new Date(),
      blood_need_deadline: selectedDate,
      author: {
        name: user?.displayName,
        uid: user?.uid,
        email: user?.email,
        profile_pic: user?.photoURL,
      },
      comment_count: 0,
    };

    const red = await axiosSecure("/create-post", data);
    console.log(red);
  };

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
      <div className="p-3 sm:p-6 bg-base-100 border rounded">
        <div className="flex gap-5">
          <figure className="">
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
            />
          </figure>
          <div
            onClick={() =>
              document.getElementById("post_modal_show").showModal()
            }
            className="text-sm sm:text-base cursor-pointer flex items-center rounded-full w-full bg-[#f3f4f6] text-gray-600 px-3 sm:px-5 font-medium"
          >
            Need any type of blood?
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div>
            <Button
              onClick={() =>
                document.getElementById("post_modal_show").showModal()
              }
              className="space-x-2 !normal-case"
            >
              <FaRegImage className="text-[#ff1e56] text-lg" />
              <span className="text-gray-600">Photo / Video</span>
            </Button>
          </div>
          <div>
            <Button
              onClick={() =>
                document.getElementById("post_modal_show").showModal()
              }
              className="!normal-case bg-gradient-to-r from-[#e855de] to-[#5400ee] !text-gray-100"
            >
              Create Post
            </Button>
          </div>
        </div>
      </div>

      <dialog
        id="post_modal_show"
        className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
      >
        <div className="modal-box">
          {user ? (
            <>
              <h3 className="font-bold text-lg border-b-2 mb-3">Create Post</h3>
              <div>
                <form className="space-y-2 label-style" onSubmit={handlePost}>
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
                    <label htmlFor="title">Title</label>
                    <input
                      id="title"
                      name="title"
                      placeholder="write title"
                      className="post-form-field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="post-form-field"
                      placeholder="write description about your patient"
                      name="description"
                      id="description"
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
                    <div className="w-full">
                      <label htmlFor="post_type">Post Type</label>
                      <select
                        id="post_type"
                        name="post_type"
                        className="post-form-field"
                        required
                      >
                        <option selected>None</option>
                        <option value="urgent">Urgent</option>
                        <option value="event">Event</option>
                      </select>
                    </div>
                  </div>

                  <div className="[&>div]:w-full">
                    <label htmlFor="date_time" className="block">
                      Pick Date and Time
                    </label>
                    <DatePicker
                      id="date_time"
                      className="post-form-field !w-full"
                      selected={selectedDate}
                      onChange={handleDateChange}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="dd, MM, yyyy | h:mm aa"
                      minDate={new Date()}
                      placeholderText="Ex: 01, 05, 2025 | 11:30 PM"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone">Your Phone Number</label>
                    <input
                      type="number"
                      id="phone"
                      name="number"
                      min={0}
                      className="post-form-field"
                      placeholder="Ex: 01775025349"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="hospital_name">Hospital Name</label>
                    <input
                      id="hospital_name"
                      name="hospital_name"
                      className="post-form-field"
                      placeholder="Ex: Dhaka Medical"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="hospital_address">Hospital Address</label>
                    <textarea
                      name="hospital_address"
                      id="hospital_address"
                      className="post-form-field"
                      required
                    ></textarea>
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
                      Post Now
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

export default CreatePost;
