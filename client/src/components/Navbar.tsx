import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  Stack,
  useColorMode,
  Center,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import useUserStore from "../context/UserContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link to={"/"}>
            <Box>
              <Heading size={"md"}>𝕊𝕡𝕣𝕖𝕒𝕕𝕚𝕥</Heading>
            </Box>
          </Link>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={user?.pfp} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Link to="/profile">
                      <Avatar size={"2xl"} src={user?.pfp} />
                    </Link>
                  </Center>
                  <br />
                  <Center>
                    <Link to="/profile">
                      <Heading size="md">@{user?.username}</Heading>
                    </Link>
                  </Center>
                  <br />
                  <MenuDivider />
                  <Center>
                    <Button variant={"ghost"} onClick={logout}>
                      Logout
                    </Button>
                  </Center>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
