import { GameRequestDialog } from "react-native-fbsdk"

// miscellaneous
export const ITEM_FETCH_LIMIT = 18

// items
export const ITEM_MODAL_VISIBLE = 'ITEM_MODAL_VISIBLE'
export const SELECT_ITEM = 'SELECT_ITEM'
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS'
export const FETCH_ITEMS_BEGIN = 'FETCH_ITEMS_BEGIN'
export const ADD_ITEM_COUNT = 'ADD_ITEM_COUNT'
export const CHANGE_ITEM_COUNT = 'CHANGE_ITEM_COUNT'
export const SNYC_ITEM_COUNT = 'SNYC_ITEM_COUNT'
export const UPDATE_PUNCH_COUNT_DISPLAY = 'UPDATE_PUNCH_COUNT_DISPLAY'
export const SNYC_ITEMS_CSV = 'SNYC_ITEMS_CSV'
export const SNYC_ITEMS_CSV_SUCCESS = 'SNYC_ITEMS_CSV_SUCCESS'
export const AUTO_INCREMENT_ITEM_COUNT = 'AUTO_INCREMENT_ITEM_COUNT'
export const STOP_AUTO_INCREMENT_ITEM_COUNT = 'STOP_AUTO_INCREMENT_ITEM_COUNT'
export const DELIVER_ACTION_HALT = 'DELIVER_ACTION_HALT'

// sections
export const SELECT_SECTION = 'SELECT_SECTION'
export const GET_SECTION_ITEMS = 'GET_SECTION_ITEMS'
export const INIT_SECTION_ITEMS = 'INIT_SECTION_ITEMS'
export const GET_SECTIONS_SUCCESS = 'GET_SECTIONS_SUCCESS'

// search
export const SEARCH_MODAL_VISIBLE = 'SEARCH_MODAL_VISIBLE'
export const INIT_SEARCH_ITEMS_SUCCESS = 'INIT_SEARCH_ITEMS_SUCCESS'
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'
export const SEARCH_ITEMS_SUCCESS = 'SEARCH_ITEMS_SUCCESS'

// link
export const BLANK_IMAGE_LINK = 'https://icons-for-free.com/iconfiles/png/512/color+cinema+icons+Gallery-1320567853547441578.png'

// cart
export const ADD_TO_CART = 'ADD_TO_CART'
export const COMPUTE_TOTAL = 'COMPUTE_TOTAL'
export const PUNCH_ITEM = 'PUNCH_ITEM'
export const SAVE_CART_ITEMS_SUCCESS = 'SAVE_CART_ITEMS_SUCCESS'
export const SAVE_CART_ITEMS_BEGIN = 'SAVE_CART_ITEMS_BEGIN'
export const PENDING_TO_RECEIVED_BEGIN = 'PENDING_TO_RECEIVED_BEGIN'
export const PENDING_TO_RECEIVED_SUCCESS = 'PENDING_TO_RECEIVED_SUCCESS'
export const DELIVERY_STATUS_PENDING = 'DELIVERY_STATUS_PENDING'
export const DELIVERY_STATUS_RECEIVED = 'DELIVERY_STATUS_RECEIVED'
export const DELIVERY_STATUS_CHECKING = 'DELIVERY_STATUS_CHECKING'
export const DELIVERY_STATUS_ACCEPTED = 'DELIVERY_STATUS_ACCEPTED'
export const DELIVERY_STATUS_PACKAGING = 'DELIVERY_STATUS_PACKAGING'
export const DELIVERY_STATUS_READY = 'DELIVERY_STATUS_READY'
export const DELIVERY_STATUS_MOVING = 'DELIVERY_STATUS_MOVING'
export const DELIVERY_STATUS_DELIVERED = 'DELIVERY_STATUS_DELIVERED'
export const DELIVERY_STATUS_FAILED = 'DELIVERY_STATUS_FAILED'
export const CANCEL_DELIVERY_SUCCESS = 'CANCEL_DELIVERY_SUCCESS'
export const CANCEL_DELIVERY_BEGIN = 'CANCEL_DELIVERY_BEGIN'
export const CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS'
export const ADDRESS_DIALOG_VISIBLE = 'ADDRESS_DIALOG_VISIBLE'
export const MOBILE_DIALOG_VISIBLE = 'MOBILE_DIALOG_VISIBLE'
export const GET_ACTIVE_CART_BEGIN = 'GET_ACTIVE_CART_BEGIN'
export const GET_ACTIVE_CART_SUCCESS = 'GET_ACTIVE_CART_SUCCESS'
export const CLEAR_CART = 'CLEAR_CART'
export const PUNCH_ITEM_BEGIN = 'PUNCH_ITEM_BEGIN'
export const PUNCH_ITEM_SUCCESS = 'PUNCH_ITEM_SUCCESS'
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'


