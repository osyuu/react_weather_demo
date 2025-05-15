import { SettingsIcon } from "@chakra-ui/icons";
import { Button, Icon } from "@chakra-ui/react";

interface SettingButtonProps {
  onClick: () => void;
}

export const SettingButton = ({ onClick }: SettingButtonProps) => {
  return (
    <Button
      colorScheme="blue"
      borderRadius="full"
      size="lg"
      position="fixed"
      bottom={6}
      right={6}
      boxShadow="lg"
      // as={Link}
      // to="settings"
      onClick={onClick}
    >
      <Icon as={SettingsIcon} boxSize={5} />
    </Button>
  );
};
