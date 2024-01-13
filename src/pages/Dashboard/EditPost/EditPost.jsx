import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import useDivisions from "../../../hooks/useDivisions";
import DatePicker from "react-datepicker";
import useDistricts from "../../../hooks/useDistricts";
import { useNavigate, useParams } from "react-router-dom";
import useSinglePostData from "../../../hooks/useSinglePostData";
import moment from "moment";
import { uploadImageImgBB } from "../../../utility/utility";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const EditPost = () => {
  const { id } = useParams();
  const [posting, setPosting] = useState(false);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { singlePostData, singlePostDataRefetch, singlePostDataLoading } =
    useSinglePostData(id);
  const data = singlePostData?.data;

  const [errorMessage, setErrorMessage] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedDivision, setSelectedDivision] = useState(
    data?.division_name || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    data?.district_name || ""
  );
  const [upazilas, setUpazilas] = useState(data?.upazilla_name || []);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setPosting(true);
    setErrorMessage("");
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

    let imgData = null;
    if (image) {
      const imageUpload = await uploadImageImgBB(image);
      imgData = imageUpload?.data;
    }

    const postData = {
      title: title,
      description: description,
      blood_group: blood_group,
      image_info: {
        image_url: !image ? data?.image_info?.image_url : imgData?.url,
        md_image_url: !image
          ? data?.image_info?.md_image_url
          : imgData?.medium?.url,
        image_delete_url: !image
          ? data?.image_info?.image_delete_url
          : imgData?.delete_url,
      },
      post_type: post_type,
      phone_number: phone_number,
      hospital_name: hospital_name,
      hospital_address: hospital_address,
      division_name: division_name,
      district_name: district_name,
      upazilla_name: upazilla_name,
      edit_at: new Date(),
      blood_need_deadline: selectedDate,
    };
    axiosSecure.patch(`/post/${id}`, postData).then((response) => {
      setPosting(false);
      if (response?.data?.message === "Post updated successfully") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Post updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        singlePostDataRefetch();
        return navigate(`/post/${id}`);
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Something went wrong",
          text: "Please try again",
          showConfirmButton: true,
        });
      }
    });
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
      <section>
        <div>
          <h3 className="text-xl lg:text-3xl text-center uppercase font-semibold">
            Update Post
          </h3>
        </div>
        <form className="space-y-2 label-style" onSubmit={handleUpdate}>
          {errorMessage && (
            <div className="bg-error font-semibold text-center rounded text-white">
              {errorMessage}
            </div>
          )}

          {(selectedImage || data?.image_info) && (
            <div className="flex py-3 justify-center">
              <div className="w-56 rounded-full pointer-events-none">
                <img
                  src={
                    selectedImage
                      ? selectedImage
                      : data?.image_info?.md_image_url
                  }
                />
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
              Change Image
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
              defaultValue={data?.title}
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
              defaultValue={data?.description}
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
                disabled={selectedEvent === "event"}
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
                onChange={(e) => setSelectedEvent(e.target.value)}
                defaultValue={data?.post_type}
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
              value={moment(data?.blood_need_deadline).format(
                "DD, MM, YYYY | h:mm a"
              )}
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
              defaultValue={data?.phone_number}
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
              defaultValue={data?.hospital_name}
              required
            />
          </div>
          <div>
            <label htmlFor="hospital_address">Hospital Address</label>
            <textarea
              name="hospital_address"
              id="hospital_address"
              className="post-form-field"
              defaultValue={data?.hospital_address}
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
                defaultValue={data?.division_name}
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
      </section>
    </>
  );
};

export default EditPost;
