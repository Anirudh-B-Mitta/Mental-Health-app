import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Text, G, Line } from 'react-native-svg';

const Speedometer = ({ value, maxValue, label }) => {
  const radius = 80;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / maxValue) * circumference;

  return (
    <View style={styles.container}>
      <Svg height="200" width="200">
        <Circle
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
        />
        <Circle
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke="#4caf50"
          strokeWidth={strokeWidth}
          strokeDasharray={`${progress}, ${circumference}`}
        />
        <G transform={{ translateY: 20 }}>
          <Text x="100" y="100" textAnchor="middle" fontSize="20" fill="#4caf50">
            {value}
          </Text>
          <Text x="100" y="130" textAnchor="middle" fontSize="14" fill="#4caf50">
            {label}
          </Text>
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default Speedometer;
