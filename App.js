import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [roastLine, setRoastLine] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [buttonScale] = useState(new Animated.Value(1));
  const titleAnim = useRef(new Animated.Value(0)).current;
  const inputAnim = useRef(new Animated.Value(0)).current;
  const messageOpacity = useRef(new Animated.Value(0)).current;

  const roastMessages = [
    "Did you really think that would work?",
    "Forecast says: 100% chance of you being clueless.",
    "Your weather sense is as clear as mud.",
    "You couldn't forecast toast in a toaster",
    "I’m surprised you found this app with that brain.",
    "Go outside! Maybe you’ll get a brain cell too.",
    "Even the clouds are rolling their eyes at you.",
    "Go outside-nature might reboot your brain",
    "You're like a cloud-full of nothing and blocking the sun.",
    "You must be the reason global warming is so bad.",
    "If clueless had a forecast, you'd be you.",
    "If common sense was weather, you'd be in a drought.",
    "Your weather IQ is below freezing.",
    "The clouds say 'try again.... never'.",
    "Forecasting? You can't even spell 'weather'.",
    "Honestly, the sky is clearer than your logic.",
    "Why ask the app when your brain’s empty?",
    "Forecast blocked. Even satellites are ashamed.",
    "Try opening your eyes instead of this app.",
    "The sun called; it’s laughing at you.",
    "You're like humidity-annoying and unnecessary.",
    "You're the storm the forecast warned about.",
    "The weather's changing-unlike your IQ.",
    "You typed your location like it was a quiz and still failed.",
    "It’s not foggy outside, just in your head.",
    "Forecast update: total confusion incoming-and you're the reason.",
    "Your logic forecast: 100% cloudy.",
    "If guesses were weather, you'd be wrong every time.",
    "You need Google, not this app.",
    "The wind blew your sense of reason away.",
    "Forecast result: Try again... but maybe don’t.",
    "If I had a rupee for every stupid thing you did, I'd buy a new weather app",
    "Your IQ is lower than today's temperature.",
    "You skipped brain day at the gym, huh?",
    "I'd give you a forecast, but you'd still get lost.",
    "Checking the sky is free, genius.",
    "Just go outside, maybe the fresh air will reboot you.",
    "This app has seen things... mostly your nonsense.",
    "You're the human version of software crash.",
    "If thinking was a storm, you'd be in a drought.",
    "Forecast: 99% chance you’ll ask again.",
    "Even clouds avoid your location.",
    "Wind speed? As fast as your bad ideas.",
    "Congrats, you just made the sun hide.",
    "Weather check? More like brain check.",
    "If dumb was a direction, you'd be the compass.",
    "Forecast tip: Open your window.",
    "you're a walking weather warning.",
    "Forecast says: stay inside, avoid this persion.",
    "The sky called-it wants its star back.",
    "Girl, you don't need the sun. You are the Sun.",
    "Your IQ just triggered a thunderstorm.",
    "Honestly, the sky is clearer than your logic.",
    "App says: 'Bro, step outside.'"
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(inputAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCheckWeather = () => {
    if (location.trim() === '') {
      setMessage('Please enter a location');
      setRoastLine('');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setRoastLine('');

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * roastMessages.length);
      setMessage('Go check Outside');
      setRoastLine(roastMessages[randomIndex]);

      messageOpacity.setValue(0);
      Animated.timing(messageOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      setIsLoading(false);
      Keyboard.dismiss();
    }, 1500);
  };

  const onPressIn = () => {
    if (!isLoading) {
      Animated.spring(buttonScale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    }
  };

  const onPressOut = () => {
    if (!isLoading) {
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <LinearGradient colors={['#89f7fe', '#66a6ff']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
      >
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: titleAnim,
              transform: [
                {
                  translateY: titleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          Weather Forecast
        </Animated.Text>

        <Animated.View
          style={{
            transform: [{ scale: inputAnim }],
            width: '100%',
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter location"
            placeholderTextColor="#666"
            value={location}
            onChangeText={setLocation}
            returnKeyType="done"
            onSubmitEditing={handleCheckWeather}
            editable={!isLoading}
          />
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.button, isLoading && { opacity: 0.7 }]}
            onPress={handleCheckWeather}
            activeOpacity={0.8}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Get Forecast</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        {message !== '' && (
          <Animated.Text style={[styles.message, { opacity: messageOpacity }]}>
            {message}
          </Animated.Text>
        )}
        {roastLine !== '' && (
          <Animated.Text style={[styles.roast, { opacity: messageOpacity }]}>
            {roastLine}
          </Animated.Text>
        )}
        {roastLine !== '' && (
          <Animated.Text style={[styles.signature, { opacity: messageOpacity }]}>
            ~ Sk Ibrahim
          </Animated.Text>
        )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    width: '100%',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 36,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#333',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#005CFF',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  message: {
    fontSize: 22,
    fontWeight: '500',
    color: '#fff',
    marginTop: 28,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  roast: {
    fontSize: 17,
    fontStyle: 'italic',
    color: '#f0f0f0',
    marginTop: 12,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  signature: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#dddddd',
    marginTop: 8,
    textAlign: 'center',
  },
});
