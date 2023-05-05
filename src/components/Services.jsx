import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex justify-start items-center p-3 m-2 cursor-pointer hover:shadow-xl border-[2px] text-white rounded-lg">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h1 className="mt-2 text-lg">{title}</h1>
      <p className="mt-2 text-lg">{subtitle}</p>
    </div>
  </div>
);
const Services = () => {
  return (
    <div className="flex sm:flex-row flex-col w-full justify-center items-center bg-black p-2">
      <div className="flex sm:flex-row flex-col items-center justify-between sm:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl text-gradient">
            Services that we <br /> continue to improve
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952e3]"
          title="Security guarantee"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Security is guaranteed, we always maintain privacy and the quality of our product"
        />
        <ServiceCard
          color="bg-[#89845f]"
          title="Best exchange rate"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="Security is guaranteed, we always maintain privacy and the quality of our product"
        />
        <ServiceCard
          color="bg-[#f84550]"
          title="Fastest transactions"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Security is guaranteed, we always maintain privacy and the quality of our product"
        />
      </div>
    </div>
  );
};

export default Services;
