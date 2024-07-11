import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// login action
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password, mPin, ServerBaseUrl, navigate, dispatch, setUserData }) => {
    const loginUrl = `${ServerBaseUrl}api/Static/UserLogin`;

    const body = {
      UserName: username,
      Password: password,
      IsRemeber: true,
      DeviceId: '',
    };

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': mPin,
    };
    try {
      const response = await axios.post(loginUrl, body, { headers });
      const userData = response.data;
      const Token = userData?.Data?.Token;

      Cookies.set('access_token', Token);
      Cookies.set('logedIn', true);
      dispatch(setUserData(userData));
      navigate('/admin');
      toast.success('Login successful!');
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.Message || 'An error occurred while logging in.';
      // eslint-disable-next-line
      console.error('Error logging in:', error);
      toast.error(errorMessage);
      throw error;
    }
  },
);

// Thunk for logout action

export const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    Cookies.remove('logedIn');
    Cookies.remove('access_token');
    return true;
  } catch (err) {
    return err.message;
  }
});

// cartGetData functionality
// export const cartGetData = createAsyncThunk('auth/cartGetData', async (_, { getState }) => {
//   const { cartItems } = getState().auth;
//   const subtotal = cartItems.reduce((total, item) => {
//     return total + item.price * item.quantity;
//   }, 0);
//   return subtotal;
// });

// Slice definition
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: JSON.parse(localStorage.getItem('userData')) || null,
    userMpinData: JSON.parse(localStorage.getItem('userMpinData')) || null,
    catalogueData: [], // JSON.parse(localStorage.getItem('catalogueData')) ||
    // filteredCatalogueData: [],
    filterData: [],
    LedgerReport: null,
    SaleReport: null,
    login: Cookies.get('logedIn'),
    loading: false,
    error: null,
    loadedItems: 50,
    offsetValue: 0,
    hasMoreData: true,
    catalogueTotalDataCount: 0,
    totalCataloguePages: 0,
    singleProduct: [],
    itemList: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload));
    },
    setuserMpinData: (state, action) => {
      state.userMpinData = action.payload;
      localStorage.setItem('userMpinData', JSON.stringify(action.payload));
      localStorage.setItem('SlugUrl', JSON.stringify(action.payload?.Data.SlugUrl));
    },
    setCatalogueData: (state, action) => {
      const allData = action.payload;
      state.catalogueData.push(...allData);

      const hasCatalogueData = action.payload;
      console.log('hasCatalogueData : ', hasCatalogueData);
      if (hasCatalogueData === undefined || hasCatalogueData.length == 0) {
        state.hasMoreData = false;
      }

      // localStorage.setItem('catalogueData', JSON.stringify(state.catalogueData.push(...allData)));
    },

    // setCatalogueData: (state, action) => {
    //   const allData = action.payload;
    //   allData.forEach((product) => {
    //     const productExists = state.catalogueData.find((item) => item.Item_Id === product.id);
    //     if (!productExists) {
    //       state.catalogueData.push(product);
    //     }
    //   });
    // },

    setError: (state, action) => {
      state.error = action.payload;
    },
    setClearFilter: (state) => {
      state.catalogueData = [];
    },

    setCatalogueDataFiltered: (state, action) => {
      state.catalogueData = action.payload;
      // localStorage.setItem('catalogueData', JSON.stringify(action.payload));
    },
    filterByPriceRange(state, action) {
      const [minPrice, maxPrice] = action.payload;
      state.catalogueData = state.catalogueData.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice,
      );
    },
    setTotalCataloguePages: (state, action) => {
      state.totalCataloguePages = action.payload;
      const totalPages = action.payload;
      if (state.offsetValue === totalPages) {
        state.hasMoreData = false; // hasMoreData Should be False when All data fetch
      }
    },

    setCatalogueTotalDataCount: (state, action) => {
      state.catalogueTotalDataCount = action.payload;
      // if (state.catalogueTotalDataCount  state.catalogueData.length) {
      // }
    },

    setSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    setLedgerReport: (state, action) => {
      state.LedgerReport = action.payload;
    },
    setSaleReport: (state, action) => {
      state.SaleReport = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadedItems: (state, action) => {
      state.loadedItems = action.payload;
    },

    setOffsetValue: (state, action) => {
      state.offsetValue = action.payload;
    },

    setHasmoreData: (state, action) => {
      state.hasMoreData = action.payload;
    },

    loginBegin: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.login = action.payload;
      state.loading = false;
    },

    loginErr: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    logoutBegin: (state) => {
      state.loading = true;
    },

    logoutSuccess: (state, action) => {
      state.login = action.payload;
      state.loading = false;
    },

    logoutErr: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    setItemList: (state, { payload }) => {
      state.itemList = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload === true) {
          state.login = true;
        } else {
          state.error = action.payload;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.loading = false;
        state.login = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setuserMpinData,
  setUserData,
  setCatalogueData,
  setCatalogueDataFiltered,
  setTotalCataloguePages,
  setCatalogueTotalDataCount,
  setSingleProduct,
  setFilterData,
  setClearFilter,
  setLedgerReport,
  setSaleReport,
  setLoading,
  setLoadedItems,
  setError,
  // setPageSize,
  setHasmoreData,
  setOffsetValue,
  loginBegin,
  loginSuccess,
  loginErr,
  logoutBegin,
  logoutSuccess,
  logoutErr,
  setItemList,
} = authSlice.actions;
export default authSlice.reducer;
