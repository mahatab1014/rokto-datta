import { Button } from "@mui/material";
import DomHead from "../../components/shared/DomHead/DomHead";
import BloodDonorCard from "../../components/ui/BloodDonorCard/BloodDonorCard";
import Container from "../../components/ui/Container/Container";
import Kids from "../../assets/images/kids.jpg";

const BloodDonors = () => {
  return (
    <>
      <DomHead title="Blood Donors" />
      <section className="py-10 bg-white">
        <Container>
          <div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <BloodDonorCard />
            <BloodDonorCard />
            <BloodDonorCard />
            <BloodDonorCard />
            <BloodDonorCard />
            <BloodDonorCard />
          </div>
        </Container>
      </section>
    </>
  );
};

export default BloodDonors;
