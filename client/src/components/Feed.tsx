import FeedPost from "../components/FeedPost";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  username: string;
  userPfp: string;
}

interface Post {
  _id: string;
  content: string;
  likes: string[];
  user: User;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/post/getRandomPosts");
      setPosts(response.data);
    }
    fetchData();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <FeedPost
          key={post._id}
          content={post.content}
          likes={post.likes}
          user={post.user}
          _id={post._id}
        />
      ))}
    </>
  );
}
