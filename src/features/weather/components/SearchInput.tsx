import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

interface SearchInputProps {
  value: string;
  onChange: (city: string) => void;
  onSearch: () => void | Promise<void>;
}

export const SearchInput = ({
  value,
  onChange,
  onSearch,
}: SearchInputProps) => {
  return (
    <InputGroup flex={1}>
      <Input
        placeholder="Enter city"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search city"
          icon={<SearchIcon />}
          onClick={onSearch}
        />
      </InputRightElement>
    </InputGroup>
  );
};
