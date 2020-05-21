import React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { itemModalVisible, selectItem } from '../actions/itemActions'
import { getSectionItems } from '../actions/sectionActions'
import { punchItem } from '../actions/cartActions'
import { searchModalVisible } from '../actions/searchActions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const shoppingCart = <MaterialIcons name={'shopping-cart'} color="white" size={25}/>

const WelcomeScreen = (props) => {

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
    searchModalVisible: (visible) => { dispatch(searchModalVisible(visible)) },
    punchItem: (item) => { dispatch(punchItem(item)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)