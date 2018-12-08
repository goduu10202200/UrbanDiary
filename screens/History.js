import React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import { TabView, TabBar } from "react-native-tab-view"; // 0.0.67

// 分頁內容
import Year from "./History_year";
import Month from "./History_month";
import Day from "./History_day";

// Layout
import styles_layout from "./style/style_layout";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};
export default class History extends React.Component {
  static navigationOptions = {
    title: "歷史日記",
    headerStyle: styles_layout.titleDiv,
    headerTitleStyle: styles_layout.titleTxt
  };

  state = {
    index: 0,
    routes: [
      { key: "year", title: "年" },
      { key: "day", title: "日" },
      { key: "month", title: "月" }
    ]
  };

  jumpPage = page => {
    this.props.navigation.navigate(page);
  };

  // 傳遞索引
  _handleIndexChange = index => this.setState({ index });

  // 傳遞 Header
  _renderHeader = props => <TabBar {...props} />;

  // 分頁中的三個部分，傳遞 jump function 到子頁面
  _renderScene = ({ route }) => {
    switch (route.key) {
      case "day":
        return <Day jump={this.jumpPage} />;
      case "year":
        return <Year jump={this.jumpPage} />;
      case "month":
        return <Month jump={this.jumpPage} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TabView
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onIndexChange={this._handleIndexChange}
            initialLayout={initialLayout}
            renderTabBar={(props) =>
              <TabBar
                {...props}
                //indicatorStyle={{ backgroundColor: 'white' }}
                labelStyle={{ color: "#777", fontSize: 15, marginTop: 10}}
                style={{backgroundColor: "white", height: 50,}}
                renderIcon={this.renderIcon}
                indicatorStyle={{backgroundColor: "#777", height: 1}}
              />
            }
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
