import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

interface User {
  _id: string;
  username: string;
  userPfp: string;
}

interface CommentProps {
  _id: string;
  content: string;
  user: User;
}

const Comment: React.FC<CommentProps> = ({ content, user, _id }) => {
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
        <Text>{content}</Text>
      </CardBody>
    </Card>
  );
};

export default Comment;
