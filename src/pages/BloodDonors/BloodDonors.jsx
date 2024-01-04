import { Button } from "@mui/material";
import DomHead from "../../components/shared/DomHead/DomHead";
import BloodDonorCard from "../../components/ui/BloodDonorCard/BloodDonorCard";
import Container from "../../components/ui/Container/Container";
import Kids from "../../assets/images/kids.jpg";

const BloodDonors = () => {
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
                <Button variant="contained">Join Now</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

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
