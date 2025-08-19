import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
    const [isPedometerAvailable, setIsPedometerAvailable] =
        useState("checking");
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);

    useEffect(() => {
        let subscription: any = null;
        const subscribe = async () => {
            const isAvailable = await Pedometer.isAvailableAsync();
            setIsPedometerAvailable(String(isAvailable));

            if (isAvailable) {
                const end = new Date();
                const start = new Date();
                start.setDate(end.getDate() - 1);

                const pastStepCountResult = await Pedometer.getStepCountAsync(
                    start,
                    end
                );
                if (pastStepCountResult) {
                    setPastStepCount(pastStepCountResult.steps);
                }

                subscription = Pedometer.watchStepCount((result) => {
                    setCurrentStepCount(result.steps);
                });
            }
        };

        subscribe();

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../assets/images/icon.png")}
                    style={styles.icon}
                />
                <Text style={styles.title}>Step Tracker</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Pedometer Status</Text>
                <Text style={styles.value}>
                    {isPedometerAvailable === "checking"
                        ? "Checking..."
                        : isPedometerAvailable === "true"
                        ? "Available"
                        : "Not Available"}
                </Text>
                <Text style={styles.label}>Steps in Last 24 Hours</Text>
                <Text style={styles.steps}>{pastStepCount}</Text>
                <Text style={styles.label}>Live Step Count</Text>
                <Text style={styles.liveSteps}>{currentStepCount}</Text>
            </View>
            <Text style={styles.motivation}>
                {currentStepCount > 0 || pastStepCount > 0
                    ? "Keep moving! Every step counts."
                    : "Start walking to see your steps!"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f6fc",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    icon: {
        width: 48,
        height: 48,
        marginRight: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#2e5aac",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 24,
        width: "100%",
        maxWidth: 350,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        color: "#888",
        marginTop: 12,
    },
    value: {
        fontSize: 18,
        fontWeight: "600",
        color: "#2e5aac",
    },
    steps: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#4caf50",
        marginVertical: 4,
    },
    liveSteps: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ff9800",
        marginVertical: 4,
    },
    motivation: {
        fontSize: 18,
        color: "#2e5aac",
        fontWeight: "500",
        textAlign: "center",
        marginTop: 10,
    },
});
