import React, { useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions, FlatList, SafeAreaView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button, Input, Image } from 'react-native-elements'
import MainNavigation from './MainNavigation'
import TotalHeader from './TotalHeader'
import Notification from './Notification'
import ItemModal from '../modals/ItemModal'
import AuthModal from '../modals/AuthModal'
import { itemModalVisible, selectItem } from '../actions/itemActions'
import { getSectionItems } from '../actions/sectionActions'
import { punchItem, getActiveCart } from '../actions/cartActions'
import { searchModalVisible } from '../actions/searchActions'
import { BLANK_IMAGE_LINK } from '../constants'
import SectionNavigation from './SectionNavigation'

const boxHeight = Dimensions.get('window').height / 8

function Item({item, onPress, onLongPress, gpc}) {

  key = 'item-'+gpc+'-'+item.id

  return (
    <TouchableOpacity 
      style={{ flex: 1, height: boxHeight, margin: 2}} 
      // key={key}
      onPress={onPress}
      onLongPress={onLongPress} >
      <View style={item.title?styles.squareBox:styles.squareBoxInvisible}>
        {
          item.punchCount?
          <Button
            title={String(item.punchCount)}
            onPress={() => props.itemModalVisible(true)}
            titleStyle={{fontSize: 12}}
            containerStyle={{borderRadius: 0, padding: 0, position: 'absolute',  top: 0, right: 0, zIndex: 1}}
            buttonStyle={{borderRadius: 15, paddingVertical: 2, paddingHorizontal: 10, backgroundColor: 'red'}}
          />:null
        }
        <Image resizeMode="contain" style={{width: "100%", height: "100%"}} source={{ uri: item.image_link_thumbnail || BLANK_IMAGE_LINK }} />
      </View>
    </TouchableOpacity>
  );
}

const HomeScreen = (props) => {

  const { itemModalVisible } = props.item
  const { activeSection, sections, sectionItems } = props.section

  useEffect(() => {
    // try do delay 
    setTimeout(() => {
      props.getActiveCart()
    }, 1000)
  }, [])
  
  return (
    <View style={{flex: 1, backgroundColor: 'yellow'}}>
      <Notification />
      <TotalHeader />
      <SectionNavigation />
      <View style={{flex: 1, padding: 10}} >
          {
            sections.map((section, i) => {
              section.items = section.items
              const match = (activeSection.google_product_category == section.google_product_category)
              const sectionKey = 'section-'+section.google_product_category

              return (
                <SafeAreaView  key={sectionKey} style={match?styles.sectionItemsPan:styles.sectionItemsPanVisible}>
                  {/* <Text>google_product_categxory: {activeSection.google_product_category}</Text> */}
                  <FlatList
                    style={{flex: 1}}
                    data={sectionItems[section.google_product_category]}
                    renderItem={({item}) => <Item 
                      gpc={section.google_product_category}
                      onPress={() => props.punchItem(item)} 
                      onLongPress={() => props.selectItem(item)}
                      item={item} />}
                    keyExtractor={item => 'item-'+String(item.google_product_category+'-'+item.id)}
                    numColumns={4}
                    initialNumToRender={24}
                    onEndReachedThreshold={.01}
                    onEndReached={() => props.getSectionItems(section)}
                    columnWrapperStyle={{ marginBottom: 2}}
                  />
                </SafeAreaView >
              )
            })
          }
      </View>
      <MainNavigation navigation={props.navigation}/>
      <ItemModal />
      <AuthModal />
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
    punchItem: (item) => { dispatch(punchItem(item)) },
    getActiveCart: () => dispatch(getActiveCart()),
    itemModalVisible: (visible) => dispatch(itemModalVisible(visible))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)