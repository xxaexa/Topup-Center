import { useNavigate } from "react-router-dom";
import { GameCardProps } from "../types";

const GameCard = ({ image, name, link }: GameCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div
      onClick={handleClick}
      className="card flex cursor-pointer rounded-xl shadow-md overflow-hidden bg-card text-white hover:bg-button-hover transition duration-300"
    >
      <div className="w-[30%]">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="w-[70%] flex items-center justify-center p-4">
        <h2 className="text-lg font-semibold  text-center">{name}</h2>
      </div>
    </div>
  );
};

export default GameCard;
