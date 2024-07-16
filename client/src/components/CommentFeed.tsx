import Comment from "../components/Comment";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  username: string;
  userPfp: string;
}

interface Comment {
  _id: string;
  content: string;
  user: User;
}

interface CommentFeedProps {
  postId: string;
}

export default function CommentFeed({ postId }: CommentFeedProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/comment/getPostComments/${postId}`);
      setComments(response.data);
    }
    fetchData();
  }, []);

  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          _id={comment._id}
          content={comment.content}
          user={comment.user}
        />
      ))}
    </>
  );
}
