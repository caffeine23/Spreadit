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
import { useState } from "react";
import { Link } from "react-router-dom";

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

const FeedPost: React.FC<FeedPostProps> = ({ content, likes, user }) => {
  const [isPostLiked, setIsPostLiked] = useState<boolean>();

  async function likePost() {
    console.log("axios request to like endpoint");
    setIsPostLiked(true);
  }
  async function unlikePost() {
    console.log("axios request to dislike endpoint");
    setIsPostLiked(false);
  }

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
