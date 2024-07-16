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
import { useState } from "react";

export default function MakePost() {
  const [content, setContent] = useState("");
  async function handleSubmit() {
    console.log(content);
    setContent("");
  }
  return (
    <>
      <Card maxW="md">
        <CardHeader>
          <Flex gap="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar src="https://api.dicebear.com/9.x/icons/svg?seed=TemporaryAvatar" />

              <Box>
                <Heading size="sm">Display Name</Heading>
                <Text>@username</Text>
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
