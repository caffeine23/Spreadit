import Navbar from "../components/Navbar";
import MakePost from "../components/MakePost";
import FeedPost from "../components/FeedPost";
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
          <FeedPost />
        </div>
      </div>
    </>
  );
}

export default App;
