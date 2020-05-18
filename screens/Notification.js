import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { bindActionCreators } from 'redux'
import NumberFormat from 'react-number-format'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { transformDeliveryNotifText } from '../functions'
import { 
  DELIVERY_STATUS_RECEIVED,
  DELIVERY_STATUS_CHECKING,
  DELIVERY_STATUS_ACCEPTED,
  DELIVERY_STATUS_PACKAGING,
  DELIVERY_STATUS_READY,
  DELIVERY_STATUS_DELIVERED 
} from '../constants'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const closeIcon = <MaterialIcons name={'close'} color="white" size={25}/>


const Notification = (props) => {

    const { cartTotal, activeCart } = props.cart
    const allowedForNotif = [
      DELIVERY_STATUS_RECEIVED,
      DELIVERY_STATUS_CHECKING,
      DELIVERY_STATUS_ACCEPTED,
      DELIVERY_STATUS_PACKAGING,
      DELIVERY_STATUS_READY,
      DELIVERY_STATUS_DELIVERED
    ]

    if(allowedForNotif.includes(activeCart.deliveryStatus)){
      return (
        <View style={{height: 50, backgroundColor: '#3EB8C5',  borderBottomColor: '#DDD', borderBottomWidth: 1}} >
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} >
            <View style={{flex: 1}}>
              <Text style={{fontSize: 15, padding: 10, color: 'white', textAlign: 'center'}}>
                {transformDeliveryNotifText(activeCart.deliveryStatus)}
              </Text>
            </View>
          </View>
        </View>
      )
    }
    else{
      return null
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  categoryHeader: {
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#333', 
    marginVertical: 10
  }
});

const mapStateToProps = state => ({
  count: state.count,
  cart: state.cart
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification)