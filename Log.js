import { View, Text, StyleSheet } from "react-native";

function LogEntry({ sequence, matches, hits }) {
    return (
        <View style={styles.logEntry}>
            <Text>{sequence}</Text>
            <Text>{matches} matches, {hits} hits</Text>
        </View>
    )
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
})
