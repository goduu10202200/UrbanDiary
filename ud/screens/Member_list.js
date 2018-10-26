import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  checkedIcon,
  uncheckedIcon,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SelectMultiple from "react-native-select-multiple";
import { Button, ListItem, CheckBox } from "../node_modules/react-native-elements";
import styles_layout from "./style/style_layout";
import styles_member from "./style/style_member";

export default class Member extends React.Component { 
  static navigationOptions = {
    headerTitle: (
      <Image
        source={require("../assets/images/LogoFont_w.png")}
        style={styles_layout.titleLogo}
      />
    ),
    headerStyle: styles_layout.titleDiv
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      checked: false
    }
  }
  GetItem () {
   
  }


  componentDidMount() {

    return fetch('http://172.20.10.2/urbandiary/ud_api/viewList_api.php')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
  get icon () {
    const platform = Platform.OS === 'ios' ? 'ios' : 'md';
    const iconName = this.item.completed ? `${platform}-checkbox` : `${platform}-square-outline`;
    const iconColor = this.item.completed ? 'green' : 'black';
    return <Icon name={iconName} color={iconColor} size={20} style={{marginRight: 8}} />;
}
onCompleteItem (e) {
  e.preventDefault();
  if (this.props.onCompleteItem !== null) {
      this.props.onCompleteItem(this.item.id, !this.item.completed);
  }
}

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles_member.container_bottom}
      >
        <ListView
          style={styles_member.listView}
          dataSource={this.state.dataSource}
          renderSeparator= {this.ListViewItemSeparator}
          renderRow={(rowData) => 
            <View style={styles_member.itemDiv} onPress={this.GetItem.bind(this, rowData.id)}>
              {/* <Icon
                name={this.state.check}
                style={styles_member.itemDiv_check}
                color="#ddd"
              /> */}
              <CheckBox
                checked={this.state.checked}
                onValueChange={() => this.setState({ checked: !this.state.checked })}
              />
              <Icon
                name={"pencil-circle"}
                style={styles_member.itemDiv_icon}
                color="#edb900"
              />
              <Text style={styles_member.itemDiv_time}>{rowData.time}</Text>
              <Text style={styles_member.itemDiv_item}>{rowData.content}</Text>
            </View>
          // <Text style={styles_member.listView_list} 
          // onPress={this.GetItem.bind(this, rowData.id)} >{rowData.id}</Text>
        }
        />

      </ScrollView>
    );
  }
}
