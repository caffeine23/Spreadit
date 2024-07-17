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
  Textarea,
} from "@chakra-ui/react";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useState, useEffect } from "react";
import axios from "axios";
import useUserStore from "../context/UserContext";

interface User {
  _id: string;
  username: string;
  userPfp: string;
}

interface PostBodyProps {
  _id: string;
  content: string;
  likes: string[];
  user: User;
  commentsCount: number;
}

const PostBody: React.FC<PostBodyProps> = ({
  content,
  likes,
  user,
  _id,
  commentsCount,
}) => {
  const [isPostLiked, setIsPostLiked] = useState<boolean>();
  const [postContent, setPostContent] = useState<string>(content);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  async function handleEdit() {
    await axios.patch(`/post/updatePost/${_id}`, {
      content: postContent,
    });
    setIsEditing(false);
  }

  async function handleDelete() {
    await axios.delete(`/post/deletePost/${_id}`);
  }

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
  }, []);

  return (
    <Card>
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar src={user.userPfp} />

            <Box>
              <Heading size="md">@{user.username}</Heading>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        {isEditing ? (
          <Textarea
            resize="none"
            width="90%"
            height="60px"
            className="overflow-hidden"
            value={postContent}
            onChange={(evt) => setPostContent(evt.target.value)}
          />
        ) : (
          <Text>{content}</Text>
        )}
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
          {commentsCount}
        </Button>
        {currentUser?.userId === user._id && (
          <>
            {isEditing ? (
              <Button
                flex="1"
                variant="ghost"
                // leftIcon={<FcLike />}
                onClick={handleEdit}
              >
                Submit
              </Button>
            ) : (
              <Button
                flex="1"
                variant="ghost"
                // leftIcon={<FcLike />}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}

            <Button
              flex="1"
              variant="ghost"
              // leftIcon={<FaHeart />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostBody;
