import Navbar from "../components/Navbar";
import PostBody from "../components/PostBody";
import MakeComment from "../components/MakeComment";
import Comment from "../components/Comment";

export default function Post() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <div className="w-2/3 h-64">
          <PostBody />
        </div>
        <MakeComment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </>
  );
}
