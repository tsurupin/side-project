import { StyleSheet, Dimensions } from 'react-native';
import {
  DetailTextColor,
  DetailLabelColor,
  ActiveMainColor,
  DividerColor,
  BackgroundColor
} from '../../../../constants/colors';

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
    marginTop: 10,
    maxWidth: Math.trunc(width * 0.65),
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
    maxWidth: Math.trunc(width * 0.25),
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

  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DetailLabelColor,
    marginBottom: 5
  },
  mainText: {
    fontSize: 16
  },

  ownerWrapper: {},
  responseLikeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: Math.trunc(width * 0.25),
    marginRight: Math.trunc(width * 0.25)
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
  },

  userListWrapper: {
    marginTop: 20,
    marginBottom: 30
  },
  userListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20,
    width: '100%'
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 5
  },
  userListIconContainer: {
    padding: 5,
    width: 30,
    height: 30,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 15,
    transform: [{ rotate: '90deg' }]
  }
});

export default styles;
