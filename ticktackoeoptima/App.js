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
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

const App: () => Node = () => {
  const [ticktack, setTicktak] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [winner, setWinner] = useState('Tie');
  const userX = 'X';
  const userO = 'O';

  const move = (value, index) => {
    // as there is no winner you can continue with the game
    if (winner === 'Tie') {
      ticktack[index] = value;
      setTicktak([...ticktack]);

      // Win Diagonals
      if (
        ticktack[0] !== 0 &&
        ticktack[0] === ticktack[4] &&
        ticktack[4] === ticktack[8]
      ) {
        setWinner(ticktack[0]);
      } else if (
        ticktack[2] !== 0 &&
        ticktack[2] === ticktack[4] &&
        ticktack[4] === ticktack[6]
      ) {
        setWinner(ticktack[1]);
      }
      // Win Rows
      if (
        ticktack[0] !== 0 &&
        ticktack[0] === ticktack[1] &&
        ticktack[1] === ticktack[2]
      ) {
        setWinner(ticktack[0]);
      } else if (
        ticktack[3] !== 0 &&
        ticktack[3] === ticktack[4] &&
        ticktack[4] === ticktack[5]
      ) {
        setWinner(ticktack[3]);
      } else if (
        ticktack[6] !== 0 &&
        ticktack[6] === ticktack[7] &&
        ticktack[7] === ticktack[8]
      ) {
        setWinner(ticktack[6]);
      }

      // Win Columns
      else if (
        ticktack[0] !== 0 &&
        ticktack[0] === ticktack[3] &&
        ticktack[3] === ticktack[6]
      ) {
        setWinner(ticktack[0]);
      } else if (
        ticktack[1] !== 0 &&
        ticktack[1] === ticktack[4] &&
        ticktack[4] === ticktack[7]
      ) {
        setWinner(ticktack[1]);
      } else if (
        ticktack[2] !== 0 &&
        ticktack[2] === ticktack[5] &&
        ticktack[5] === ticktack[8]
      ) {
        setWinner(ticktack[2]);
      }
    }
  };

  const checkValidInput = (inputText, index) => {
    if (inputText === userX || inputText === userO) {
      move(inputText, index);
    } else {
      Alert.alert('Invalid Input', 'please inter either X or O');
    }
  };

  const matrixSquareInput = (itemValue, index) => {
    if (itemValue === 0) {
      return (
        <TextInput
          style={style.textStyle}
          maxLength={1}
          onChangeText={selectedValue => checkValidInput(selectedValue, index)}
          placeholder="0"
        />
      );
    } else {
      return (
        <View>
          <Text style={style.textStyle}>{itemValue}</Text>
        </View>
      );
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
            return matrixSquareInput(item, index);
          })}
        </View>
        <View style={style.rowView}>
          {secondPart.map((item, index) => {
            return matrixSquareInput(item, index + 3);
          })}
        </View>
        <View style={style.rowView}>
          {thirdPart.map((item, index) => {
            return matrixSquareInput(item, index + 6);
          })}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.columnView}>{matrixViewBuilder()}</View>
      <Text style={style.textStyle}>{`Winner is: ${winner}`}</Text>
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
});
export default App;
