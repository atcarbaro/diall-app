## Prioritized list of problems identified

- Every time a user watch an entire video he earns some points which can be redeemed for a question to a therapist
  - I've implemented a gamification solution, I think this solution could help to solve two different problems.
    The one about users retention and the one about therapist without anything to work on.
    Once the user reach some specific amount of points (it could be determinated by UX later) he can redeem for question to the therapist.

- Allow users different ways to Sign In like Email or Google Auth.
  - Since I'm outside the US I  was struggling to Sign In using a domestical phone number. So I think a solution for this could be add
    email or google authentication. I did the first so I can test the feature I've implemented
  
- Retention beyond day 1 is low

- Because consumer users aren’t asking questions or retaining, our
therapist users don’t have anything to do

- Free trial initiation is low

- Therapist users aren’t able to “own” their audience, user engagement or
control their own destiny because they are competing with an open queue
of questions being submitted


## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:
