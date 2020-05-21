import React, { Component, useEffect } from 'react'
import { StyleSheet, View, Alert, FlatList, SafeAreaView, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Input, Image, ListItem } from 'react-native-elements'
import { computeCartTotal } from '../functions'
import { 
  BLANK_IMAGE_LINK,
  DELIVERY_STATUS_PENDING,
  DELIVERY_STATUS_RECEIVED,
  DELIVERY_STATUS_PACKAGING,
  DELIVERY_STATUS_DELIVERED,
  DELIVERY_STATUS_READY } from '../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { formatDate, transformDeliverTitleStyle, transformDeliverStatus } from '../functions'
import { getDeliveries, cancelPackaging, toggleItemCheck, refreshSelectedDelivery, packaging, ready, delivered } from '../actions/deliverActions'
import NumberFormat from 'react-number-format'


const deliverIcon = <FontAwesome5 name={'shipping-fast'} color="#2089DC" size={18}/>
const checkIcon = <FontAwesome5 name={'check'} color="#2089DC" size={18}/>
const shoppingCart = <MaterialIcons name={'shopping-cart'} color="#2089DC" size={20}/>
const shippingIcon = <FontAwesome5 name={'shipping-fast'} color="white" size={22}/>
const squareIcon = <FontAwesome5 name={'square'} color="#666" size={22}/>
const syncAltIcon = <FontAwesome5 name={'sync-alt'} color="#666" size={20}/>
const boxOpenIcon = <FontAwesome5 name={'box-open'} color="white" size={20}/>
const banIcon = <FontAwesome5 name={'ban'} color="#999" size={18}/>
const checkIcon2 = <FontAwesome5 name={'check'} color="white" size={18}/>
const thumbsupIcon = <FontAwesome5 name={'thumbs-up'} color="#333" size={20} />
const backIcon = <FontAwesome5 name={'chevron-left'} color="#666" size={22}/>
const infoIcon = <FontAwesome5 name={'info-circle'} color="#666" size={22}/>


const DeliverDetailsScreen = (props) => {

  const Delivery = ({item}) => {

    return (
      <TouchableOpacity onPress={() => props.toggleItemCheck(item.id)}>
        <ListItem
          key={'Delivery-'+item.id}
          leftAvatar={item.checked?checkIcon:squareIcon}
          title={item.title}
          titleStyle={{fontSize: 15}}
          subtitle={'₱'+item.price+' x '+item.count}
          rightTitle={
            <NumberFormat
              renderText={value => <Text style={{textAlign: 'right', fontSize: 18, color: '#333'}}>{value}</Text>} 
              fixedDecimalScale={true} 
              decimalScale={0} 
              value={(item.price * item.count)}
              displayType={'text'} 
              thousandSeparator={true}
              prefix={"₱"} />
          }
          containerStyle={{borderBottomColor: '#F7F7F7', borderBottomWidth: 1, paddingHorizontal: 10, paddingVertical: 10}}
        />
      </TouchableOpacity>
    );
  }

  const { selectedDelivery } = props.deliver

  const InfoButton = ({delivery}) => {

    let data = [
      'Cart Ref#: '+delivery.id,
      delivery.userInfo.displayName,
      delivery.userInfo.phoneNumber,
      delivery.userInfo.address,
      formatDate(delivery.datetime, 2),
      'Items count: '+delivery.items.length,
      'Total: '+computeCartTotal(delivery.items),
    ]

    return (
      <TouchableOpacity 
        style={{marginHorizontal: 5}}
        onPress={() => {
        Alert.alert(
          'Deliver Details',
          data.join('\n'),
          [{'text': 'Ok'}],
          {cancelable: true}
        )
      }}>
        {infoIcon}
      </TouchableOpacity>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center', borderBottomColor: '#EEE', borderBottomWidth: 1}}>
          <Button
            type="clear"
            icon={backIcon}
            onPress={() => props.navigation.goBack()}
            buttonStyle={{}}
          />
          <View style={{flex: 1}}>
          <ListItem
            title={selectedDelivery.userInfo.displayName}
            leftAvatar={{ rounded: true, source: { uri: selectedDelivery.userInfo.photoURL || BLANK_IMAGE_LINK } }}
            subtitle={transformDeliverStatus(selectedDelivery.deliveryStatus)}
            subtitleStyle={transformDeliverTitleStyle(selectedDelivery.deliveryStatus)}
            containerStyle={{paddingVertical: 7}}
          />
          </View>
          <Button
            type="clear"
            icon={syncAltIcon}
            onPress={() => props.refreshSelectedDelivery()}
          />
          <InfoButton delivery={selectedDelivery} />
        </View>
        <View style={{flex: 1}}>
          <SafeAreaView style={{flex: 1}}>
            <FlatList
              style={{flex: 1}}
              data={selectedDelivery.items}
              renderItem={({item}) => <Delivery item={item} />}
              keyExtractor={item => String(item.id)}
              initialNumToRender={24}
              onEndReachedThreshold={.01}
              // onEndReached={() => props.getSectionItems(section)}
              // columnWrapperStyle={{ marginBottom: 2}}
            />
            
          </SafeAreaView >
        </View>
      </View>
      {/* <View style={{borderTopColor: '#EEE', borderTopWidth: 1, paddingTop: 10}}>
        <ListItem
          title={'Total'}
          rightTitle={'₱' +selectedDelivery.total}
          rightTitleStyle={{color: '#333'}}
          containerStyle={{paddingVertical: 0}}
        />
      </View> */}
      {
        (selectedDelivery.deliveryStatus == DELIVERY_STATUS_RECEIVED)?
        <View style={{padding: 10}}>
          <Button
            icon={boxOpenIcon}
            title="Packaging"
            titleStyle={{marginLeft: 5}}
            onPress={() => props.packaging()}
          />
        </View>:null
      }
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        {
          (selectedDelivery.deliveryStatus == DELIVERY_STATUS_PACKAGING)?
          <View style={{flex: 1, padding: 10, paddingRight: 5}}>
          <Button
            type="clear"
            icon={boxOpenIcon}
            title="Cancel Packaging"
            onPress={() => props.cancelPackaging()}
            titleStyle={{color: '#999', fontSize: 15, fontWeight: 'normal', marginLeft: 5}}
            icon={banIcon}
            // buttonStyle={{backgroundColor: 'red'}}
            containerStyle={{borderColor: '#999', borderWidth: 1, borderRadius: 5, marginRight: 5}}
          />
           </View>:null
        }
        {
          (selectedDelivery.deliveryStatus == DELIVERY_STATUS_PACKAGING)?
          <View style={{flex: 1, padding: 10,  paddingLeft: 0}}>
          <Button
            icon={shippingIcon}
            title="Ready"
            titleStyle={{marginLeft: 10}}
            onPress={() => props.ready()}
            buttonStyle={{backgroundColor: '#76BA1B'}}
          /></View>:null
        }
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        {
          (selectedDelivery.deliveryStatus == DELIVERY_STATUS_READY)?
          <View style={{flex: 1, padding: 10}}>
          <Button
            icon={checkIcon2}
            title="Delivered"
            titleStyle={{marginLeft: 10}}
            onPress={() => props.delivered()}
            buttonStyle={{backgroundColor: '#1E65A7'}}
          /></View>:null
        }
      </View>
      {
        (selectedDelivery.deliveryStatus == DELIVERY_STATUS_DELIVERED)?
        <Button
          type="clear"
          title="Delivered"
          titleStyle={{fontSize: 18, color: "#333", marginLeft: 10}}
          buttonStyle={{padding: 10}}
          icon={thumbsupIcon}
        />:null
      }
      {
        (selectedDelivery.deliveryStatus == DELIVERY_STATUS_PENDING)?
        <Button
          type="clear"
          title="This order is still pending"
          titleStyle={{fontSize: 18, color: "#333", marginLeft: 10}}
          buttonStyle={{padding: 10}}
          icon={boxOpenIcon}
        />:null
      }
    </View>
  )
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
})

const mapStateToProps = state => ({
  deliver: state.deliver,
})

const mapDispatchToProps = dispatch => {
  return {
    getDeliveries: () => dispatch(getDeliveries()),
    toggleItemCheck: (itemId) => dispatch(toggleItemCheck(itemId)),
    refreshSelectedDelivery: () => dispatch(refreshSelectedDelivery()),
    packaging: () => dispatch(packaging()),
    cancelPackaging: () => dispatch(cancelPackaging()),
    ready: () => dispatch(ready()),
    delivered: () => dispatch(delivered())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliverDetailsScreen)