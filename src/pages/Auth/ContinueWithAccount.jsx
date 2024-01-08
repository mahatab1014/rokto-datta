import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import { FaFacebookF, FaGoogle, FaXTwitter } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ContinueWithAccount = () => {
  const { continueWithGoogle, continueWithFacebook, continueWithTwitter } =
    useAuth();
  const axiosPublic = useAxiosPublic();

  const handleSignInWithGoogle = () => {
    continueWithGoogle().then((res) => {
      const data = {
        uid: res?.user?.uid,
        email: res?.user?.email,
        name: res?.user?.displayName,
        account_pic: res?.user?.photoURL,
      };

      axiosPublic.patch("/users", data);
    });
  };

  const handleSignInWithFacebook = () => {
    continueWithFacebook();
  };

  const handleSignInWithTwitter = () => {
    continueWithTwitter();
  };

  return (
    <>
      <Divider className="pt-3 text-sm">Continue With Social Account</Divider>
      <div className="flex flex-wrap justify-center gap-2 py-5">
        <Button
          onClick={handleSignInWithGoogle}
          variant="outlined"
          startIcon={<FaGoogle />}
        >
          Google
        </Button>
        <Button
          onClick={handleSignInWithFacebook}
          variant="outlined"
          startIcon={<FaFacebookF />}
        >
          Facebook
        </Button>
        <Button
          onClick={handleSignInWithTwitter}
          variant="outlined"
          startIcon={<FaXTwitter />}
        >
          Twitter
        </Button>
      </div>
    </>
  );
};

export default ContinueWithAccount;
