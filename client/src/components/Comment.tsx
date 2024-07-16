import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { MdDone } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import useUserStore from "../context/UserContext";

interface User {
  _id: string;
  username: string;
  userPfp: string;
}

interface CommentProps {
  _id: string;
  content: string;
  user: User;
  userId: string;
}

const Comment: React.FC<CommentProps> = ({ content, user, _id, userId }) => {
  const [commentContent, setCommentContent] = useState<string>(content);
  const { user: currentUser, fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  async function handleSubmit() {
    if (commentContent.length === 0) {
      await axios.delete(`/comment/deleteComment/${_id}`);
    } else {
      await axios.patch(`/comment/updateComment/${_id}`, {
        content: commentContent,
      });
    }
  }

  return (
    <Card width="60%" height="50%" className="my-4">
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar src={user.userPfp} />
            <Box>
              <Heading size="sm">Display Name</Heading>
              <Text>@{user.username}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        {currentUser?.userId === userId ? (
          <Textarea
            resize="none"
            width="90%"
            height="60px"
            className="overflow-hidden"
            value={commentContent}
            onChange={(evt) => setCommentContent(evt.target.value)}
          />
        ) : (
          <Text>{content}</Text>
        )}
        {currentUser?.userId === userId && (
          <Button
            flex="1"
            variant="ghost"
            rightIcon={<MdDone />}
            width="10%"
            onClick={handleSubmit}
          >
            Edit
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default Comment;
