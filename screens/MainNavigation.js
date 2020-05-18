import React, { Component, useState } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ADMIN_EMAILS } from '../constants'
import { Button, Input, Image, Avatar } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { syncItemsCsv } from '../actions/itemActions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const shoppingCart = <MaterialIcons name={'shopping-cart'} color="#666" size={28}/>
const searchIcon = <FontAwesome5 name={'search'} color="#666" size={22}/>
const storeIcon = <FontAwesome5 name={'shopping-cart'} color="#666" size={22}/>
const deliverIcon = <FontAwesome5 name={'truck'} color="#666" size={22}/>
const circleIcon = <FontAwesome5 name={'circle'} color="#666" size={22}/>
const syncIcon = <FontAwesome5 name={'sync'} color="#666" size={22}/>
const userIcon = <FontAwesome5 name={'user'} color="#666" size={22}/>
const signInIcon = <FontAwesome5 name={'car'} color="#666" size={22}/>
const plusSquareIcon = <FontAwesome5 name={'plus-square'} color="#666" size={25}/>
const boxOpenIcon = <FontAwesome5 name={'box-open'} color="#666" size={22}/>



const MainNavigation = (props) => {

  const { userInfo } = props.user

  return (
    <View style={{height: 50, borderTopColor: '#DDD', borderTopWidth: 1}} >
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
      <Button
          type='clear'
          icon={shoppingCart} 
          onPress={() => props.navigation.navigate('Cart', {})}
      />
      <Button
          type='clear'
          icon={plusSquareIcon}
          onPress={() => props.navigation.navigate('Home', {})}
      />
      <Button
          type='clear'
          icon={searchIcon}
          onPress={() => props.navigation.navigate('Search', {})}
      />
      {
        (userInfo && ADMIN_EMAILS.includes(userInfo.email))?
        <Button
          type='clear'
          icon={syncIcon}
          onPress={() => props.syncItemsCsv('sync')}
        />:null
      }
      {
        (userInfo && ADMIN_EMAILS.includes(userInfo.email))?
        <Button
          type='clear'
          icon={boxOpenIcon}
          onPress={() => props.navigation.navigate('Deliver', {})}
        />:null
      }
      {
        (userInfo && userInfo.photoURL)?
        <Avatar
          onPress={() => props.navigation.navigate('User', {})}
          size={28}
          rounded
          containerStyle={{padding: 1, borderWidth: 1, borderColor: '#666'}}
          source={{ uri: userInfo.photoURL  }}
          showAccessory
        />:null
      }
      </View>
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
  user: state.user,
});

const mapDispatchToProps = dispatch => {
  return {
    syncItemsCsv: () => dispatch(syncItemsCsv()),
    showCurrentUser: () => dispatch(showCurrentUser()),
    getCurrentUserGoogle: () => dispatch(getCurrentUserGoogle()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation)