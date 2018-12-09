import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    marginBottom: 20
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    width: '100%'
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 5
  },
  iconContainer: {
    padding: 5,
    width: 30,
    height: 30,
    transform: [{ rotate: '90deg' }]
  }
});

export default styles;
