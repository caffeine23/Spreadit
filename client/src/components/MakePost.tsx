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
import { MdDone } from "react-icons/md";
import { useState, useEffect } from "react";
import useUserStore from "../context/UserContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MakePost() {
  const [content, setContent] = useState("");
  async function handleSubmit() {
    await axios.post("/post/createPost", {
      userId: user?.userId,
      content: content,
    });
    toast.success("Post successful.");
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
      <Card maxW="md">
        <CardHeader>
          <Flex gap="4">
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
            className="overflow-hidden"
            value={content}
            onChange={(evt) => setContent(evt.target.value)}
          />
        </CardBody>

        <CardFooter>
          <Button
            flex="1"
            variant="ghost"
            rightIcon={<MdDone />}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
