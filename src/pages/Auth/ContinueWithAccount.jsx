import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import { FaFacebookF, FaGoogle, FaXTwitter } from "react-icons/fa6";

const ContinueWithAccount = () => {
  return (
    <>
      <Divider className="pt-3 text-sm">Continue With Social Account</Divider>
      <div className="flex flex-wrap justify-center gap-2 py-5">
        <Button variant="outlined" startIcon={<FaGoogle />}>
          Google
        </Button>
        <Button variant="outlined" startIcon={<FaFacebookF />}>
          Facebook
        </Button>
        <Button variant="outlined" startIcon={<FaXTwitter />}>
          Twitter
        </Button>
      </div>
    </>
  );
};

export default ContinueWithAccount;
