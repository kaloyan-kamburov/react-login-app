export const API_URL = 'http://localhost:8080'

/* action types */
/* user action types */
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';

export const USER_SET_DATA_REQUEST = 'USER_SET_DATA_REQUEST';
export const USER_SET_DATA_SUCCESS = 'USER_SET_DATA_SUCCESS';
export const USER_SET_DATA_ERROR = 'USER_SET_DATA_ERROR';

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_ERROR = 'USER_UPDATE_ERROR';

export const USER_CHANGE_PASSWORD_REQUEST = 'USER_CHANGE_PASSWORD_REQUEST';
export const USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS';
export const USER_CHANGE_PASSWORD_ERROR = 'USER_CHANGE_PASSWORD_ERROR';

export const USER_ADD_PRODUCT_TO_CART_REQUEST = 'USER_ADD_PRODUCT_TO_CART_REQUEST';
export const USER_ADD_PRODUCT_TO_CART_SUCCESS = 'USER_ADD_PRODUCT_TO_CART_SUCCESS';
export const USER_ADD_PRODUCT_TO_CART_ERROR = 'USER_ADD_PRODUCT_TO_CART_ERROR';

export const USER_REMOVE_PRODUCT_FROM_CART_REQUEST = 'USER_REMOVE_PRODUCT_FROM_CART_REQUEST';
export const USER_REMOVE_PRODUCT_FROM_CART_SUCCESS = 'USER_REMOVE_PRODUCT_FROM_CART_SUCCESS';
export const USER_REMOVE_PRODUCT_FROM_CART_ERROR = 'USER_REMOVE_PRODUCT_FROM_CART_ERROR';

export const USER_DECREMENT_PRODUCT_QUANTITY_REQUEST = 'USER_DECREMENT_PRODUCT_QUANTITY_REQUEST';
export const USER_DECREMENT_PRODUCT_QUANTITY_SUCCESS = 'USER_DECREMENT_PRODUCT_QUANTITY_SUCCESS';
export const USER_DECREMENT_PRODUCT_QUANTITY_ERROR = 'USER_DECREMENT_PRODUCT_QUANTITY_ERROR';

/* admin action types */
export const ADMIN_GET_ALL_USERS_REQUEST = 'ADMIN_GET_ALL_USERS_REQUEST';
export const ADMIN_GET_ALL_USERS_SUCCESS = 'ADMIN_GET_ALL_USERS_SUCCESS';
export const ADMIN_GET_ALL_USERS_ERROR = 'ADMIN_GET_ALL_USERS_ERROR';

export const ADMIN_GET_USER_REQUEST = 'ADMIN_GET_USER_REQUEST';
export const ADMIN_GET_USER_SUCCESS = 'ADMIN_GET_USER_SUCCESS';
export const ADMIN_GET_USER_ERROR = 'ADMIN_GET_USER_ERROR';

export const ADMIN_UPDATE_INFO_REQUEST = 'ADMIN_UPDATE_INFO_REQUEST';
export const ADMIN_UPDATE_INFO_SUCCESS = 'ADMIN_UPDATE_INFO_SUCCESS';
export const ADMIN_UPDATE_INFO_ERROR = 'ADMIN_UPDATE_INFO_ERROR';

export const ADMIN_UPDATE_USER_REQUEST = 'ADMIN_UPDATE_USER_REQUEST';
export const ADMIN_UPDATE_USER_SUCCESS = 'ADMIN_UPDATE_USER_SUCCESS';
export const ADMIN_UPDATE_USER_ERROR = 'ADMIN_UPDATE_USER_ERROR';

export const ADMIN_SEARCH_USERS_REQUEST = 'ADMIN_SEARCH_USERS_REQUEST';
export const ADMIN_SEARCH_USERS_SUCESS = 'ADMIN_SEARCH_USERS_SUCESS';
export const ADMIN_SEARCH_USERS_ERROR = 'ADMIN_SEARCH_USERS_ERROR';

export const ADMIN_CHANGE_SEARCH_FIELD = 'ADMIN_CHANGE_SEARCH_FIELD';

