import { StyleSheet, Dimensions } from 'react-native';
const width = Math.trunc(Dimensions.get('window').width);
const windowHeight = Math.trunc(Dimensions.get('window').height);
const height = Math.trunc(windowHeight * 0.85);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  userImageContainer: {
    width: 36,
    marginRight: 10
  },
  avatarContainer: {},
  avatar: {},
  mainContainer: {
    width: Math.trunc(width - 66)
  },
  header: {
    flexDirection: 'row',
    marginBottom: 5
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  subText: {
    fontSize: 12,
    color: 'grey',
    marginLeft: 5,
    marginTop: 2
  },
  body: {},
  description: {
    fontSize: 16
  }
});

export default styles;
