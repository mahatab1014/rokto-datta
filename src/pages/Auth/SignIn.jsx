import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Container from "../../components/ui/Container/Container";
import LogoBan from "../../assets/images/logo/rokto-datta-ban.png";
import ContinueWithAccount from "./ContinueWithAccount";
import DomHead from "../../components/shared/DomHead/DomHead";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";

const SignIn = () => {
  const { signInUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password);
  };

  return (
    <>
      <DomHead title="Sign In" />
      <section>
        <Container>
          <div className="flex justify-center py-5">
            <div className="bg-base-100 border rounded p-5">
              <picture className="flex justify-center">
                <img className="h-12" src={LogoBan} alt="Rokto Datta" />
              </picture>
              <ContinueWithAccount />
              <form className="space-y-3" onSubmit={handleSignIn}>
                <div className="text-center">
                  {/* <div className="text-2xl">Welcome Back</div> */}
                  <Divider className="pt-3 text-sm">Login With E-mail</Divider>
                </div>
                {errorMessage && (
                  <div className="text-lg bg-error text-white px-2">
                    {errorMessage}
                  </div>
                )}

                <TextField
                  type="email"
                  className="w-full"
                  id="sign-in-email"
                  label="E-mail"
                  name="email"
                  variant="filled"
                  required
                />
                <TextField
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  id="sign-in-password"
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
                <div className="flex justify-between [&>label>span>svg]:!w-5">
                  <FormControlLabel
                    control={<Checkbox style={{ fontSize: "10px" }} />}
                    label={<span className="text-sm">Remember Me</span>}
                  />
                  <Button type="submit" variant="contained">
                    Sign In
                  </Button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <span className="text-sm font-medium">
                  Don't have an account?{" "}
                  <Link className="text-blue-600" to="/sign-up">
                    Sign Up
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

export default SignIn;