export const ADMIN_DELETE_USER_REQUEST = 'ADMIN_DELETE_USER_REQUEST';
export const ADMIN_DELETE_USER_SUCCESS = 'ADMIN_DELETE_USER_SUCCESS';
export const ADMIN_DELETE_USER_ERROR = 'ADMIN_DELETE_USER_ERROR';

export const ADMIN_CHANGE_USER_PASSWORD_REQUEST = 'ADMIN_CHANGE_USER_PASSWORD_REQUEST';
export const ADMIN_CHANGE_USER_PASSWORD_SUCCESS = 'ADMIN_CHANGE_USER_PASSWORD_SUCCESS';
export const ADMIN_CHANGE_USER_PASSWORD_ERROR = 'ADMIN_CHANGE_USER_PASSWORD_ERROR';

export const SERVER_ERROR = 'SERVER_ERROR';
export const SERVER_CHECK_REQUEST = 'SERVER_CHECK_REQUEST';
export const SERVER_CHECK_SUCCESS = 'SERVER_CHECK_SUCCESS';
export const SERVER_CHECK_ERROR = 'SERVER_CHECK_ERROR';

/* category action types */
export const CATEGORY_GET_ALL_REQUEST = 'CATEGORY_GET_ALL_REQUEST';
export const CATEGORY_GET_ALL_SUCCESS = 'CATEGORY_GET_ALL_SUCCESS';
export const CATEGORY_GET_ALL_ERROR = 'CATEGORY_GET_ALL_ERROR';

export const CATEGORY_GET_REQUEST = 'CATEGORY_GET_REQUEST';
export const CATEGORY_GET_SUCCESS = 'CATEGORY_GET_SUCCESS';
export const CATEGORY_GET_ERROR = 'CATEGORY_GET_ERROR';

export const CATEGORY_ADD_REQUEST = 'CATEGORY_ADD_REQUEST';
export const CATEGORY_ADD_SUCCESS = 'CATEGORY_ADD_SUCCESS';
export const CATEGORY_ADD_ERROR = 'CATEGORY_ADD_ERROR';

export const CATEGORY_UPDATE_REQUEST = 'CATEGORY_UPDATE_REQUEST';
export const CATEGORY_UPDATE_SUCCESS = 'CATEGORY_UPDATE_SUCCESS';
export const CATEGORY_UPDATE_ERROR = 'CATEGORY_UPDATE_ERROR';

export const CATEGORY_DELETE_REQUEST = 'CATEGORY_DELETE_REQUEST';
export const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS';
export const CATEGORY_DELETE_ERROR = 'CATEGORY_DELETE_ERROR';

/* product action types */
export const PRODUCT_GET_ALL_REQUEST = 'PRODUCT_GET_ALL_REQUEST';
export const PRODUCT_GET_ALL_SUCCESS = 'PRODUCT_GET_ALL_SUCCESS';
export const PRODUCT_GET_ALL_ERROR = 'PRODUCT_GET_ALL_ERROR';

export const PRODUCT_GET_REQUEST = 'PRODUCT_GET_REQUEST';
export const PRODUCT_GET_SUCCESS = 'PRODUCT_GET_SUCCESS';
export const PRODUCT_GET_ERROR = 'PRODUCT_GET_ERROR';

export const PRODUCT_ADD_REQUEST = 'PRODUCT_ADD_REQUEST';
export const PRODUCT_ADD_SUCCESS = 'PRODUCT_ADD_SUCCESS';
export const PRODUCT_ADD_ERROR = 'PRODUCT_ADD_ERROR';

export const PRODUCT_UPDATE_REQUEST = 'PRODUCT_UPDATE_REQUEST';
export const PRODUCT_UPDATE_SUCCESS = 'PRODUCT_UPDATE_SUCCESS';
export const PRODUCT_UPDATE_ERROR = 'PRODUCT_UPDATE_ERROR';

export const PRODUCT_DELETE_REQUEST = 'PRODUCT_DELETE_REQUEST';
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS';
export const PRODUCT_DELETE_ERROR = 'PRODUCT_DELETE_ERROR';



///events
export const ROUTE_CHANGED = 'ROUTE_CHANGED';

export const PRODUCTS_GET_ALL = 'PRODUCTS_GET_ALL';

export const ERROR_CLASS = 'has-error';