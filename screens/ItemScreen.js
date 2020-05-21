import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const searchIcon = <FontAwesome5 name={'search'} color="#666" size={15}/>
const storeIcon = <FontAwesome5 name={'shopping-cart'} color="#666" size={22}/>
const deliverIcon = <FontAwesome5 name={'truck'} color="#666" size={22}/>
const circleIcon = <FontAwesome5 name={'circle'} color="#666" size={22}/>


ItemScreen = (props, {navigation}) => {

  const { selectedItem } = props.item

  return (
    <View style={{flex: 1}}>
      <Button
        title={selectedItem.name}
        onPress={() => navigation.navigate('Home', {name: 'xx'})}
      />
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
});

const mapStateToProps = state => ({
  item: state.item
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemScreen)