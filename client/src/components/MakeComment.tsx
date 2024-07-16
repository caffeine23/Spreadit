import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { MdDone } from "react-icons/md";
import { useState, useEffect } from "react";
import useUserStore from "../context/UserContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MakeCommentProps {
  postId: string;
}

const MakeComment: React.FC<MakeCommentProps> = ({ postId }) => {
  const [content, setContent] = useState("");
  async function handleSubmit() {
    await axios.post("/comment/createComment", {
      userId: user?.userId,
      postId: postId,
      content: content,
    });
    toast.success("Comment successful.");
    setContent("");
  }
  const { user, fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <Card width="60%" height="50%">
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar src={user?.pfp} />
              <Box>
                <Heading size="sm">{user?.username}</Heading>
                <Text>@{user?.username}</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Textarea
            placeholder="Say something"
            resize="none"
            width="90%"
            height="60px"
            className="overflow-hidden"
            value={content}
            onChange={(evt) => setContent(evt.target.value)}
          />
          <Button
            flex="1"
            variant="ghost"
            rightIcon={<MdDone />}
            width="10%"
            onClick={handleSubmit}
          >
            Reply
          </Button>
        </CardBody>
      </Card>
    </>
  );
};

export default MakeComment;
