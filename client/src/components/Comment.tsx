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

export default function Comment() {
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
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          The person's commson's commson's commson's commson's commson's
          commson's commson's commson's commson's commson's commson's commson's
          commson's commson's commson's commson's commson's commson's commson's
          commson's commson's commson's commson's commson's commson's commson's
          commson's commson's commson's comment
        </Text>
      </CardBody>
    </Card>
  );
}
