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

export default function MakeComment() {
  return (
    <>
      <Card width="60%" height="50%">
        <CardHeader>
          <Flex>
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
            width="90%"
            height="60px"
            className="overflow-hidden"
          />
          <Button flex="1" variant="ghost" rightIcon={<MdDone />} width="10%">
            Reply
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
