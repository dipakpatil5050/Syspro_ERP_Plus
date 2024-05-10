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
    catalogueData: [],
    filterData: null,
    LedgerReport: null,
    SaleReport: null,
    login: Cookies.get('logedIn'),
    loading: false,
    error: null,
    loadedItems: 50,
    // pageSize: 100,
    offsetValue: 0,
    selectedItems: JSON.parse(localStorage.getItem('selectedItems')) || [],
    hasMoreData: true,
    catalogueTotalDataCount: 0,
    totalCateloguePages: 0,
    // subtotal: 0,
    // isLoggedIn: !!JSON.parse(sessionStorage.getItem('userData')),
    // JSON.parse(localStorage.getItem('catalogueData')) || null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload));
    },
    setuserMpinData: (state, action) => {
      state.userMpinData = action.payload;
      localStorage.setItem('userMpinData', JSON.stringify(action.payload));
    },
    setCatalogueData: (state, action) => {
      // console.log(action.payload);
      // state.catalogueData = action.payload;
      const allData = action.payload?.products;
      state.totalCateloguePages = action.payload.TotalPages;
      const totalPages = action.payload.TotalPages;
      state.catalogueData.push(...allData);
      if (state.offsetValue === totalPages) {
        state.hasMoreData = false;
      }
      // localStorage.setItem('catalogueData', JSON.stringify(action.payload));
    },
    setCatalogueDataFiltered: (state, action) => {
      state.catalogueData = action.payload;
      // localStorage.setItem('catalogueData', JSON.stringify(action.payload));
    },
    setCatalogueTotalDataCount: (state, action) => {
      state.catalogueTotalDataCount = action.payload;
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

    selectItem: (state, action) => {
      const { itemId, isChecked } = action.payload;
      const updatedSelectedItems = isChecked
        ? [...state.selectedItems, itemId]
        : state.selectedItems.filter((id) => id !== itemId);
      state.selectedItems = updatedSelectedItems;
      localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
    },

    deselectItem: (state, action) => {
      const { itemId } = action.payload;
      const updatedSelectedItems = state.selectedItems.filter((id) => id !== itemId);
      state.selectedItems = updatedSelectedItems;
      localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
    },
    // setPageSize: (state, action) => {
    //   state.pageSize = action.payload;
    // },
    setOffsetValue: (state, action) => {
      state.offsetValue = action.payload;
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
    // .addCase(cartGetData.fulfilled, (state, action) => {
    //   state.subtotal = action.payload;
    // })
    // .addCase(cartGetData.rejected, (state, action) => {
    //   state.error = action.error.message;
    // });
  },
});

export const {
  setuserMpinData,
  setUserData,
  setCatalogueData,
  setCatalogueDataFiltered,
  setCatalogueTotalDataCount,
  setFilterData,
  setLedgerReport,
  setSaleReport,
  setLoading,
  setLoadedItems,
  selectItem,
  deselectItem,
  // setPageSize,
  setOffsetValue,
  loginBegin,
  loginSuccess,
  loginErr,
  logoutBegin,
  logoutSuccess,
  logoutErr,
} = authSlice.actions;
export default authSlice.reducer;
