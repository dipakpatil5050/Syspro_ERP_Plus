import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCatalogueData,
  setCatalogueTotalDataCount,
  setFilterData,
  setLoading,
  setTotalCataloguePages,
} from '../redux/reducers/authReducer';

const dispatch = useDispatch();
const { userMpinData, userData, offsetValue } = useSelector((state) => state.auth);

const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;
const mPin = userMpinData?.Data?.mPin;
const SlugUrl = userMpinData?.Data?.SlugUrl;

const userheaderdata = userData?.Data;
const Companyid = userheaderdata?.CompanyID;
const YearMasterid = userheaderdata?.YearMasterID;
const Premiseid = userheaderdata?.PremiseID;
const Departmentid = userheaderdata?.DepartmentID;
const Userid = userheaderdata?.UserID;

const catalogueService = {
  async getProducts(filterString) {
    const CatalogueAPI = `${ServerBaseUrl}api/CommonAPI/FilterProducts`;

    const body = {
      ReportId: 0,
      FromDate: '',
      UptoDate: '',
      FilterString: filterString,
      OffsetValue: offsetValue,
      PageSize: 100,
      OrderByColumn: 'i.Item_id Desc',
      LinkId: 0,
    };

    const headers = {
      'Content-Type': 'application/json',
      CompanyID: Companyid,
      YearMasterID: YearMasterid,
      PremiseID: Premiseid,
      DepartmentID: Departmentid,
      UserID: Userid,
      client: SlugUrl,
      'x-api-key': mPin,
    };
    try {
      dispatch(setLoading(true));
      const response = await axios.post(CatalogueAPI, body, { headers });
      const CatalogueDataFromAPI = response?.data?.Data;
      const productsData = CatalogueDataFromAPI?.products;
      const filteredData = CatalogueDataFromAPI?.filters;
      const FilterTotalCount = CatalogueDataFromAPI?.FilterTotalCount;
      const TotalPages = CatalogueDataFromAPI?.TotalPages;
      dispatch(setCatalogueData(productsData));
      dispatch(setFilterData(filteredData));
      dispatch(setTotalCataloguePages(TotalPages));
      dispatch(setCatalogueTotalDataCount(FilterTotalCount));
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error in Catalogue data fetching:', error);
      toast.error('Error in fetching catalogue report data from API Server.');
    } finally {
      dispatch(setLoading(false));
    }
  },
};
export default catalogueService;
