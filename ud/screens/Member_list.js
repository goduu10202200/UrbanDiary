import React from 'react';
import { 
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  checkedIcon,
  uncheckedIcon
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectMultiple from 'react-native-select-multiple'

import styles_layout from "./style/style_layout";
import styles_member from "./style/style_member";

//未來日記及待辦事項內容
const future = [
  // { label: {time: '', name: '跑三圈操場'}, value: '1' },
]
const list = [
  { label: {time: '14:00', name: '準備推甄資料'}, value: '2' },
  { label: {time: '19:00', name: '準備明日meeting 報告'}, value: '3' }
]

//未來日記及待辦事項格式
const futureLabel = (label) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Icon 
          name={'star-circle'}
          style={styles_member.itemDiv_icon} 
          color='#edb900'
       />
      <Text style={styles_member.itemDiv_time}>{label.time}</Text>
      <Text style={styles_member.itemDiv_item}>{label.name}</Text>
    </View>
  )
}
const listLabel = (label) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Icon 
          name={'pencil-circle'}
          style={styles_member.itemDiv_icon} 
          color='#2b7743'
       />
      <Text style={styles_member.itemDiv_time}>{label.time}</Text>
      <Text style={styles_member.itemDiv_item}>{label.name}</Text>
    </View>
  )
}


export default class Member extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <Image source={require('../assets/images/LogoFont_w.png')} style={styles_layout.titleLogo}/>
    ),
    headerStyle: styles_layout.titleDiv,
  };
  
  state = { selectedfuture: [], selectedlist: []  }


  //勾選狀態改變
  onSelectionsfutureChange = (selectedfuture) => {
    // selectedfuture is array of { label, value }
    this.setState({ selectedfuture })
  }
  onSelectionslistChange = (selectedlist) => {
    // selectedlist is array of { label, value }
    this.setState({ selectedlist })
  }

  
  render() {
    return (
      <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
        style={styles_member.container_bottom}
      >
        <SelectMultiple
          style={styles_member.futureDiv}
          rowStyle={styles_member.itemDiv}
          checkboxStyle={styles_member.checkbox}
          items={future}
          renderLabel={futureLabel}
          selectedItems={this.state.selectedfuture}
          onSelectionsChange={this.onSelectionsfutureChange} 
          />

        <SelectMultiple
          style={styles_member.listDiv}
          rowStyle={styles_member.itemDiv}
          checkboxStyle={styles_member.checkbox}
          items={list}
          renderLabel={listLabel}
          selectedItems={this.state.selectedlist}
          onSelectionsChange={this.onSelectionslistChange} />
      </ScrollView>
    );
  }
}
