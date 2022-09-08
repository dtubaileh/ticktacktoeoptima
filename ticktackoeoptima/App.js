/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

const App: () => Node = () => {
  const [ticktack, setTicktak] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]); //[0, 0, 0, 0, 0, 0, 0, 0, 0]
  const [winner, setWinner] = useState('Tie');
  const userX = 'X';
  const userO = 'O';

  useEffect(() => { });

  const move = (value, index) => {
    if (winner === 'Tie') {
      ticktack[index] = value;
      setTicktak([...ticktack]);
      // Win Rows
      if (ticktack[0] === ticktack[1] && ticktack[1] === ticktack[2]) {
        setWinner(ticktack[0]);
      } else if (ticktack[3] === ticktack[4] && ticktack[4] === ticktack[5]) {
        setWinner(ticktack[3]);
      } else if (ticktack[6] === ticktack[7] && ticktack[7] === ticktack[8]) {
        setWinner(ticktack[6]);
      }

      // Win Columns
      else if (ticktack[0] === ticktack[3] && ticktack[3] === ticktack[6]) {
        setWinner(ticktack[0]);
      } else if (ticktack[1] === ticktack[4] && ticktack[4] === ticktack[7]) {
        setWinner(ticktack[1]);
      } else if (ticktack[2] === ticktack[5] && ticktack[5] === ticktack[8]) {
        setWinner(ticktack[2]);
      }

      // Win Diagonals
      else if (ticktack[0] === ticktack[4] && ticktack[4] === ticktack[8]) {
        setWinner(ticktack[0]);
      } else if (ticktack[2] === ticktack[4] && ticktack[4] === ticktack[6]) {
        setWinner(ticktack[1]);
      }
    }
  };

  
  const matrixViewBuilder = () => {
    const threePartIndex = Math.ceil(ticktack.length / 3);
    const updatedArray = [...ticktack];
    const thirdPart = updatedArray.splice(-threePartIndex);
    const secondPart = updatedArray.splice(-threePartIndex);
    const firstPart = updatedArray;

    return (
      <>
        <View style={style.rowView}>
          {firstPart.map((item, index) => {
            return (
              <TouchableHighlight onPress={() => move(userX, index)}>
                <Text style={style.textStyle}>{item}</Text>
              </TouchableHighlight>
            );
          })}
        </View>
        <View style={style.rowView}>
          {secondPart.map((item, index) => {
            return (
              <TouchableHighlight onPress={() => move(userX, index + 3)}>
                <Text style={style.textStyle}>{item}</Text>
              </TouchableHighlight>
            );
          })}
        </View>
        <View style={style.rowView}>
          {thirdPart.map((item, index) => {
            return (
              <TouchableHighlight onPress={() => move(userX, index + 6)}>
                <Text style={style.textStyle}>{item}</Text>
              </TouchableHighlight>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.columnView}>{matrixViewBuilder()}</View>
      <Text style={style.winnerText}>{`Winner is: ${winner}`}</Text>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  rowView: { flexDirection: 'row' },
  columnView: { flexDirection: 'column' },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textStyle: { margin: 15, fontSize: 37 },
  winnerText: { marginTop: 8 },
});
export default App;
