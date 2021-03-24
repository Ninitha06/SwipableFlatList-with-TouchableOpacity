import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { ListItem, Icon } from "react-native-elements";

import db from "../config";

export default class SwipableFlatlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotifications: this.props.allNotifications,
    };
  }

  updateMarkAsRead = (notification) => {
    console.log(notification);
    console.log(notification.doc_id);
    db.collection("all_notifications").doc(notification.doc_id).update({
      notificationStatus: "read",
    });
  };

  renderHiddenItem = (data) => (
    <TouchableOpacity
      onPress={(_) => {
        //console.log(data);
        var allNotifications = this.state.allNotifications;
        this.updateMarkAsRead(data.item);
        const newData = [...allNotifications];
        // const prevIndex = allNotifications.findIndex(item => item.key === key);
        // console.log("Index " + prevIndex);
        newData.splice(data.index, 1);

        this.setState({
          allNotifications: newData,
        });
      }}
      style={styles.rowBack}
    >
      <View>
        <Text style={styles.backTextWhite}>Mark as read</Text>
      </View>
    </TouchableOpacity>
    // <View style={styles.rowBack}>
    //   <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
    //     <Text style={styles.backTextWhite}>Mark as read</Text>
    //   </View>
    // </View>
  );

  renderItem = (data) => (
    <Animated.View>
      <ListItem
        leftElement={
          <Icon name="book" type="font-awesome" color="#696969"></Icon>
        }
        title={data.item.bookName}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        subtitle={data.item.message}
        bottomDivider
      ></ListItem>
    </Animated.View>
  );

  render() {
    return (
      <View style={styles.container}>
        <SwipeListView
          useFlatList={true}
          disableRightSwipe
          data={this.state.allNotifications}
          renderItem={this.renderItem}
          rightOpenValue={-150}
          onRowOpen={(rowKey, rowMap) => {
            
              setTimeout(() => {
            //console.log("hey..am getting executed");
                rowMap[rowKey] && rowMap[rowKey].closeRow();
               // rowMap[rowKey].closeRow();
              }, 2000);
            
          }}
          keyExtractor={(item, index) => index.toString()}
          previewRowKey={"0"}
          previewOpenValue={-100}
          previewOpenDelay={3000}
          renderHiddenItem={this.renderHiddenItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  rowBack: {
    // backgroundColor: "#29b6f6",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 15,
    backgroundColor: "#29b6f6",
  },
});
