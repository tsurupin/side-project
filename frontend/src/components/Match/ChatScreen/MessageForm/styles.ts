import { StyleSheet, Dimensions } from 'react-native';
import { ACTIVE_MAIN_COLOR } from '../../../../constants/colors';
const width = Math.trunc(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',

    backgroundColor: 'grey'
  },
  iconContainer: {},
  icon: {
    width: 40,
    height: 40
  },
  inputContainer: {
    height: 36,
    width: Math.trunc((width - 56) * 0.75),
    padding: 0,
    marginLeft: 5,
    marginRight: 10,
    borderWidth: 0
  },
  inputInnerContainer: {
    height: '100%',
    borderWidth: 0,
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 5
  },
  input: {
    fontSize: 16
  },
  buttonContainer: {
    height: 36,
    width: Math.trunc((width - 56) * 0.22),
    paddingRight: 10
  },
  buttonTitle: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  button: {
    height: 36,
    backgroundColor: ACTIVE_MAIN_COLOR
  },
  buttonDisabled: {
    opacity: 0.2
  }
});

export default styles;
