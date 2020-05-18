import React, { Component, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, Image } from "react-native";
import { Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { updateUserInfoDialogVisible, updateAddressInput, updateMobileInput, saveUserInfoFirebase } from '../actions/userActions'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const minusIcon = <FontAwesome5 name={'minus-square'} color="#333" size={25}/>
const plusIcon = <MaterialIcons name={'add-circle-outline'} color="#333" size={30}/>
const buyIcon = <FontAwesome5 name={'check'} color="white" size={25}/>
const closeIcon = <MaterialIcons name={'close'} color="#666" size={30}/>
const checkIcon = <MaterialIcons name={'check'} color="#666" size={30}/>
const shoppingCartIcon = <MaterialIcons name={'shopping-cart'} color="white" size={30}/>
const signOutIcon = <FontAwesome5 name={'sign-out-alt'} color="#666" size={20}/>
const addressIcon = <FontAwesome5 name={'map-marker-alt'} color="#666" size={20}/>
const phoneIcon = <FontAwesome5 name={'phone-volume'} color="#666" size={22}/>


const UserInfoModal = (props) => {
	
  const { userInfo, updateUserInfoDialogVisible, userInfoFirebase } = props.user
  
  return (
    <Modal
        animationType="none"
        transparent={true}
        visible={updateUserInfoDialogVisible}
        onRequestClose={() => {
          props.updateUserInfoDialogVisible(false)
        }}
      >
     
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: 'row', height: 50}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Button 
                onPress={() => props.updateUserInfoDialogVisible(false)} 
                containerStyle={{marginTop: -8, marginLeft: -8}} 
                type="clear" 
                icon={closeIcon} />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Button 
                onPress={() => props.saveUserInfoFirebase(false)} 
                containerStyle={{marginTop: -8, marginRight: -8}} 
                type="clear" 
                icon={checkIcon} />
            </View>
          </View>
          <View style={{flex: 5}}>
            <Text style={{fontSize: 15, color: '#999', textAlign: 'center', marginBottom: 15}}>Profile Details</Text>
            <Input
              leftIcon={addressIcon}
              leftIconContainerStyle={{marginLeft: 0}}
              defaultValue={userInfoFirebase.address?userInfoFirebase.address:''}
              placeholder={userInfoFirebase.address?userInfoFirebase.address:'address'}
              onChangeText={(text) => props.updateAddressInput(text)}
              inputStyle={{marginLeft: 10}}
              numberOfLines={3}
              multiline={true}
            />
            <Input
              leftIcon={phoneIcon}
              leftIconContainerStyle={{marginLeft: 0}}
              defaultValue={userInfoFirebase.phoneNumber?userInfoFirebase.phoneNumber:''}
              placeholder={userInfoFirebase.phoneNumber?userInfoFirebase.phoneNumber:'mobile #'}
              onChangeText={(text) => props.updateMobileInput(text)}
              inputStyle={{marginLeft: 10}}
              autoCompleteType="tel"
              keyboardType={'phone-pad'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

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
    fontSize: 20
  },
  availableText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 20
  }
})

const mapStateToProps = state => ({
  item: state.item,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    updateUserInfoDialogVisible: (visible) => dispatch(updateUserInfoDialogVisible(visible)),
    updateAddressInput: (text) => dispatch(updateAddressInput(text)),
    updateMobileInput: (text) => dispatch(updateMobileInput(text)),
    saveUserInfoFirebase: () => {
      dispatch(updateUserInfoDialogVisible(false)),
      dispatch(saveUserInfoFirebase())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoModal)