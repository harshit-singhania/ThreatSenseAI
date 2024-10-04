import { ProfileCardData } from "../Data/ProfileCardData";
import ProfileCards from "../Cards/ProfileCards";

const footerKnowTheTeam = () => {
  return (
    <div className="">
      <div className="flex flex-wrap justify-center space-y-12 md:space-y-0 md:space-x-[5rem]">
        {ProfileCardData.slice(0, 3).map((profile, index) => (
          <div key={index} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5">
            <ProfileCards {...profile} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center space-y-12 md:space-y-0 md:space-x-[5rem]">
        {ProfileCardData.slice(3, 6).map((profile, index) => ( // Modified slice to include Rajdeep Chatterjee
          <div key={index} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5">
            <ProfileCards {...profile} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default footerKnowTheTeam;
