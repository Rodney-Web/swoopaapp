import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useProducts} from '../../contexts/Products';
import {Product} from '../../api/api';
import Header from '../../components/Header';
import {calculatePostedAt, categories, getIcon} from '../../utils/utils';
import Tags from '../../components/Tags';

export type Category = {
  id: Product['category'];
  name: string;
  icon: string;
};

export default function Home() {
  const {
    products,
    onSaleProducts,
    selectedCategory,
    refreshing,
    currentPage,
    setCurrentPage,
    handleRefresh,
    setSelectedCategory,
  } = useProducts();

  const renderOnsaleItem = ({item}: {item: Product}) => {
    return (
      <TouchableOpacity>
        <ImageBackground
          source={{uri: item.imageUrl}}
          borderRadius={4}
          style={styles.onSaleBGImg}>
          <Tags color="yellowgreen" textColor="#fff" text={'Sale'} />
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const _renderOnsaleProducts = () => {
    return (
      <>
        <Header
          name="fire"
          color="red"
          size={40}
          title="Hot Sale"
          fontSize={20}
        />
        <FlatList
          data={onSaleProducts}
          keyExtractor={item => item.id}
          renderItem={renderOnsaleItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.onSaleStyle}
        />
      </>
    );
  };

  const _renderCategories = () => {
    const rows = categories.map(category => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setSelectedCategory(category.id);
          setCurrentPage(1);
        }}
        key={category.id}
        style={styles.categoryContainer}>
        <View style={[styles.icon]}>
          <Icon
            name={category.icon}
            size={35}
            color={selectedCategory === category.id ? '#339cff' : 'grey'}
          />
        </View>
        <Text style={styles.categoryName}>{category.name}</Text>
      </TouchableOpacity>
    ));

    return <View style={styles.categoriesContainer}>{rows}</View>;
  };

  const renderProductsItem = ({item}: {item: Product}) => {
    return (
      <TouchableOpacity>
        <ImageBackground
          source={{uri: item.imageUrl}}
          borderRadius={8}
          style={styles.productBGImage}>
          <View style={styles.mainProductContainer}>
            <View style={styles.topRowProduct}>
              <View style={styles.productCategoryIcon}>
                <Icon
                  name={getIcon(item.category)}
                  size={20}
                  color={'#339cff'}
                />
              </View>
              <View>
                <View style={styles.rightTopRow}>
                  <Tags
                    color="#fff"
                    textColor="#000"
                    text={`${item.distanceInKm} mi`}
                  />
                  <Tags
                    color="#fff"
                    textColor="#000"
                    text={`AU $${item.price}`}
                  />
                </View>
                <View style={styles.rightTopTag}>
                  <Tags color="yellowgreen" textColor="#fff" text={'Sale'} />
                </View>
              </View>
            </View>
            <View style={styles.bottomRowProduct}>
              <Text style={[styles.productName, styles.size18]}>
                {item.name.length > 20
                  ? `${item.name.slice(0, 20)}...`
                  : item.name}
              </Text>
              <Text style={[styles.productName, styles.size12]}>
                {calculatePostedAt(item.postedAt)}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderProductsFooter = () => {
    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
          <Icon
            size={30}
            name="arrow-left-box"
            color={currentPage === 1 ? 'grey' : '#000'}
          />
        </TouchableOpacity>
        <Text style={styles.currentPageTitle}>{currentPage}</Text>
        <TouchableOpacity
          onPress={() => currentPage < 4 && setCurrentPage(currentPage + 1)}>
          <Icon
            size={30}
            name="arrow-right-box"
            color={currentPage === 4 ? 'grey' : '#000'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderProductsEmpty = () => {
    return (
      <View style={styles.emptyProducts}>
        <Icon name="alert-circle" size={50} color="yellowgreen" />
        <Text style={[styles.size18, styles.grey]}>
          No more products available
        </Text>
      </View>
    );
  };

  const _renderProducts = () => {
    return (
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderProductsItem}
        showsVerticalScrollIndicator={false}
        style={styles.productStyle}
        ListFooterComponent={renderProductsFooter}
        ListEmptyComponent={renderProductsEmpty}
      />
    );
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.main}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <Header
          fontSize={25}
          name="hand-wave"
          title="Marketplace"
          size={40}
          color="grey"
        />
        {_renderOnsaleProducts()}
        {_renderCategories()}
        {_renderProducts()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    color: '#000',
    marginLeft: 10,
  },
  icon: {
    borderRadius: 30,
    shadowColor: '#000',
    borderColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
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
    color: 'grey',
  },
  onSaleStyle: {
    paddingBottom: 30,
  },
  onSaleBGImg: {
    width: 150,
    height: 100,
    padding: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saleTag: {
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    color: 'grey',
  },
  productBGImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 20,
  },
  productCategoryIcon: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 3,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
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
