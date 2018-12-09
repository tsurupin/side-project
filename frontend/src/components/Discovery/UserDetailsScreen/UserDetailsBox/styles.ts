import { StyleSheet, Dimensions } from 'react-native';
import { DetailTextColor, ActiveMainColor, DividerColor, BackgroundColor } from '../../../../constants/colors';
const width = Math.trunc(Dimensions.get('window').width);
const windowHeight = Math.trunc(Dimensions.get('window').height);
const height = Math.trunc(windowHeight * 0.85);

const styles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColor
  },
  scrollContainer: {
    color: DetailTextColor,
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
    color: DetailTextColor
  },

  subText: {
    marginTop: 5,
    fontSize: 16,
    color: DetailTextColor
  },

  badgeContainer: {
    width: Math.trunc(width * 0.25),
    marginTop: '15%',
    padding: '10%',
    height: '54%',
    backgroundColor: ActiveMainColor
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white'
  },

  divider: {
    height: 1,
    color: DividerColor
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
    justifyContent: 'center'
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12
  }
});

export default styles;
