import GameCard from "../../components/GameCard";
import { ImageSlider, ContainerWrap } from "../../components";
import { useGetVouchersQuery } from "../../redux/api/voucher";
import { useEffect, useState } from "react";
import TutorialPopup from "../../components/TutorialPopup";
import { VoucherProps } from "../../types";
import { useAppSelector } from "./../../redux/hook";

const Home = () => {
  const { data, isLoading, isError } = useGetVouchersQuery();

  const vouchers = data || [];

  const [showPopup, setShowPopup] = useState(false);
  const hasSeenTutorial = useAppSelector(
    (state) => state.tutorialPopup.hasSeenTutorial
  );

  useEffect(() => {
    if (!hasSeenTutorial) {
      setShowPopup(true);
    }
  }, [hasSeenTutorial]);
  return (
    <div className="">
      {showPopup && <TutorialPopup onClose={() => setShowPopup(false)} />}
      {/* slider */}
      <ImageSlider />

      {/* game */}
      <ContainerWrap>
        <h2 className="text-2xl text-white font-bold mb-6 mt-16">
          Game Populer
        </h2>

        {isLoading && <p className="text-white">Loading...</p>}
        {isError && <p className="text-white">Gagal memuat data voucher.</p>}

        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          {vouchers.map((voucher: VoucherProps) => (
            <GameCard
              key={voucher._id}
              name={voucher.game_name}
              image={voucher.image_url}
              link={`/voucher/${voucher.game_name}`}
            />
          ))}
        </div>
      </ContainerWrap>
    </div>
  );
};

export default Home;
