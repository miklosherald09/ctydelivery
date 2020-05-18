import React, { Component, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image } from "react-native";
import { Button, Input, SocialIcon } from 'react-native-elements'
import { connect } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { authModalVisible, googleSignIn, facebookSignIn } from '../actions/authActions'

const closeIcon = <MaterialIcons name={'close'} color="#666" size={25}/>

getCurrentUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  this.setState({ currentUser });
}

signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    this.setState({ user: null }); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
}

getCurrentUserInfo = async () => {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    this.setState({ userInfo });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      // user has not signed in yet
    } else {
      // some other error
    }
  }
}

const AuthModal = (props) => {
	
  const { authModalVisible } = props.auth

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={authModalVisible}
        onRequestClose={() => props.authModalVisible(false)}
      >
      <TouchableHighlight style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{height: 40, alignItems: 'flex-end'}}>
            <Button
              containerStyle={{marginTop: -10, marginRight: -10}}
              type="clear"
              onPress={() => props.authModalVisible(false)}
              icon={closeIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <SocialIcon
              title='Sign In With Facebook'
              button
              type='facebook'
              onPress={() => props.facebookSignIn()}
            />
            <SocialIcon
              button
              title='Sign In With Google'
              type='google'
              onPress={() => props.googleSignIn()}
            />
            {/* <Button
              title="Facebook Sign-In"
              onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
            /> */}
            {/* <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn} */}
              {/* // disabled={this.state.isSigninInProgress} /> */}
            {/* /> */}
          </View>
          <View style={{height: 100, alignItems: 'center', justifyContent: 'flex-end'}}>
            <Button
              onPress={() => props.authModalVisible(false)}
              type="clear"
              title="Sign Up later"
              textStyle={{fontSize: 5, fontWeight: 'bold'}}
            />
          </View>
        </View>
      </TouchableHighlight>

    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 15,
    padding: 15,
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
});

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    authModalVisible: (visible) => dispatch(authModalVisible(visible)),
    googleSignIn: () => dispatch(googleSignIn()),
    facebookSignIn: () => dispatch(facebookSignIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal)