import FeedPost from "../components/FeedPost";
import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../context/UserContext";
import Navbar from "../components/Navbar";
import { Avatar, Heading } from "@chakra-ui/react";

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
  commentsCount: number;
}

export default function Profile() {
  const { user, fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/post/getUserPosts/${user?.userId}`);
      setPosts(response.data);
    }
    fetchData();
  }, [user]);
  console.log(user?.userId);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center">
        <Avatar size={"3xl"} src={user?.pfp || ""} className="my-4" />
        <Heading size="xl" className="my-2">
          @{user?.username}
        </Heading>
        <Heading size={"md"} className="my-2">
          Your Posts
        </Heading>
        <div className="w-full flex flex-col items-center">
          {posts.map((post) => (
            <FeedPost
              key={post._id}
              content={post.content}
              likes={post.likes}
              user={post.user}
              _id={post._id}
              commentsCount={post.commentsCount}
            />
          ))}
        </div>
      </div>
    </>
  );
}
