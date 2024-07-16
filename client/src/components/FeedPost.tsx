import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useUserStore from "../context/UserContext";

interface User {
  _id: string;
  username: string;
  userPfp: string;
}

interface FeedPostProps {
  _id: string;
  content: string;
  likes: string[];
  user: User;
}

const FeedPost: React.FC<FeedPostProps> = ({ content, likes, user, _id }) => {
  const [isPostLiked, setIsPostLiked] = useState<boolean>();

  const { user: currentUser, fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  async function likePost() {
    await axios.post(`/post/likePost/${_id}`, {
      userId: currentUser?.userId,
    });
    setIsPostLiked(true);
  }
  async function unlikePost() {
    await axios.post(`/post/unlikePost/${_id}`, {
      userId: currentUser?.userId,
    });
    setIsPostLiked(false);
  }

  useEffect(() => {
    // Check if the current user has liked the post
    if (currentUser && likes.includes(currentUser.userId)) {
      setIsPostLiked(true);
    } else {
      setIsPostLiked(false);
    }
  }, [currentUser, likes]);

  return (
    <Card maxW="md" className="my-8">
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar src={user.userPfp} />

            <Box>
              <Heading size="sm">{user.username}</Heading>
              <Text>@{user.username}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Link to={"/post"}>
          <Text>{content}</Text>
        </Link>
      </CardBody>
      <CardFooter justify="space-between" flexWrap="wrap">
        {isPostLiked ? (
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<FcLike />}
            onClick={unlikePost}
          >
            {likes.length + 1}
          </Button>
        ) : (
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<FaHeart />}
            onClick={likePost}
          >
            {likes.length}
          </Button>
        )}
        <Button flex="1" variant="ghost" leftIcon={<FaRegComment />}>
          #
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeedPost;
