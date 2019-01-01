import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND_COLOR, WHITE_COLOR, BORDER_COLOR, MAIN_TEXT_COLOR, ACTIVE_MAIN_COLOR } from '../../../constants/colors';
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    height,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15
  },
  inputTextContainer: {
    borderColor: BORDER_COLOR,
    backgroundColor: WHITE_COLOR,
    padding: 10
  },
  inputText: {
    color: MAIN_TEXT_COLOR,
    fontSize: 16,
    paddingRight: 5
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    height: 48,
    width: 200,
    backgroundColor: ACTIVE_MAIN_COLOR
  },
  buttonTitle: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default styles;
