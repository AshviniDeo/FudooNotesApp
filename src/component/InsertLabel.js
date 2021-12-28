import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';

export class InsertLabel extends Component {
  render({navigation}) {
    return (
      <View style={styles.background}>
        <View style={[styles.labelBar, {justifyContent: 'flex-start'}]}>
          <View style={{left: 10, top: 10}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notes');
              }}>
              <Ionicon
                name={'arrow-back'}
                size={28}
                color={'rgba(0,0,0,0.8)'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default InsertLabel;
