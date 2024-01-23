import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Input from '@mui/joy/Input';

const SearchBar = () => (
  <Input
    size="sm"
    startDecorator={<SearchRoundedIcon />}
    placeholder="Search"
  />
);

export default SearchBar;
