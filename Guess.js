import { useReducer } from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";

function PegButton({ index, color, dispatch }) {
  return (
    <Pressable style={styles.peg} onPress={() => dispatch({ index })}>
      <Text style={styles.pegLabel}>{color}</Text>
    </Pressable>
  );
}

const nextColor = Object.freeze({
  A: "B",
  B: "C",
  C: "D",
  D: "E",
  E: "F",
  F: "A",
});

/**
 *
 * @param {string[]} state
 * @param {*} param1
 * @returns
 */
function changePeg(state, { index, newState }) {
  const result = state.slice();
  const current = state[index];

  if (Array.isArray(newState) && newState.length === 4) {
    return newState;
  }

  if (nextColor[current] === undefined) return state;

  result[index] = nextColor[current];
  return result;
}

export default function Guess({ complete, onGuess, onReset }) {
  const [guess, dispatch] = useReducer(changePeg, ["A", "A", "A", "A"]);

  return (
    <View style={styles.guess}>
      <View style={styles.pegContainer}>
        <PegButton index={0} color={guess[0]} dispatch={dispatch} />
        <PegButton index={1} color={guess[1]} dispatch={dispatch} />
        <PegButton index={2} color={guess[2]} dispatch={dispatch} />
        <PegButton index={3} color={guess[3]} dispatch={dispatch} />
      </View>
      <Pressable
        style={styles.guessButton}
        onPress={() => {
          if (complete) {
            dispatch({ newState: ["A", "A", "A", "A"] });
            onReset();
          } else onGuess(guess);
        }}
      >
        <Text style={styles.guessButtonLabel}>
          {complete ? "Restart" : "Guess!"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  guess: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 16,
    width: "100%",
    padding: 16,
  },
  pegContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  peg: {
    width: 64,
    height: 64,
    borderRadius: 5,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
  },
  pegLabel: {
    fontSize: 24,
  },
  guessButton: {
    height: 48,
    borderRadius: 5,
    backgroundColor: "#2066ff",
    alignItems: "center",
    justifyContent: "center",
  },
  guessButtonLabel: {
    color: "#e0e0e0",
    fontSize: 16,
  },
});
