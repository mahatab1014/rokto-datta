import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Container from "../../components/ui/Container/Container";
import LogoBan from "../../assets/images/logo/rokto-datta-ban.png";
import ContinueWithAccount from "./ContinueWithAccount";
import DomHead from "../../components/shared/DomHead/DomHead";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const form = e.target;
    const firstName = form.f_name.value;
    const lastName = form.l_name.value;
    const profilePicture = form.profile_pic.files[0];
    const password = form.password.value;

    if (password !== confirmPass) {
      setErrorMessage("Passwords do not match");
      return;
    }
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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <>
      <DomHead title="Sign Up" />
      <section>
        <Container>
          <div className="flex justify-center py-5">
            <div className="bg-base-100 border rounded p-5 max-w-md">
              <picture className="flex justify-center">
                <img className="h-12" src={LogoBan} alt="Rokto Datta" />
              </picture>
              <ContinueWithAccount />
              <form className="space-y-3" onSubmit={handleSignUp}>
                <div className="text-center">
                  <Divider className="pt-3 text-sm">Sign Up Here</Divider>
                </div>

                {errorMessage && (
                  <div className="text-lg bg-error text-white px-2">
                    {errorMessage}
                  </div>
                )}

                <div className="flex gap-2">
                  <TextField
                    type="text"
                    className="w-full"
                    id="f_name"
                    label="First Name"
                    name="f_name"
                    variant="filled"
                    required
                  />
                  <TextField
                    type="text"
                    className="w-full"
                    id="l_name"
                    label="Last Name"
                    name="l_name"
                    variant="filled"
                    required
                  />
                </div>

                {selectedImage && (
                  <div className="avatar flex py-3 justify-center">
                    <div className="w-24 rounded-full">
                      <img src={selectedImage} />
                    </div>
                  </div>
                )}

                <Button
                  component="label"
                  variant="contained"
                  startIcon={<FaCloudUploadAlt />}
                  className="!normal-case w-full"
                >
                  Upload Profile Picture
                  <VisuallyHiddenInput
                    id="profile_pic"
                    type="file"
                    onChangeCapture={handleImage}
                    name="profile_pic"
                    accept="image/*"
                  />
                </Button>

                <TextField
                  type="email"
                  className="w-full"
                  id="email"
                  label="E-mail"
                  name="email"
                  variant="filled"
                  required
                />
                <TextField
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  id="password"
                  label="Password"
                  name="password"
                  variant="filled"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? (
                            <AiOutlineEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  id="confirm_password"
                  label="Confirm Password"
                  name="confirm_password"
                  variant="filled"
                  required
                />
                <div className="flex justify-between [&>label>span>svg]:!w-5">
                  <FormControlLabel
                    control={<Checkbox style={{ fontSize: "10px" }} />}
                    label={
                      <span className="text-sm">Agree to Privacy Policy</span>
                    }
                    required
                  />
                  <Button type="submit" variant="contained">
                    Sign Up
                  </Button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <span className="text-sm font-medium">
                  Already have an account?{" "}
                  <Link className="text-blue-600" to="/sign-in">
                    Sign In
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default SignUp;
