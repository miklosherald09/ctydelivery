import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import { computeCartTotal } from '../functions'
import { ListItem } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as RootNavigation from '../RootNavigation.js'

const addCartIcon = <MaterialIcons name={'add-shopping-cart'} color="#999" size={25}/>

const TotalHeader = (props) => {

    const { activeCart, punchItemProgress } = props.cart

    return (
      <TouchableOpacity onPress={() => RootNavigation.navigate('Cart', {})} >
        <View style={{height: 50,  borderBottomColor: '#EEE', borderBottomWidth: 1}} >
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} >
            <View style={{flex: 1}}>
              <Text style={{fontSize: 20, marginLeft: 10}}>Total</Text>
            </View>
            <View style={{flex: 1, marginRight: 10}}>
              {
                !punchItemProgress?
                <NumberFormat
                  renderText={value => <Text style={{textAlign: 'right', fontSize: 20, color: '#333'}}>{value}</Text>} 
                  fixedDecimalScale={true} 
                  decimalScale={0} 
                  value={String(computeCartTotal(activeCart.items))}
                  displayType={'text'} 
                  thousandSeparator={true}
                  prefix={"₱"} />:
                  <ListItem
                    containerStyle={{marginRight: -15, padding: 10}}
                    contentContainerStyle={{ marginRight: -10, alignSelf: 'flex-end'}}
                    type="clear"
                    rightIcon={addCartIcon}
                    title="Putting on cart"
                    titleStyle={{textAlign: 'right', fontStyle:'italic', fontSize: 18, color: '#999'}}
                  />
              }
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  
});

const mapStateToProps = state => ({
  count: state.count,
  cart: state.cart
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TotalHeader)