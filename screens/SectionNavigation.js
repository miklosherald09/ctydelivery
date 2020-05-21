import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { syncItemsCsv } from '../actions/itemActions'
import { selectSection, getSectionItems } from '../actions/sectionActions'

function Section({gpc, title, onPress}) {
  return (
    <View key={'section-'+gpc}  style={{padding: 10}}>
      <Button
        onPress={onPress}
        type="clear"
        titleStyle={{fontSize: '20', fontSize: 15, color: 'black'}}
        title={title}
      />
    </View>
  );
}

const SectionNavigation = (props) => {

  const { sections } = props.section

  return (
    <View style={{height: 50}} >
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