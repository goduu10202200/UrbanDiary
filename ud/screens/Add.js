import React from 'react';
import { 
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Platform,
} from 'react-native';
import styles_layout from "./style/style_layout";
import styles_add from "./style/style_add";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from '../node_modules/react-native-elements';
//import PopupDialog from 'react-native-popup-dialog';

export default class Member extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <Image source={require('../assets/images/LogoFont_w.png')} style={styles_layout.titleLogo}/>
    ),
    headerStyle: styles_layout.titleDiv,
  };

  state = {
    isDatePickerVisible: false,
    isTimePickerVisible: false,
    listDate: new Date().toDateString(),
    listTime: new Date().toTimeString(),
  };
 
  _showDatePicker = () => this.setState({ 
    isDatePickerVisible: true
  });
  _showTimePicker = () => this.setState({ 
    isTimePickerVisible: true 
  });
  _hideDateTimePicker = () => this.setState({ 
    isDatePickerVisible: false, 
    isTimePickerVisible: false 
  });
 
  _handleDatePicked = (date) => {
    var strDate = date.toDateString();
    this.setState({listDate: strDate});
    this._hideDateTimePicker();
  };
  _handleTimePicked = (date) => {
    var strTime = date.toTimeString();
    this.setState({listTime: strTime});
    this._hideDateTimePicker();
  };

  render() {
    return (
      <ScrollView 
      contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps='handled' 
        style={styles_add.container}
      >
        <View style={styles_add.header}>
          <Text style={styles_add.headerTxt}>新增待辦事項</Text>
        </View>
        <View style={styles_add.addDiv}>
          <TextInput style={styles_add.addInput} multiline={true} placeholder='敘述'>
          </TextInput>
          <TextInput style={styles_add.addInput} multiline={true} placeholder='地點'>
          </TextInput>
          <View style={styles_add.timeDiv}>
            <Icon 
                name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} 
                style={styles_add.btnIcon} 
              />
            <TouchableOpacity onPress={this._showDatePicker}>
              <View style={styles_add.btnTime}>
                <Text>
                  {this.state.listDate} 
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles_add.timeDiv}>
            <Icon 
                name={Platform.OS === 'ios' ? 'ios-time' : 'md-time'} 
                style={styles_add.btnIcon} 
              />
            <TouchableOpacity onPress={this._showTimePicker}>
              <View style={styles_add.btnTime}>
                <Text>
                  {this.state.listTime}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            mode='date'
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
          <DateTimePicker
            mode='time'
            isVisible={this.state.isTimePickerVisible}
            onConfirm={this._handleTimePicked}
            onCancel={this._hideDateTimePicker}
          />
          <Button buttonStyle={styles_add.addBtn} textStyle={styles_add.addBtnTxt} title='儲存' />
        </View>
        
      </ScrollView>
    );
  }
}
