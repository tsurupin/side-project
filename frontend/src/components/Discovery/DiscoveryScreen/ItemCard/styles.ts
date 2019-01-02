import { StyleSheet, Dimensions } from 'react-native';
import { BORDER_COLOR, SUB_TEXT_COLOR, ACTIVE_MAIN_COLOR } from '../../../../constants/colors';

const windowWidth = Math.trunc(Dimensions.get('window').width);
const windowHeight = Math.trunc(Dimensions.get('window').height);
const width = Math.trunc(windowWidth * 0.9);
const height = Math.trunc(windowHeight * 0.85);

const styles = StyleSheet.create({
  container: {},
  cardContainer: {
    width,
    marginTop: Math.trunc(height * 0.05),
    height: Math.trunc(height * 0.95),
    marginLeft: Math.trunc(windowWidth * 0.05),
    marginRight: Math.trunc(windowWidth * 0.05)
  },
  imageBox: {
    width: '100%',
    height: Math.trunc(height * 0.4),
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR
  },
  contentContainer: {
    height: Math.trunc(height * 0.4),
    width: Math.trunc(width * 0.95),
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  mainTextContainer: {
    height: '100%',
    width: Math.trunc(width * 0.65),
    marginRight: Math.trunc(width * 0.025)
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  subTextContainer: {
    flex: 2
  },
  subText: {
    fontSize: 12,
    color: SUB_TEXT_COLOR
  },

  badgeContainer: {
    width: Math.trunc(width * 0.28),
    marginTop: '15%',
    padding: '6%',
    height: '44%',
    backgroundColor: ACTIVE_MAIN_COLOR
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white'
  },

  divider: {
    height: 1
  },
  leadSentence: {
    paddingTop: Math.trunc(height * 0.01),
    paddingBottom: Math.trunc(height * 0.01),
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 32
  }
});

export default styles;
