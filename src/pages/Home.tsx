// import { List, ListItem } from '@mui/joy';
import { useRecoilValue } from 'recoil';

import { tokenState } from '@atoms/auth';
import Calendar from '@components/Calendar';

const Home = () => {
  const token = useRecoilValue(tokenState);
  const keys = [...Object.keys(token)];

  return (
    // <List>
    //   {keys.map((key) => (
    //     <ListItem>
    //       <span>{key}</span>
    //       <span>{token[key]}</span>
    //     </ListItem>
    //   ))}
    // </List>
    <Calendar />
  );
};

export default Home;
