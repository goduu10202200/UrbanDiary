import React from "react";
import { StyleSheet, View, Dimensions, Image, Text } from "react-native";
import { TabBar } from "react-native-tab-view"; // 0.0.67
import Timeline from "react-native-timeline-listview";
import ServiceApiNet from "./ServiceApiNet";
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

  constructor() {
    super();
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);

    this.data = [
      {
        time: "2018",
        description: "10月"
      },
      {
        time: "10/21",
        title: "吃大餐 ヽ(●´∀`●)ﾉ",
        description: "今天英文考了93分太爽了哈哈哈，晚餐吃大餐",
        lineColor: "#009688",
        imageUrl: ServiceApiNet.getimgURL() + "t1.jpg"
      },
      {
        time: "2018",
        description: "11月"
      },
      {
        time: "11/11",
        title: "熬夜讀書 (°ཀ°)",
        description: "明天要考會計院小考，今天要熬夜讀書",
        lineColor: "#009688",
        imageUrl: ServiceApiNet.getimgURL() + "t2.jpg"
      },
      {
        time: "2018",
        description: "12月"
      },
      {
        time: "12/31",
        title: "My friends (●´ω｀●)ゞ",
        description: "我想守護我想珍惜的人，希望一切一定會更好",
        lineColor: "#009688",
        imageUrl: ServiceApiNet.getimgURL() + "t3.jpg"
      },
      {
        time: "2019",
        description: "01月"
      },
      {
        time: "01/05",
        title: "吃肉肉，茂哥胖嘟嘟",
        description: "今天去朋友家烤肉，吃了好多雞屁股聽到好多八卦哈哈哈哈哈哈",
        lineColor: "#009688",
        imageUrl: ServiceApiNet.getimgURL() + "t4.jpg"
      },
      {
        time: "2019",
        description: "02月"
      }
    ];
    this.state = {
      selected: null
    };
  }
  onEventPress(data) {
    this.setState({ selected: data });
  }

  renderSelected() {
    if (this.state.selected)
      return (
        <Text style={{ marginTop: 10 }}>
          Selected event: {this.state.selected.title} at{" "}
          {this.state.selected.time}
        </Text>
      );
  }

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

  // 內容
  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>;
    var desc = null;
    var desc_month = (
      <View>
        <Text style={{ color: "#e8e8e8" }}>
          {rowData.description + " ──────────────"}
        </Text>
      </View>
    );
    switch (rowData.description) {
      case "01月":
        desc = desc_month;
        break;
      case "02月":
        desc = desc_month;
        break;
      case "03月":
        desc = desc_month;
        break;
      case "04月":
        desc = desc_month;
        break;
      case "05月":
        desc = desc_month;
        break;
      case "06月":
        desc = desc_month;
        break;
      case "07月":
        desc = desc_month;
        break;
      case "08月":
        desc = desc_month;
        break;
      case "09月":
        desc = desc_month;
        break;
      case "10月":
        desc = desc_month;
        break;
      case "11月":
        desc = desc_month;
        break;
      case "12月":
        desc = desc_month;
        break;
      default:
        desc = (
          <View style={styles.month_default}>
            <Image source={{ uri: rowData.imageUrl }} style={styles.image} />
            <Text style={[styles.textDescription]}>{rowData.description}</Text>
          </View>
        );
    }

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
      </View>
    );
  }
  // 時間
  renderTime(rowData, sectionID, rowID) {
    var time = null;
    switch (rowData.time) {
      case "2018":
        time = (
          <View style={time}>
            <Text style={{ textAlign: "center", color: "#bfbfbf" }}>
              {rowData.time}
            </Text>
          </View>
        );
        break;
      case "2019":
        time = (
          <View style={styles.time}>
            <Text style={{ textAlign: "center", color: "#bfbfbf" }}>
              {rowData.time}
            </Text>
          </View>
        );
        break;
      default:
        time = (
          <View
            style={{
              width: 60,
              borderWidth: 1,
              borderColor: "#000000",
              borderRadius: 200,
              backgroundColor: "#ffffff",
              padding: 7
            }}
          >
            <Text style={{ textAlign: "center", color: "black" }}>
              {rowData.time}
            </Text>
          </View>
        );
    }

    return <View>{styles.time}</View>;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {this.renderSelected()}
          <Timeline
            style={styles.list}
            data={this.data}
            circleSize={20}
            circleColor="rgb(45,156,219)"
            lineColor="rgb(45,156,219)"
            timeContainerStyle={{
              minWidth: 52,
              marginTop: -5
            }}
            descriptionStyle={{ color: "gray" }}
            options={{
              style: { paddingTop: 5 }
            }}
            innerCircle={"icon"}
            onEventPress={this.onEventPress}
            separator={false}
            innerCircle={"dot"}
            renderDetail={this.renderDetail}
            renderTime={this.renderTime}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 25,
    backgroundColor: "white"
  },
  list: {
    flex: 1,
    marginTop: 20
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  descriptionContainer: {
    flexDirection: "row",
    paddingRight: 50
  },
  month: {
    backgroundColor: "white",
    color: "gray"
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  time: {
    width: 60,
    borderWidth: 1,
    borderColor: "#f2efef",
    borderRadius: 200,
    backgroundColor: "#f2efef",
    padding: 3
  },
  month_default: {
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ffffff",
    borderColor: "#c4c4c4",
    borderWidth: 1,
    borderRadius: 10
  },
  textDescription: {
    marginTop: 10,
    marginLeft: 10,
    color: "gray"
  }
});
