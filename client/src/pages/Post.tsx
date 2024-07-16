import Navbar from "../components/Navbar";
import PostBody from "../components/PostBody";
import MakeComment from "../components/MakeComment";
import CommentFeed from "../components/CommentFeed";
import { useLocation } from "react-router-dom";

export default function Post() {
  const location = useLocation();
  const { content, likes, user, _id, commentsCount } = location.state;
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <div className="w-2/3 h-64">
          <PostBody
            content={content}
            likes={likes}
            user={user}
            _id={_id}
            commentsCount={commentsCount}
          />
        </div>
        <MakeComment postId={_id} />
        <CommentFeed postId={_id} />
      </div>
    </>
  );
}
