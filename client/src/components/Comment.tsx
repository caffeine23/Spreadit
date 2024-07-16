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
} from "@chakra-ui/react";
import { useState } from "react";

export default function Comment() {
  const [isFollowing, setIsFollowing] = useState<boolean>();

  async function followUser() {
    console.log("axios request to follow endpoint");
    setIsFollowing(true);
  }
  async function unfollowUser() {
    console.log("axios request to unfollow endpoint");
    setIsFollowing(false);
  }

  return (
    <Card width="60%" height="50%" className="my-4">
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar src="https://api.dicebear.com/9.x/icons/svg?seed=CommenterAvatar" />

            <Box>
              <Heading size="sm">Display Name</Heading>
              <Text>@username</Text>
            </Box>
          </Flex>
          {isFollowing ? (
            <Button variant="outline" onClick={unfollowUser}>
              Following
            </Button>
          ) : (
            <Button variant="outline" onClick={followUser}>
              Follow
            </Button>
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>The person's comment</Text>
      </CardBody>
    </Card>
  );
}
