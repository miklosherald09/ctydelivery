import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { ADMIN_EMAILS } from '../constants'
import MainNavigation from './MainNavigation'
import Notification from './Notification'
import TotalHeader from './TotalHeader'
import { signOut } from '../actions/authActions'
import { updateUserInfoDialogVisible, updateAddressInput, updateMobileInput } from '../actions/userActions'
import { Button, Avatar } from 'react-native-elements'
import UserInfoModal from '../modals/UserInfoModal'
import { syncItemsCsv } from '../actions/itemActions'

const signOutIcon = <FontAwesome5 name={'sign-out-alt'} color="#666" size={20}/>
const addressIcon = <FontAwesome5 name={'map-marker-alt'} color="#666" size={20}/>
const phoneIcon = <FontAwesome5 name={'phone-volume'} color="#666" size={22}/>
const syncIcon = <FontAwesome5 name={'sync'} color="#666" size={20}/>

const UserScreen = (props) => {

  const { userInfo, userInfoFirebase } = props.user

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Notification />
      <TotalHeader />
      <View style={{flex: 1, padding: 15}} >
        <View style={{flexDirection: 'row'}}>
          {
            userInfo?
              <Avatar
                size={30}
                rounded
                containerStyle={{padding: 1, borderWidth: 1, borderColor: '#666'}}
                source={{ uri: userInfo.photoURL }}
                showAccessory
              />:null 
          }
          <Text style={{fontSize: 15, marginLeft: 15, marginTop: 3}}>{userInfo.displayName}</Text>
        </View>
        <View style={{marginLeft: -5, marginTop: 15}}>
          <View style={{flexDirection: 'row'}}>
            <Button
              type={'clear'}
              title={userInfoFirebase.address?userInfoFirebase.address:'Address'}
              titleStyle={styles.userDetails}
              icon={addressIcon}
              onPress={() => props.updateUserInfoDialogVisible(true)}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Button
              type={'clear'}
              title={userInfoFirebase.phoneNumber?userInfoFirebase.phoneNumber:'mobile #'}
              titleStyle={styles.userDetails}
              icon={phoneIcon}
              onPress={() => props.updateUserInfoDialogVisible(true)}
            />
          </View>
          {
            (userInfo && ADMIN_EMAILS.includes(userInfo.email))?
            <View style={{flexDirection: 'row'}}>
            <Button
              type='clear'
              title="Synchronize Data"
              titleStyle={styles.userDetails}
              icon={syncIcon}
              onPress={() => props.syncItemsCsv('sync')}
            /></View>:null
          }
          <View style={{alignItems: 'flex-start'}}>
            <Button
              onPress={() => props.signOut()}
              type="clear"
              title="Sign Out"
              titleStyle={styles.userDetails}
              icon={signOutIcon}
            />
          </View>
        </View>
      </View>
      <UserInfoModal />
      <MainNavigation navigation={props.navigation}/>
    </View>
  );
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
  },
  userDetails: {
    fontFamily: 'lucida grande', 
    marginLeft: 10, 
    fontSize: 15, 
    color: 'black'
  }
})

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
    updateUserInfoDialogVisible: (visible) => dispatch(updateUserInfoDialogVisible(visible)),
    updateAddressInput: (text) => dispatch(updateAddressInput(text)),
    updateMobileInput: (text) => dispatch(updateMobileInput(text)),
    syncItemsCsv: () => dispatch(syncItemsCsv()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen)