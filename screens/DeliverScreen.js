import React, { useEffect } from 'react'
import { StyleSheet, View, Alert, FlatList,  SafeAreaView, TouchableHighlight, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button, ListItem } from 'react-native-elements'
import { BLANK_IMAGE_LINK  } from '../constants'
import { formatDate, transformDeliverTitleStyle, transformDeliverStatus } from '../functions'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MainNavigation from './MainNavigation'
import { getDeliveries, selectDelivery } from '../actions/deliverActions'
import { computeCartTotal } from '../functions'

const syncAltIcon = <FontAwesome5 name={'sync-alt'} color="#333" size={20}/>
const infoIcon = <FontAwesome5 name={'info-circle'} color="#999" size={25}/>
const backIcon = <FontAwesome5 name={'chevron-left'} color="#666" size={20}/>

const DeliverScreen = (props) => {

  useEffect(() => {
    props.getDeliveries()
  }, [])

  const reightAvatar = (delivery) => {
    let data = [
      'Cart Ref#: '+delivery.id,
      delivery.userInfo.displayName,
      delivery.userInfo.phoneNumber,
      delivery.userInfo.address,
      formatDate(delivery.datetime, 2),
      'Items count: '+delivery.items.length,
      'Total: '+computeCartTotal(delivery.items),
      'Remarks: '+delivery.remarks
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

    const remarks = item.remarks?'Remarks: '+item.remarks:''

    const subTitle = () => {
      return (
        <View>
          <Text style={transformDeliverTitleStyle(item.deliveryStatus)}>{transformDeliverStatus(item.deliveryStatus)}</Text>
          {remarks?<Text>{remarks}</Text>:null}
        </View>
      )
    }
    
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
        subtitle={subTitle}
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