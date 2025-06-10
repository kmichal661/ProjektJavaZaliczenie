import { ClientOnly, IconButton, Skeleton, HStack } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/services/AuthenticationContext";
import { CiLogout } from "react-icons/ci";

export function NavBar() {
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate();
  const { authenticated, setToken } = useAuth();
  return (
    <HStack justifyContent="flex-end">
      <ClientOnly fallback={<Skeleton boxSize="8" />}>
        {authenticated && (
          <IconButton
            onClick={() => {
              setToken("");
              navigate("/login");
            }}
          >
            <CiLogout />
          </IconButton>
        )}
        <IconButton onClick={toggleColorMode} variant="outline" size="sm">
          {colorMode === "light" ? <LuSun /> : <LuMoon />}
        </IconButton>
      </ClientOnly>
    </HStack>
  );
}
