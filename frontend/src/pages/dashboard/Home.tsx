import { useEffect, useState } from "react";
import { Box } from "../../components";
import { getUserFromLocalStorage } from "../../utils/localStorage"; // sesuaikan path-nya
import { UserData } from "../../types";

const Home = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const data = getUserFromLocalStorage();
    setUser(data);
  }, []);

  return (
    <div className="p-4">
      <Box className="bg-gray-800 shadow rounded-xl text-white p-4">
        <h2>Hallo {user?.user?.name ?? "Admin"}</h2>
      </Box>
    </div>
  );
};

export default Home;
