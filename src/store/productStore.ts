import { create } from 'zustand';
import products from '../mock/products';

// 定义商品类型
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  sales: number;
  stock: number;
  description: string;
  images: string[];
  tags: string[];
  specs: {
    size: string[];
    color: string[];
  };
}

// 定义筛选条件类型
interface Filter {
  category: string;
  minPrice: number;
  maxPrice: number;
}

// 定义排序类型
type SortType = 'price-asc' | 'price-desc' | 'sales';

// 定义购物车商品类型
interface CartItem {
  product: Product;
  quantity: number;
  selectedSpecs: {
    size: string;
    color: string;
  };
}

// 定义状态类型
interface ProductState {
  // 商品列表
  products: Product[];
  filteredProducts: Product[];

  // 筛选条件
  filter: Filter;
  setFilter: (filter: Partial<Filter>) => void;
  resetFilter: () => void;

  // 排序条件
  sortType: SortType;
  setSortType: (sortType: SortType) => void;

  // 分页信息
  currentPage: number;
  pageSize: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  totalPages: number;

  // 购物车
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, selectedSpecs: { size: string; color: string }) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;

  // 筛选和排序方法
  applyFilters: () => void;
  getProductById: (id: number) => Product | undefined;
}

// 创建store
const useProductStore = create<ProductState>((set, get) => {
  const initialFilter = { category: '', minPrice: 0, maxPrice: 2000 };
  const initialSortType: SortType = 'price-asc';
  const initialPageSize = 12;

  // 直接初始化筛选后的商品列表
  let initialFilteredProducts = [...products];

  // 应用初始筛选条件
  if (initialFilter.category) {
    initialFilteredProducts = initialFilteredProducts.filter(p => p.category === initialFilter.category);
  }
  if (initialFilter.minPrice > 0) {
    initialFilteredProducts = initialFilteredProducts.filter(p => p.price >= initialFilter.minPrice);
  }
  if (initialFilter.maxPrice < 2000) {
    initialFilteredProducts = initialFilteredProducts.filter(p => p.price <= initialFilter.maxPrice);
  }

  // 应用初始排序
  if (initialSortType === 'price-asc') {
    initialFilteredProducts.sort((a, b) => a.price - b.price);
  } else if (initialSortType === 'price-desc') {
    initialFilteredProducts.sort((a, b) => b.price - a.price);
  } else if (initialSortType === 'sales') {
    initialFilteredProducts.sort((a, b) => b.sales - a.sales);
  }

  return {
    // 商品列表
    products,
    filteredProducts: initialFilteredProducts,

    // 筛选条件
    filter: initialFilter,
    setFilter: (newFilter) => {
      set(state => ({ filter: { ...state.filter, ...newFilter } }));
      get().applyFilters();
    },
    resetFilter: () => {
      set({ filter: initialFilter });
      get().applyFilters();
    },

    // 排序条件
    sortType: initialSortType,
    setSortType: (sortType) => {
      set({ sortType });
      get().applyFilters();
    },

    // 分页信息
    currentPage: 1,
    pageSize: initialPageSize,
    setCurrentPage: (page) => set({ currentPage: page }),
    setPageSize: (size) => set({ pageSize: size }),
    totalPages: Math.ceil(initialFilteredProducts.length / initialPageSize),

    // 购物车
    cart: [],
    addToCart: (product, quantity, selectedSpecs) => {
      set(state => {
        const existingItemIndex = state.cart.findIndex(item => item.product.id === product.id);
        let newCart;

        if (existingItemIndex >= 0) {
          // 商品已存在，更新数量
          newCart = [...state.cart];
          newCart[existingItemIndex].quantity += quantity;
        } else {
          // 商品不存在，添加新商品
          newCart = [...state.cart, { product, quantity, selectedSpecs }];
        }

        return { cart: newCart };
      });
    },
    removeFromCart: (productId) => {
      set(state => ({ cart: state.cart.filter(item => item.product.id !== productId) }));
    },
    updateQuantity: (productId, quantity) => {
      set(state => {
        const newCart = [...state.cart];
        const itemIndex = newCart.findIndex(item => item.product.id === productId);
        if (itemIndex >= 0) {
          newCart[itemIndex].quantity = quantity;
        }
        return { cart: newCart };
      });
    },

    // 筛选和排序方法
    applyFilters: () => {
      let filtered = [...get().products];
      const { filter, sortType } = get();

      // 应用筛选条件
      if (filter.category) {
        filtered = filtered.filter(p => p.category === filter.category);
      }
      if (filter.minPrice > 0) {
        filtered = filtered.filter(p => p.price >= filter.minPrice);
      }
      if (filter.maxPrice < 2000) {
        filtered = filtered.filter(p => p.price <= filter.maxPrice);
      }

      // 应用排序
      switch (sortType) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'sales':
          filtered.sort((a, b) => b.sales - a.sales);
          break;
      }

      const totalPages = Math.ceil(filtered.length / get().pageSize);
      set({ filteredProducts: filtered, totalPages, currentPage: 1 });
    },

    // 根据ID获取商品
    getProductById: (id) => {
      return get().products.find(p => p.id === id);
    }
  };
});

export default useProductStore;