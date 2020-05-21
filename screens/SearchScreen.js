import React, { Component } from 'react'
import { StyleSheet, View, Dimensions, Text, ActivityIndicator, FlatList, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { BLANK_IMAGE_LINK } from '../constants'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Input, Image, ListItem, Avatar } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MainNavigation from './MainNavigation'
import { formatData } from '../functions'
import { searchModalVisible, getSearchItems, searchItems, setSearchText } from '../actions/searchActions'
import { selectItem, punchItem, itemModalVisible } from '../actions/itemActions'
import ItemModal from '../modals/ItemModal'

const searchIcon = <MaterialIcons name={'search'} color="#333" size={28}/>
const boxHeight = Dimensions.get('window').height / 6

const SearchScreen = (props) => {

  const ItemImage = ({item}) => {
    return (
    <Avatar
      size="small"
      title={item.title && item.title.slice(0, 1)}
      source={{ uri: item.image_link_thumbnail || BLANK_IMAGE_LINK }}
      onPress={() => console.log("Works!")}
      activeOpacity={0.7}
    />
    )
  }

  const Item = ({item, onPress, imgUrl}) => {
    delete item._highlightResult
    return (
      <TouchableOpacity  key={'search-item-'+item.id} onPress={() => props.selectItem(item)} >
        <ListItem
          leftAvatar={<ItemImage item={item} />}
          containerStyle={{flex: 1, padding: 5}}
          titleStyle={{color: 'black'}}
          title={item.title}
        />
      </TouchableOpacity>
    )
  }

  const { searchItems, searchText } = props.search
  const { sectionItems } = props.section

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', borderBottomColor: '#CCC', borderBottomWidth: 1}}>
        <Input
          leftIcon={searchIcon}
          leftIconContainerStyle={{marginTop: 5, marginLeft: 5}}
          inputStyle={{fontSize: 15, padding: 0, height: 30, marginTop: 2, marginLeft: 10}}
          containerStyle={{marginTop: 1,borderBottomColor: 'white', borderBottomWidth: 0}}
          inputContainerStyle={{ borderBottomColor: 'white', borderBottomWidth: 0}}
          onChangeText ={(text) => props.searchItems(text)}
        />
      </View>
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            style={{flex: 1}}
            data={searchItems}
            renderItem={({item}) => <Item item={item} id={item.id} title={item.title} price={item.price}/>}
            keyExtractor={item => String(item.id)}
            // numColumns={4}
            initialNumToRender={24}
            onEndReachedThreshold={.01}
            // onEndReached={() => props.getSearchItems()}
            // columnWrapperStyle={{ marginBottom: 2}}
          />
        </SafeAreaView >
      </View>
      <ItemModal />
      <MainNavigation navigation={props.navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  categoryHeader: {
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#333', 
    marginVertical: 10
  },
  listContainer: {
    flex: 1
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
});

const mapStateToProps = state => ({
  search: state.search,
  items: state.items,
  section: state.section
})

const mapDispatchToProps = dispatch => {
  return {
    searchModalVisible: (visible) => dispatch(searchModalVisible(visible)),
    selectItem: (item) => { dispatch(selectItem(item)) },
    punchItem: (item) => dispatch(punchItem(item)),
    searchItems: (text) => {
      dispatch(setSearchText(text)),
      dispatch(searchItems(text))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)