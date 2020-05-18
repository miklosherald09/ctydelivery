import React, { Component, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, Image } from "react-native";
import { Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { itemModalVisible, addItemCount, changeItemCount, autoIncItemCount, stopAutoIncItemCount } from '../actions/itemActions'
import { addToCart } from '../actions/cartActions'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { BLANK_IMAGE_LINK } from '../constants'

const minusIcon = <FontAwesome5 name={'minus-square'} color="#333" size={25}/>
const plusIcon = <MaterialIcons name={'add-circle-outline'} color="#333" size={30}/>
const buyIcon = <FontAwesome5 name={'check'} color="white" size={25}/>
const closeIcon = <MaterialIcons name={'close'} color="#666" size={30}/>
const checkIcon = <MaterialIcons name={'check'} color="#666" size={30}/>
const shoppingCartIcon = <MaterialIcons name={'shopping-cart'} color="white" size={22}/>

const ItemModal = (props) => {
	
  const { itemModalVisible, selectedItem, itemCounter } = props.item
  const { count } = props.count
  
  return (
      <Modal
        animationType="none"
        transparent={true}
        visible={itemModalVisible}
        onRequestClose={() => {
          props.itemModalVisible(false)
        }}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Button 
                onPress={() => props.itemModalVisible(false)} 
                type="clear"
                icon={closeIcon} />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Button 
                onPress={() => props.addToCart(selectedItem, itemCounter)} 
                type="clear"
                icon={checkIcon} />
            </View>
          </View>
          <View style={{flex: 5}}>
            <Image style={{ width: '100%', height: '100%' }} resizeMode="contain" source={{ uri: selectedItem.image_link || BLANK_IMAGE_LINK }} />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.modalText}>{selectedItem.title} ₱{selectedItem.price}</Text>
            {
              selectedItem.availability == 'out of stock'?
              <Text style={styles.availableText}>Not Yet Available</Text>:null
            }
          </View>
          <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
            <Button 
              type="clear" 
              icon={minusIcon}
              containerStyle={{}}
              onPress={() => props.addItemCount(-1)}  />
            <Input 
              containerStyle={{width: 80}} 
              inputContainerStyle={{borderBottomWidth: 0}} 
              keyboardType="numeric"
              textAlign={"center"}
              defaultValue={String(itemCounter)}
              onChangeText={(n) => changeItemCount(n)} />
            <Button 
              type="clear" 
              icon={plusIcon}
              onLongPress={() => props.autoIncItemCount()}
              onPressOut={() => props.stopAutoIncItemCount()}
              onPress={() => props.addItemCount(1)}  />
          </View>
          <View style={{backgroundColor: 'blue'}}>
            <Button
              type="solid"
              title="Add to cart"
              onPress={() => props.addToCart(selectedItem, itemCounter)}
              titleStyle={{ marginLeft: 5}}
              icon={shoppingCartIcon}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 15,
    padding: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: "center",
    fontSize: 18
  },
  availableText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 15
  }
});

const mapStateToProps = state => ({
  item: state.item,
  count: state.count
});

const mapDispatchToProps = dispatch => {
  return {
    itemModalVisible: (visible) => dispatch(itemModalVisible(visible)),
    addToCart: (item, itemCounter) => { dispatch(addToCart(item, itemCounter)) },
    addItemCount: (n) => dispatch(addItemCount(n)),
    changeItemCount: (n) => dispatch(changeItemCount(n)),
    autoIncItemCount: () => dispatch(autoIncItemCount()),
    stopAutoIncItemCount: () => dispatch(stopAutoIncItemCount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal)