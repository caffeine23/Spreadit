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

export default function PostBody() {
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
    <Card>
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar src="https://api.dicebear.com/9.x/icons/svg?seed=AvatarOfThePoster" />

            <Box>
              <Heading size="sm">Display Name</Heading>
              <Text>@username</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>Whatever the person has to say</Text>
      </CardBody>
      <CardFooter justify="space-between" flexWrap="wrap">
        {isPostLiked ? (
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<FcLike />}
            onClick={unlikePost}
          >
            #
          </Button>
        ) : (
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<FaHeart />}
            onClick={likePost}
          >
            #
          </Button>
        )}
        <Button flex="1" variant="ghost" leftIcon={<FaRegComment />}>
          #
        </Button>
      </CardFooter>
    </Card>
  );
}
