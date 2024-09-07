import { View, Text, StyleSheet } from "react-native";

function LogEntry({ sequence, matches, hits }) {
  return (
    <View style={styles.logEntry}>
      <Text style={styles.logGuess}>{sequence}</Text>
      <Text style={styles.logIcons}>
        {"".concat(
          ...(function* (matches, hits) {
            for (let i = 0; i < matches; ++i) yield "\ue86c";
            for (let i = 0; i < hits; ++i) yield "\uef4a";
          })(matches, hits)
        )}
      </Text>
    </View>
  );
}

export default function Log({ log }) {
  return (
    <View style={styles.log}>
      {log.map((entry) => (
        <LogEntry {...entry} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  log: {
    width: "100%",
    paddingHorizontal: 16,
  },
  logEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logGuess: {
    fontSize: 16,
  },
  logIcons: {
    fontFamily: "MaterialSymbols",
    fontSize: 16,
  },
});
