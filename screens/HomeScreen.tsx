import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(1000)} style={styles.content}>
        <Text style={styles.title}>Brain Master</Text>
        <Text style={styles.subtitle}>Challenge Your Mind</Text>
        
        <Image 
          source={{ uri: 'https://api.a0.dev/assets/image?text=colorful%20brain%20illustration%20modern%20minimal&aspect=1:1' }}
          style={styles.logo}
        />

        <Pressable 
          style={styles.playButton}
          onPress={() => navigation.navigate('LevelSelect')}
        >
          <Text style={styles.playButtonText}>Play</Text>
          <MaterialCommunityIcons name="play" size={24} color="#fff" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
    borderRadius: 100,
  },
  playButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    gap: 10,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});