// auth
export const AUTH_MODAL_VISIBLE = 'AUTH_MODAL_VISIBLE'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const SET_CONFIRMATION = 'SET_CONFIRMATION'
export const ADMIN_EMAILS = [
  'miklos_herald@yahoo.com',
  'miklos.herald@gmail.com',
  'sen.rosario@gmail.com',
  'rfv121400@gmail.com',
  'ctystore2020@gmail.com',
  'darkako55@gmail.com'
]

// user
export const UPDATE_ADDRESS_INPUT = 'UPDATE_ADDRESS_INPUT'
export const UPDATE_MOBILE_INPUT = 'UPDATE_MOBILE_INPUT'
export const UPDATE_MOBILE_NUMBER_INPUT = 'UPDATE_MOBILE_NUMBER_INPUT'
export const SAVE_ADDRESS_SUCCESS = 'SAVE_ADDRESS_SUCCESS'
export const SET_USER_INFO = 'SET_USER_INFO'
export const UPDATE_USER_INFO_DIALOG_VISIBLE = 'UPDATE_USER_INFO_DIALOG_VISIBLE'
export const SAVE_USER_INFO_SUCCESS = 'SAVE_USER_INFO_SUCCESS'
export const INIT_USER_INFO_FIREBASE_SUCCESS = 'INIT_USER_INFO_FIREBASE_SUCCESS'

// alert messages
export const ALERT_MESSAGE_DELIVER_ITEMS_TITLE = 'Your Order will be delivered soon!'
export const ALERT_MESSAGE_DELIVER_ITEMS_SUB = "You can still add more items until we it's ready for delivery"
export const ALERT_MESSAGE_CLEAR_ITEMS = "This will remove all the items you currently selected"
export const ALERT_MESSAGE_CANCEL_DELIVERY_TITLE = 'Delivery Service has been canceled'
export const ALERT_MESSAGE_CANCEL_DELIVERY_SUB = 'Your items will not be delivered soon, you can still add more untill you want us to delivery. Thanks!'
export const ALERT_MESSAGE_PACKAGING_TITLE = "Package Items?"
export const ALERT_MESSAGE_PACKAGING_SUBTITLE = "Client will not be able to add more items"
export const ALERT_MESSAGE_CANCEL_PACKAGING_TITLE = "Cancel Packaging order"
export const ALERT_MESSAGE_CANCEL_PACKAGING_SUBTITLE = "Order will now be in received mode. Client can now edit items in cart."
export const ALERT_MESSAGE_PACKAGING_TO_READY_TITLE = "Order is now READY for delivery"
export const ALERT_MESSAGE_PACKAGING_TO_READY_SUBTITLE = "Make sure that all items are put in place, and no inaccuracy and mistakes are taken place"
export const ALERT_MESSAGE_READY_TO_DELIVERED_TITLE = "Order Delivered"
export const ALERT_MESSAGE_READY_TO_DELIVERED_SUBTITLE = "Order will be tagged as delivered. All items are physically brought to buyers and payments are received"
export const ALERT_MESSAGE_ITEM_OUT_OF_STOCK_TITLE = "Item is out of stock"
export const ALERT_MESSAGE_ITEM_OUT_OF_STOCK_SUBTITLE = "Item is temporarily not available, we're trying to make it available"
export const ALERT_MESSAGE_ORDER_IN_FREEZE_MODE_TITLE = "Cannot add more items"
export const ALERT_MESSAGE_ORDER_IN_FREEZE_MODE_SUBTITLE = "Your order will be delivered soon, so your cart is now in freeze mode"


