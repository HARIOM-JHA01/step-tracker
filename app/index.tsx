import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
    const [isPedometerAvailable, setIsPedometerAvailable] =
        useState("checking");
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);
    const [dailyStepGoal] = useState(10000);

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

    // Calculate progress towards daily goal using today's total steps
    const totalSteps = pastStepCount + currentStepCount;
    const progressPercentage = Math.min((totalSteps / dailyStepGoal) * 100, 100);
    const remainingSteps = Math.max(dailyStepGoal - totalSteps, 0);

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
                
                <Text style={styles.label}>Daily Step Goal</Text>
                <Text style={styles.goalText}>{dailyStepGoal.toLocaleString()}</Text>
                
                <Text style={styles.label}>Today&apos;s Progress</Text>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBarBackground}>
                        <View 
                            style={[
                                styles.progressBarFill,
                                { width: `${progressPercentage}%` }
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>
                        {totalSteps.toLocaleString()} / {dailyStepGoal.toLocaleString()}
                    </Text>
                </View>
                <Text style={styles.progressPercentage}>
                    {progressPercentage.toFixed(1)}% Complete
                </Text>
                
                <Text style={styles.label}>Steps in Last 24 Hours</Text>
                <Text style={styles.steps}>{pastStepCount}</Text>
                <Text style={styles.label}>Live Step Count</Text>
                <Text style={styles.liveSteps}>{currentStepCount}</Text>
            </View>
            <Text style={styles.motivation}>
                {totalSteps >= dailyStepGoal
                    ? "🎉 Congratulations! You&apos;ve reached your daily goal!"
                    : totalSteps > 0
                    ? `Keep going! Only ${remainingSteps.toLocaleString()} steps to reach your goal.`
                    : "Start walking to begin your journey towards your daily goal!"}
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
    goalText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2e5aac",
        marginVertical: 4,
    },
    progressContainer: {
        marginVertical: 8,
    },
    progressBarBackground: {
        height: 12,
        backgroundColor: "#e0e0e0",
        borderRadius: 6,
        overflow: "hidden",
        marginBottom: 8,
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: "#4caf50",
        borderRadius: 6,
    },
    progressText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        textAlign: "center",
    },
    progressPercentage: {
        fontSize: 14,
        color: "#4caf50",
        fontWeight: "600",
        textAlign: "center",
        marginTop: 4,
    },
});
