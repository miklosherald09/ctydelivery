import React from 'react'
import { StyleSheet, View, Text, FlatList, Alert, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { 
  DELIVERY_STATUS_PENDING,
  DELIVERY_STATUS_RECEIVED, 
  DELIVERY_STATUS_CHECKING,
  DELIVERY_STATUS_LINED_UP,
  DELIVERY_STATUS_READY,
  DELIVERY_STATUS_PACKAGING,
  ALERT_MESSAGE_CLEAR_ITEMS
} from '../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MainNavigation from './MainNavigation'
import NumberFormat from 'react-number-format'
import TotalHeader from './TotalHeader'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { itemModalVisible, selectItem } from '../actions/itemActions'
import { authModalVisible } from '../actions/authActions'
import { Button, ListItem } from 'react-native-elements'
import AuthModal from '../modals/AuthModal'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { saveCartItems, clearCartItems, deliver, cancelDeliver, addressDialogVisible } from '../actions/cartActions'
import { updateAddressInput, saveAddress } from '../actions/userActions'
import { setConfirmation, authenticationGuard } from '../actions/authActions'
import Notification from './Notification'

const searchIcon = <FontAwesome5 name={'search'} color="#666" size={15}/>
const storeIcon = <FontAwesome5 name={'shopping-cart'} color="#666" size={22}/>
const deliverIcon = <FontAwesome5 name={'shipping-fast'} color="white" size={20}/>
const checkIcon = <FontAwesome5 name={'check'} color="white" size={22}/>
const shoppingCart = <MaterialIcons name={'shopping-cart'} color="black" size={22}/>
const circleIcon = <FontAwesome5 name={'circle'} color="#999" size={20}/>
const banIcon = <FontAwesome5 name={'ban'} color="#999" size={18}/>
const loading = <ActivityIndicator size={20} color="white" />
const boxOpenIcon = <FontAwesome5 name={'box-open'} color="white" size={20}/>


function Item({title, price, count, onPress, id}) {
  return (
    <TouchableOpacity onPress={onPress} key={'item-cart-'+id}>
      <ListItem 
        title={title}
        subtitle={'₱'+price+ ' x ' +count}
        rightTitle={
          <NumberFormat
            renderText={value => <Text style={{textAlign: 'right', fontSize: 20, color: '#333'}}>{value}</Text>} 
            fixedDecimalScale={true} 
            decimalScale={0} 
            value={(price * count)}
            displayType={'text'} 
            thousandSeparator={true}
            prefix={"₱"} />
          }
        rightTitleStyle={{fontSize: 20, color: '#333'}}
        containerStyle={{padding: 5}}
      />
    </TouchableOpacity>
  );
}

const CartScreen = (props) => {

    const { activeCart, pendingToReceivedProgress, cancelDeliverProgress } = props.cart

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Notification />
        <TotalHeader />
        <View style={{flex: 1, padding: 10}} > 
          <View style={{alignItems: 'flex-end'}}>
            {(activeCart.items.length > 0 && activeCart.deliveryStatus == DELIVERY_STATUS_PENDING)?
              <Button 
                title={'Clear All'}
                type="clear"
                titleStyle={{color: '#666', fontSize: 15}}
                onPress={() => props.clearCartItems()}
              />:null
            }
          </View>
          <FlatList
            data={activeCart.items}
            renderItem={({item}) => <Item onPress={() => props.selectItem(item)} id={item.id} title={item.title} price={item.price} count={item.count} />}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={{margin: 10}}>
          {(activeCart.items.length > 0 && activeCart.deliveryStatus == DELIVERY_STATUS_PENDING)?
          <Button
            icon={pendingToReceivedProgress?loading:deliverIcon}
            title={pendingToReceivedProgress?'Processing':'Deliver'}
            titleStyle={{fontSize: 18, fontWeight: 'normal', marginLeft: 10}}
            disabled={pendingToReceivedProgress?true:false}
            buttonStyle={pendingToReceivedProgress?styles.activeButton:styles.inActiveButton}
            onPress={() => props.deliver()}
          />:null}

          {(activeCart.items.length > 0 && activeCart.deliveryStatus == DELIVERY_STATUS_RECEIVED)?
          <View style={{flexDirection: 'row'}}>
            <Button
              type="clear"
              icon={cancelDeliverProgress?circleIcon:banIcon}
              title={cancelDeliverProgress?'Processing..':'Cancel Deliver'}
              titleStyle={{color: '#999', fontSize: 15, fontWeight: 'normal', marginLeft: 10, marginTop: -2}}
              disabled={cancelDeliverProgress?true:false}
              containerStyle={{borderColor: '#999', borderWidth: 1, borderRadius: 10}}
              onPress={() => props.cancelDeliver()} />
          </View>:null}

          {(activeCart.items.length > 0 && activeCart.deliveryStatus == DELIVERY_STATUS_PACKAGING)?
          <View style={{}}>
            <Button
              icon={boxOpenIcon}
              title="Your order is now packaging"
              titleStyle={{marginLeft: 10}}
              buttonStyle={{borderRadius: 0}}
            />
          </View>:null}
          {(activeCart.items.length > 0 && activeCart.deliveryStatus == DELIVERY_STATUS_READY)?
          <View style={{}}>
            <Button
              icon={deliverIcon}
              title="Your order is now ready for delivery"
              titleStyle={{marginLeft: 10}}
              buttonStyle={{borderRadius: 0, backgroundColor: '#30CB00'}}
            />
          </View>:null} 
        </View>
        <MainNavigation navigation={props.navigation}/>
        <AuthModal />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  categoryHeader: {
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#333', 
    marginVertical: 5
  },
  inActiveButton: {
    backgroundColor: "#78BE20"
  },
  activeButton: {
    backgroundColor: "blue"
  },
  cdInActiveButton: {
    backgroundColor: "#CCC",
  },
  cdActiveButton: {
    backgroundColor: "transparent"
  }
});

const mapStateToProps = state => ({
  count: state.count,
  cart: state.cart,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    selectItem: (item) => { dispatch(selectItem(item)) },
    authModalVisible: (visible) => {
      dispatch(authModalVisible(visible))
    },
    saveCartItems: () => {
      // dispatch(authenticationGuard())
      dispatch(saveCartItems())
    },
    clearCartItems: () => { 
      Alert.alert(
        "Are you sure?",
        ALERT_MESSAGE_CLEAR_ITEMS,
        [ { text: "Yes, Clear All items", onPress: () => dispatch(clearCartItems()) },
          { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"} ],
          { cancelable: false }
    )},
    updateAddressInput: (text) => {
      dispatch(updateAddressInput(text))
    },
    saveAddress: () => dispatch(saveAddress()),
    addressDialogVisible: (visible) => dispatch(addressDialogVisible(visible)),
    setConfirmation: (v) => dispatch(setConfirmation(v)),
    deliver: () => dispatch(deliver()),
    cancelDeliver: () => dispatch(cancelDeliver())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)