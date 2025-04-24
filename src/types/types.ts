export type Category = {
  id: Product['category'];
  name: string;
  icon: string;
};

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Garden' | 'Clothing' | 'Household' | null;
  distanceInKm: number;
  postedAt: string;
  dealType: 'SALE' | 'REGULAR';
  imageUrl: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