// toast messages
export const TOAST_MESSAGE_RECEIVED_TO_PACKAGING_SUCCESS = "Order is now Packaging"
export const TOAST_MESSAGE_PACKAGING_TO_RECEIVED_SUCCESS = 'Order is now set to Received'
export const TOAST_MESSAGE_READY_TO_DELIVERED_SUCCESS = 'Order Delivered'
export const TOAST_MESSAGE_USER_INFO_SAVED_SUCCESS = "User Details Saved!"
export const TOAST_MESSAGE_ITEM_ADD_TO_CART_SUCCESS = 'Item added to cart!'
export const TOAST_MESSAGE_PACKAGING_TO_READY_SUCCESS = 'Order is now ready'
export const TOAST_MESSAGE_INVALID_ITEM_COUNTER_INPUT = 'Item count is not a number'

// algolia
export const INIT_ALGOLIA_SUCCESS = 'INIT_ALGOLIA_SUCCESS'

// deliver
export const GET_DELIVERIES_BEGIN = 'GET_DELIVERIES_BEGIN'
export const GET_DELIVERIES_SUCCESS = 'GET_DELIVERIES_SUCCESS'
export const SELECT_DELIVERY = 'SELECT_DELIVERY'
export const TOGGLE_ITEM_CHECK = 'TOGGLE_ITEM_CHECK'
export const REFRESH_SELECTED_DELIVERY = 'REFRESH_SELECTED_DELIVERY'
export const RECEIVED_TO_PACKAGING_BEGIN = 'RECEIVED_TO_PACKAGING_BEGIN'
export const RECEIVED_TO_PACKAGING_SUCCESS = 'RECEIVED_TO_PACKAGING_SUCCESS'
export const PACKAGING_TO_RECEIVED_BEGIN = 'PACKAGING_TO_RECEIVED_BEGIN'
export const PACKAGING_TO_RECEIVED_SUCCESS = 'PACKAGING_TO_RECEIVED_SUCCESS'
export const PACKAGING_TO_READY_BEGIN = 'PACKAGING_TO_READY_BEGIN'
export const PACKAGING_TO_READY_SUCCESS = 'PACKAGING_TO_READY_SUCCESS'
export const READY_TO_DELIVERED_BEGIN = 'READY_TO_DELIVERED_BEGIN'
export const READY_TO_DELIVERED_SUCCESS = 'READY_TO_DELIVERED_SUCCESS'

// notifications
export const DELIVERY_RECEIVED_NOTIF_MESSAGE = "Your order is received. You can still add items to your cart until we start packaging your order"
export const DELIVERY_PACKAGING_NOTIF_MESSAGE = "Your order is now packaging"
export const DELIVERY_READY_NOTIF_MESSAGE = "Order is now ready for delivery"
export const DELIVERY_DELIVERED_NOTIF_MESSAGE = "Order successfully Delivered"


// punchitem alerts
export const ALERT_MESSAGE_PUNCH_PACKAGING_TITLE = "Your items in now packaging, you can no longer add more items"
export const ALERT_MESSAGE_PUNCH_PACKAGING_SUBTITLE = "You add more item later"
export const ALERT_MESSAGE_PUNCH_READY_TITLE = "Your items in now ready for delivery, you can no longer add more items"
export const ALERT_MESSAGE_PUNCH_READY_SUBTITLE = "You add more item later"
export const ALERT_MESSAGE_DELIVERED_TITLE = "Order delivered, start shopping"
export const ALERT_MESSAGE_DELIVERED_SUBTITLE = "Start Shopping again!"

export const ALERT_MESSAGE_USER_INFO_INCOMPLETE_TITLE = "We need your email & mobile #"
export const ALERT_MESSAGE_USER_INFO_INCOMPLETE_SUBTITLE = "Please fill up forms"