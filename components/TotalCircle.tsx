import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { getSegmentColor } from '../functions/SegmentColor';
import { formatText } from '../functions/numberTextFixed';

interface ProgressCircleProps {
  values: number[];
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ values }) => {
  const strokeWidth = 20; // Ejemplo de grosor de trazo
  const radius = 110 - strokeWidth; // Ajusta el radio en función del grosor del trazo
  const circumference = 2 * Math.PI * radius;
  const total = values.reduce((acc, val) => acc + val, 0);

  // Ordenar los valores en orden descendente
  const sortedValues = [...values].sort((a, b) => b - a);

  let offset = 0;

  return (
    <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth} style={styles.svg}>
      {/* Fondo del círculo */}
      <Circle
        cx={radius + strokeWidth / 2}
        cy={radius + strokeWidth / 2}
        r={radius}
        stroke="#e0e0e0"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Segmentos */}
      {sortedValues.map((value, index) => {
        const percentage = (value / total) * 100;
        const strokeDasharray = circumference * (percentage / 100);
        const segmentColor = getSegmentColor(index);

        const segment = (
          <Circle
            key={index}
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke={segmentColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${strokeDasharray} ${circumference - strokeDasharray}`}
            strokeDashoffset={-offset}
            transform={`rotate(${180} ${radius + strokeWidth / 2} ${radius + strokeWidth / 2})`}
          />
        );

        offset += strokeDasharray;
        return segment;
      })}
    </Svg>
  );
};

interface TotalCircleProps {
  children: string;
  values: number[];
}


const TotalCircle: React.FC<TotalCircleProps> = ({ children, values }) => {
    // Formatear el número
    const formattedText = formatText(children);
  
    let fontSize = 48

    if (children.length > 4) {
      fontSize =  40
    }


    return (
      <View style={styles.container}>
        <View style={children.length > 4?(styles.textBigContainer):(styles.textContainer)}>
          {formattedText.split('.').map((line, index, array) => (
            <Text key={index} style={{ fontSize }}>
              {line}{index !== array.length - 1 && '.'}
            </Text>
          ))}
        </View>
        <View style={styles.progressContainer}>
          <ProgressCircle values={values} />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    width: 170,
    position: 'relative', // Ensures the text and circle are correctly positioned
  },
  textContainer: {
    alignItems: 'center',
    left:5,
    top: -10,
    
  },
  textBigContainer: {
    alignItems: 'center',
  },
  progressContainer: {
    position: 'absolute',
  },
  svg: {
    transform: [{ rotate: '90deg' }],
   }, 
});

export default TotalCircle;
