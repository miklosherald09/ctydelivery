import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import { syncItemsCsv } from '../actions/itemActions'
import { connect } from 'react-redux'
import { selectSection, getSectionItems } from '../actions/sectionActions'



const SectionNavigation = (props) => {

  const { activeSection, sections } = props.section

  const Section = ({gpc, title, onPress}) => {
    
    let active = (activeSection.google_product_category == gpc)
    
    return (
      <View key={'section-'+gpc}  style={{}}>
        <Button
          onPress={onPress}
          type="clear"
          titleStyle={active?styles.activeTitle:styles.title}
          title={title}
          buttonStyle={{paddingHorizontal: 10}}
        />
        <Divider style={active?styles.activeDivider:styles.divider}/>
      </View>
    );
  }
  
  return (
    <View style={{}} >
      <FlatList
        horizontal={true}
        data={sections}
        renderItem={({item, index}) => <Section gpc={item.google_product_category} onPress={() => props.selectSection(item)} title={item.title} />}
        keyExtractor={item => String(item.google_product_category)}
        />
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
  activeDivider: {
    height: 3, 
    backgroundColor: 'white'
  },
  divider: {
    height: 3, 
    backgroundColor: '#f1f1f1'
  },
  activeTitle: {
    fontSize: 15,
    color: '#999'
  },
  title: {
    fontSize: 15, 
    color: '#333'
  }
});

const mapStateToProps = state => ({
  section: state.section,
  item: state.item
});

const mapDispatchToProps = dispatch => {
  return {
    syncItemsCsv: () => dispatch(syncItemsCsv()),
    selectSection: (section) => {
      dispatch(selectSection(section)),
      dispatch(getSectionItems(section))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionNavigation)