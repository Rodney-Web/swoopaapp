import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {api, Product} from '../api/api';

type ProductsContextType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  refreshing: boolean;
  handleRefresh: () => void;
  onSaleProducts: Product[];
  selectedCategory: Product['category'] | null;
  currentPage: number;
  setSelectedCategory: (category: Product['category'] | null) => void;
  setCurrentPage: (page: number) => void;
  loading: boolean;
};
const initialState: ProductsContextType = {
  products: [],
  setProducts: () => {},
  currentPage: 1,
  refreshing: false,
  handleRefresh: () => {},
  onSaleProducts: [],
  selectedCategory: null,
  setSelectedCategory: () => {},
  setCurrentPage: () => {},
  loading: false,
};

const ProductsContext = createContext(initialState);

export const ProductsProvider = ({...rest}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [onSaleProducts, setOnSaleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<
    Product['category'] | null
  >(null);

  const fetchProducts = useCallback(
    async (reset?: boolean) => {
      setLoading(true);
      try {
        const response = await api.getProducts({
          page: reset ? 1 : currentPage,
          category: selectedCategory,
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [currentPage, selectedCategory],
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const fetchOnsaleProducts = async () => {
      try {
        const response = await api.getOnsaleProducts();
        setOnSaleProducts(response);
      } catch (error) {
        console.error('Error fetching on sale products:', error);
      }
    };
    fetchOnsaleProducts();
  }, []);

  // Pull-to-refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProducts(true); // Refresh from the first page
  }, [fetchProducts]);

  const value = useMemo(
    () => ({
      products,
      refreshing,
      currentPage,
      onSaleProducts,
      selectedCategory,
      setProducts,
      setCurrentPage,
      setSelectedCategory,
      handleRefresh,
      loading,
    }),
    [
      products,
      refreshing,
      currentPage,
      onSaleProducts,
      selectedCategory,
      setProducts,
      setCurrentPage,
      setSelectedCategory,
      handleRefresh,
      loading,
    ],
  );
  return <ProductsContext.Provider value={value} {...rest} />;
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
