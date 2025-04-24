import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/colors';
import {Styles} from '../../../utils/Styles';

export const styles = StyleSheet.create({
  main: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: Colors.black,
    marginLeft: 10,
  },
  icon: {
    borderRadius: 30,
    borderColor: 'transparent',
    ...Styles.shadowDefault,
    padding: 10,
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.grey,
  },
  onSaleStyle: {
    paddingBottom: 30,
  },
  onSaleBGImg: {
    width: 150,
    height: 100,
    padding: 10,
    marginRight: 10,
    ...Styles.shadowDefault,
  },
  saleTag: {
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    ...Styles.shadowDefault,
  },
  saleTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  productStyle: {
    paddingVertical: 30,
  },
  size12: {
    fontSize: 12,
  },
  size18: {
    fontSize: 18,
  },
  grey: {
    color: Colors.grey,
  },
  productBGImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 20,
  },
  productCategoryIcon: {
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 3,
    alignSelf: 'flex-start',
    ...Styles.shadowDefault,
  },
  topRowProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightTopRow: {
    flexDirection: 'row',
    gap: 5,
  },
  rightTopTag: {
    alignSelf: 'flex-end',
    marginTop: 7,
  },
  bottomRowProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  productName: {
    fontWeight: '600',
    color: Colors.white,
    ...Styles.shadowDefault,
  },
  mainProductContainer: {
    padding: 12,
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  currentPageTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  emptyProducts: {
    alignItems: 'center',
    marginTop: 20,
    height: 150,
    gap: 10,
  },
});
