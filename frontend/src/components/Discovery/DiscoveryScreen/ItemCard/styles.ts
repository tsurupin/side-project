import { Dimensions, StyleSheet } from 'react-native';
import { ActiveMainColor, BorderColor, SubTextColor } from '../../../../constants/colors';
const windowWidth = Math.trunc(Dimensions.get('window').width);
const windowHeight = Math.trunc(Dimensions.get('window').height);
const width = Math.trunc(windowWidth * 0.90);
const height = Math.trunc(windowHeight * 0.85);
console.log(height);
const styles = StyleSheet.create({
  container: {

  },
  cardContainer: {
    width,
    marginTop: Math.trunc(height * 0.05),
    height: Math.trunc(height * 0.95),
    marginLeft: Math.trunc(windowWidth * 0.05),
    marginRight: Math.trunc(windowWidth * 0.05),
  },
  imageBox: {
    width: '100%',
    height:  Math.trunc(height * 0.4),
    borderBottomWidth: 1,
    borderColor: BorderColor,
  },
  contentContainer: {
    height:  Math.trunc(height * 0.4),
    width: Math.trunc(width * 0.95),
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',

  },
  mainTextContainer: {
    height:  '100%',
    width: Math.trunc(width * 0.65),
    marginRight: Math.trunc(width * 0.025),
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  subTextContainer: {
    flex: 2,
  },
  subText: {
    fontSize: 12,
    color: SubTextColor,
  },

  badgeContainer: {
    width: Math.trunc(width * 0.25),
    marginTop:  '15%',
    padding: '10%',
    height:  '50%',
    backgroundColor: ActiveMainColor,
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
  },

  divider: {
    height: 1,
  },
  leadSentence: {
    paddingTop:  Math.trunc(height * 0.01),
    paddingBottom:  Math.trunc(height * 0.01),
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 32,
  },

});

export default styles;
