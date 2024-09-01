import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Guess from "./Guess";
import Log from "./Log";
import { useRef, useState } from "react";
import Game from "./Game";

export default function App() {
  const game = useRef(new Game());
  const [log, setLog] = useState([]);

  function guess(guess) {
    const mappedGuess = guess.map(
      (value) => ({ A: 1, B: 2, C: 3, D: 4, E: 5, F: 6 }[value])
    );
    const result = game.current.guess(mappedGuess);
    result.sequence = guess;

    const newLog = log.slice();
    newLog.push(result);
    setLog(newLog);
  }

  return (
    <View style={styles.container}>
      <Log log={log} />
      <Guess onGuess={guess} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
