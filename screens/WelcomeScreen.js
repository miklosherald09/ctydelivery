import React, { Component, useState } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { Button, Input } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { itemModalVisible, selectItem, updatePunchCountDisplay } from '../actions/itemActions'
import { getSectionItems } from '../actions/sectionActions'
import { punchItem } from '../actions/cartActions'
import { searchModalVisible } from '../actions/searchActions'
import { BLANK_IMAGE_LINK } from '../constants'
import SectionNavigation from './SectionNavigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const searchIcon = <FontAwesome5 name={'search'} color="#666" size={15}/>
const storeIcon = <FontAwesome5 name={'shopping-cart'} color="#666" size={22}/>
const deliverIcon = <FontAwesome5 name={'truck'} color="#666" size={22}/>
const circleIcon = <FontAwesome5 name={'circle'} color="#666" size={22}/>
const shoppingCart = <MaterialIcons name={'shopping-cart'} color="white" size={25}/>

const numColumns = 4
const boxHeight = Dimensions.get('window').height / 8

const WelcomeScreen = (props) => {

  const { itemModalVisible } = props.item
  const { activeSection, sections, sectionItems } = props.section
  
  return (
    <View style={{flex: 1, backgroundColor: '#169102'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <Image source={require('../bg.jpg')} style={{width: '80%', height: '50%'}}/>
        <Button
          onPress={() => props.navigation.navigate('Home', {})}
          title="Start Shopping!"
          titleStyle={{color: 'white', fontSize: 15, marginLeft: 10}}
          icon={shoppingCart}
          containerStyle={{borderColor: 'white', borderWidth: 2, paddingHorizontal: 5, borderRadius: 5}}
          // buttonStyle={{backgroundColor: 'red'}}
          type="clear"
        />
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
  },
  squareBox: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 5,
    height: Dimensions.get('window').height / 8, // approximate a square
    borderRadius: 5,
    // backgroundColor: 'blue'
  },
  squareBoxInvisible: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: 'blue',
    height: Dimensions.get('window').height / 8, // approximate a square
    backgroundColor: 'transparent',
    width: 0,
    height: 0
  },
  sectionItemsPan: {
    flex: 1, 
    marginBottom: 10, 
    // backgroundColor: 'blue'
  },
  sectionItemsPanHidden: {
    flex: 1, 
    marginBottom: 10, 
    // backgroundColor: 'blue',
    width: 0,
    height: 0,
  }
});

const mapStateToProps = state => ({
  item: state.item,
  section: state.section
})

const mapDispatchToProps = dispatch => {
  return {
    getSectionItems: (section) => {
      dispatch(getSectionItems(section))
    },
    selectItem: (item) => {
      dispatch(itemModalVisible(true))
      dispatch(selectItem(item))
    },
    searchModalVisible: (visible) => {
      dispatch(searchModalVisible(visible))
    },
    punchItem: (item) => {
      dispatch(punchItem(item))
      // setTimeout(() => {
      //   dispatch(updatePunchCountDisplay(item))
      // }, 100)
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)