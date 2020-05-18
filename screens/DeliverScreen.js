import React, { Component, useEffect } from 'react'
import { StyleSheet, View, Alert, Text, ActivityIndicator, FlatList, ScrollView, SafeAreaView, TouchableHighlight, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Button, Input, Image, ListItem } from 'react-native-elements'
import { BLANK_IMAGE_LINK  } from '../constants'
import { formatDate, transformDeliverTitleStyle, transformDeliverStatus } from '../functions'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MainNavigation from './MainNavigation'
import { getDeliveries, selectDelivery } from '../actions/deliverActions'

const deliverIcon = <FontAwesome5 name={'shipping-fast'} color="#CCC" size={18}/>
const checkIcon = <FontAwesome5 name={'check'} color="#2089DC" size={18}/>
const shoppingCart = <MaterialIcons name={'shopping-cart'} color="#2089DC" size={20}/>
const dashboardIcon = <MaterialIcons name={'dashboard'} color="#2089DC" size={22}/>
const syncAltIcon = <FontAwesome5 name={'sync-alt'} color="#333" size={20}/>
const infoIcon = <FontAwesome5 name={'info-circle'} color="#999" size={25}/>
const backIcon = <FontAwesome5 name={'chevron-left'} color="#666" size={20}/>


const DeliverScreen = (props) => {

  useEffect(() => {
    props.getDeliveries()
  }, [])

  const reightAvatar = (item) => {
    let data = [
      'Cart Ref#: '+item.id,
      formatDate(item.datetime, 2),
      'Items count: '+item.items.length,
      'Total: '+item.total,
    ]

    return (
      <TouchableHighlight onPress={() => {
        Alert.alert(
          'Deliver Details',
          data.join('\n'),
          [{'text': 'Ok'}],
          {cancelable: true})}
        }>
        {infoIcon}
      </TouchableHighlight>
    )
  }

  const Delivery = ({item}) => {

    return (
      <TouchableOpacity key={'Delivery-'+item.id} onPress={() => {
        props.selectDelivery(item)
        props.navigation.navigate('DeliverDetails', {})}
        
      } >
      <ListItem
        leftAvatar={{ rounded: true, source: { uri: item.userInfo.photoURL || BLANK_IMAGE_LINK } }}
        title={item.userInfo.displayName}
        containerStyle={{borderBottomColor: '#f9f9f9', borderBottomWidth: 1}}
        titleStyle={item.deliveryStatus}
        subtitleStyle={transformDeliverTitleStyle(item.deliveryStatus)}
        subtitle={transformDeliverStatus(item.deliveryStatus)}
        // chevron={{ color: '#333' }}
        rightAvatar={reightAvatar(item)} />
      </TouchableOpacity>
    );
  }

  const { deliveries } = props.deliver

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#EEE', borderBottomWidth: 1}}>
          <Button
            type="clear"
            icon={backIcon}
            onPress={() => props.navigation.goBack()}
            buttonStyle={{marginLeft: 5, marginTop: 10}}
          />
          <Button
            type="clear"
            icon={syncAltIcon}
            titleStyle={{marginLeft: 5, fontSize: 15}}
            onPress={() => props.getDeliveries()}
            containerStyle={{margin: 5}}
          />
        </View>
        <View style={{flex: 1}}>
          <SafeAreaView style={{flex: 1}}>
            <FlatList
              style={{flex: 1}}
              data={deliveries}
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
      <MainNavigation navigation={props.navigation}/>
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
    marginVertical: 10
  }
});

const mapStateToProps = state => ({
  deliver: state.deliver,
})

const mapDispatchToProps = dispatch => {
  return {
    getDeliveries: () => dispatch(getDeliveries()),
    selectDelivery: (delivery) => dispatch(selectDelivery(delivery))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliverScreen)