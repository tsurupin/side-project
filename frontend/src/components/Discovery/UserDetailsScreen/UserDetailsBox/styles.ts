import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND_COLOR, DETAIL_TEXT_COLOR, ACTIVE_MAIN_COLOR, DIVIDER_COLOR } from '../../../../constants/colors';
const width = Math.trunc(Dimensions.get('window').width);
const windowHeight = Math.trunc(Dimensions.get('window').height);
const height = Math.trunc(windowHeight * 0.85);

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR
  },
  scrollContainer: {
    color: DETAIL_TEXT_COLOR,
    backgroundColor: 'white'
  },

  carouselWrapper: {
    height: Math.trunc(height * 0.4)
  },

  contentContainer: {
    width: Math.trunc(width * 0.92),
    marginLeft: Math.trunc(width * 0.04),
    marginRight: Math.trunc(width * 0.04)
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 70
  },

  mainTextContainer: {
    height: '100%',
    width: Math.trunc(width * 0.65),
    marginTop: 10,
    marginRight: Math.trunc(width * 0.025)
  },

  titleText: {
    fontSize: 16,
    color: DETAIL_TEXT_COLOR
  },

  subText: {
    marginTop: 5,
    fontSize: 16,
    color: DETAIL_TEXT_COLOR
  },

  badgeContainer: {
    width: Math.trunc(width * 0.25),
    marginTop: '15%',
    padding: '10%',
    height: '54%',
    backgroundColor: ACTIVE_MAIN_COLOR
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white'
  },

  divider: {
    height: 1,
    borderColor: DIVIDER_COLOR
  },
  detailsContainer: {
    marginTop: Math.trunc(height * 0.03),
    marginBottom: Math.trunc(height * 0.03)
  },

  responseLikeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Math.trunc(width * 0.46),
    marginLeft: Math.trunc(width * 0.2),
    marginRight: Math.trunc(width * 0.2),
    marginBottom: 50
  },
  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12
  }
});

export default styles;
