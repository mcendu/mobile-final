import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Guess from "./Guess";
import Log from "./Log";
import { useRef, useState } from "react";
import Game from "./Game";
import { useFonts } from "expo-font";

export default function App() {
  useFonts({
    "MaterialSymbols": require("./assets/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf"),
  });

  const game = useRef(null);
  if (game.current === null)
    game.current = new Game();

  const [log, setLog] = useState([]);
  const [complete, setComplete] = useState(false);

  function guess(guess) {
    const mappedGuess = guess.map(
      (value) => ({ A: 1, B: 2, C: 3, D: 4, E: 5, F: 6 }[value])
    );
    const result = game.current.guess(mappedGuess);
    result.sequence = guess;
    result.key = log.length;

    if (result.matches === 4) setComplete(true);

    const newLog = log.slice();
    newLog.push(result);
    setLog(newLog);
  }

  function reset() {
    setComplete(false);
    setLog([]);
    game.current.start();
  }

  return (
    <View style={styles.container}>
      <Log log={log} />
      <Guess onGuess={guess} onReset={reset} complete={complete} />
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
