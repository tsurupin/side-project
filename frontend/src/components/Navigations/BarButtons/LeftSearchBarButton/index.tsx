import { Button, Icon } from 'react-native-elements';

const SearchNavBarButton = () => {
  return (
    <Button
      icon={<Icon name="filter" />}
      onPress={() => {
        console.log('hogg');
      }}
    />
  );
};

export default SearchNavBarButton;
