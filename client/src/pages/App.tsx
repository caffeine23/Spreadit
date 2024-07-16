import Navbar from "../components/Navbar";
import MakePost from "../components/MakePost";
import Feed from "../components/Feed";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="w-96 h-64">
          <MakePost />
          <Feed />
        </div>
      </div>
    </>
  );
}

export default App;
