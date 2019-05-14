import React, { Component} from 'react';
import {Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { hidden } from 'ansi-colors';

const {height, width} = Dimensions.get("window");
const MAX_HEIGHT = 180;

const sampleData = [
  {title: 'A', value: 78},
  {title: 'B', value: 1900},
  {title: 'C', value: 100},
  {title: 'D', value: 52},
  {title: 'E', value: 64},
  {title: 'F', value: 30}
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphMaxHeight: 180,
    }
  }

  componentDidMount() {
    let maxDataValue = Math.max.apply(Math, sampleData.map(function(i) { return i.value; }));
    this.setState({ graphMaxHeight: maxDataValue});
  }

  renderGraph() {
    return (
      <View style={styles.graphKey} />
    );

  }

  renderBar(item, index) {
    return (
      <View style={styles.listColumn}>
        <View 
          style={[
            styles.graphBar,
            {
              minWidth: 45,
              width: (width / sampleData.length) - 80, 
              height: item.value, 
            }
          ]}
        />
        <Text style={styles.valueText}>{item.title}</Text>
      </View>
    )
  }

  render() {
    const graph = this.renderGraph();
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#efefef'}}>
        <Text>{this.state.graphMaxHeight}</Text>
        <View style={styles.container}>
          {graph}
          <FlatList 
            data={sampleData}
            horizontal={true}
            keyExtractor={(item) => item.title}
            renderItem={({item, index}) => this.renderBar(item, index)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.35,
    padding: 10,
    margin: 10,
    marginTop: 50,
    backgroundColor: '#F5FCFF',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset:{  width: 5,  height: 5  },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  graphBar: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#01C27C',
  },
  graphKey: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    bottom: 50,
    width: '100%', 
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#bdbdbd',
    overflow: 'visible'
  },
  listColumn: {
    flex: 1, 
    justifyContent: 'flex-end', 
    padding: 15,
    maxWidth: 70,
  },
  listContainer: {
    backgroundColor: 'transparent',
  },
  valueText: {
    height: 20,
    marginTop: 5,
    color: '#232323',
    overflow: 'hidden', 
    textAlign: 'center'
  }
});
