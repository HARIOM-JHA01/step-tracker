# Step Tracker

A beautiful and simple step tracking app built with Expo and React Native. Track your daily steps, view your progress, and stay motivated to move more every day!

## Features

-   Live step count using device pedometer
-   Steps taken in the last 24 hours
-   Modern, clean home screen UI
-   Motivational messages
-   Works on Android devices with step counter support

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/)
-   [Expo CLI](https://docs.expo.dev/get-started/installation/)
-   A physical Android device (step tracking does not work in emulators or Expo Go)

### Installation

1. Clone the repository:
    ```bash
    git clone <repo-url>
    cd step-tracker
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Add the required Android permission in `app.json`:
    ```json
    "android": {
      "permissions": ["ACTIVITY_RECOGNITION"]
    }
    ```

### Running the App

1. Start the Expo development server:
    ```bash
    npx expo start
    ```
2. Build a development client or preview build for full sensor support:
    ```bash
    npx expo run:android
    # or use EAS Build for a preview build
    ```
3. Install the app on your Android device and start walking!

## Project Structure

-   `app/` - Main app source code
-   `assets/` - App icons and images
-   `app.json` - Expo app configuration
-   `package.json` - Project dependencies and scripts

## Customization Ideas

-   Set daily step goals
-   Show calories burned and distance walked
-   View step history and trends
-   Achievements and badges
-   Reminders and notifications

## Work in Progress

-   [ ] Step goal and progress bar
-   [ ] Calories burned estimate
-   [ ] Distance walked calculation
-   [ ] Step history and trends
-   [ ] Achievements and badges
-   [ ] Reminders and notifications
-   [ ] Customizable themes
-   [ ] Share progress feature
-   [ ] Integration with health apps
-   [ ] User profile and settings

## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ using [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/).
