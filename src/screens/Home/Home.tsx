import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useProducts} from '../../contexts/Products';
import Header from '../../components/Header';
import {calculatePostedAt, categories, getIcon} from '../../utils/utils';
import Tags from '../../components/Tags';
import {Colors} from '../../utils/colors';
import {styles} from './styles/styles';
import {Product} from '../../types/types';

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
          <Tags
            color={Colors.yellowgreen}
            textColor={Colors.white}
            text={'Sale'}
          />
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
            color={
              selectedCategory === category.id ? Colors.lightblue : Colors.grey
            }
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
                  color={Colors.lightblue}
                />
              </View>
              <View>
                <View style={styles.rightTopRow}>
                  <Tags
                    color={Colors.white}
                    textColor={Colors.black}
                    text={`${item.distanceInKm} mi`}
                  />
                  <Tags
                    color={Colors.white}
                    textColor={Colors.black}
                    text={`AU $${item.price}`}
                  />
                </View>
                <View style={styles.rightTopTag}>
                  <Tags
                    color={Colors.yellowgreen}
                    textColor={Colors.white}
                    text={'Sale'}
                  />
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
            color={currentPage === 1 ? Colors.grey : Colors.black}
          />
        </TouchableOpacity>
        <Text style={styles.currentPageTitle}>{currentPage}</Text>
        <TouchableOpacity
          onPress={() => currentPage < 4 && setCurrentPage(currentPage + 1)}>
          <Icon
            size={30}
            name="arrow-right-box"
            color={currentPage === 4 ? Colors.grey : Colors.black}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderProductsEmpty = () => {
    return (
      <View style={styles.emptyProducts}>
        <Icon name="alert-circle" size={50} color={Colors.yellowgreen} />
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
          color={Colors.grey}
        />
        {_renderOnsaleProducts()}
        {_renderCategories()}
        {_renderProducts()}
      </ScrollView>
    </SafeAreaView>
  );
}
