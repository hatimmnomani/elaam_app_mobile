// TrophyAwardImage Usage Examples and Test Cases
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TrophyAwardImage } from './components/TrophyAwardImage';

// Example usage patterns for TrophyAwardImage
export const TrophyAwardImageExamples = () => {
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
        TrophyAwardImage Examples
      </Text>

      {/* Example 1: Simple trophy with congratulations text */}
      <TrophyAwardImage
        imageSource={require('./assets/trophy.png')}
        overlayText="مبروك!"
        textPosition="bottom-center"
        textStyle={{
          fontSize: 18,
          color: '#FFD700',
          fontWeight: 'bold'
        }}
      />

      {/* Example 2: Achievement badge with score */}
      <TrophyAwardImage
        imageSource={require('./assets/badge.png')}
        overlayText="Score: 95%"
        textPosition="center"
        textStyle={{
          fontSize: 16,
          color: '#ffffff',
          fontWeight: 'bold'
        }}
      />

      {/* Example 3: Certificate with name */}
      <TrophyAwardImage
        imageSource={require('./assets/certificate.png')}
        overlayText="محمد أحمد"
        textPosition="top-center"
        textStyle={{
          fontSize: 14,
          color: '#8B4513',
          fontWeight: 'bold'
        }}
      />

      {/* Example 4: Award with date */}
      <TrophyAwardImage
        imageSource={require('./assets/medal.png')}
        overlayText="2024"
        textPosition="bottom-right"
        textStyle={{
          fontSize: 12,
          color: '#ffffff',
          fontWeight: 'bold'
        }}
      />

      {/* Example 5: Custom positioned text */}
      <TrophyAwardImage
        imageSource={require('./assets/ribbon.png')}
        overlayText="Winner!"
        textPosition="top-left"
        textStyle={{
          fontSize: 14,
          color: '#FF6B6B',
          fontWeight: 'bold'
        }}
      />
    </ScrollView>
  );
};

// Test cases for TrophyAwardImage positioning
export const testTrophyAwardImagePositions = () => {
  console.log('=== TrophyAwardImage Position Tests ===');

  const positions = [
    'top-left',
    'top-center',
    'top-right',
    'center',
    'bottom-left',
    'bottom-center',
    'bottom-right'
  ];

  const testResults = positions.map(position => {
    const style = getTextPositionStyle(position);
    return {
      position,
      hasTop: style.top !== undefined,
      hasLeft: style.left !== undefined,
      hasBottom: style.bottom !== undefined,
      hasRight: style.right !== undefined,
      hasTransform: style.transform !== undefined,
      textAlign: style.textAlign
    };
  });

  console.log('Position test results:', testResults);

  return testResults.every(result => {
    // Each position should have appropriate positioning properties
    switch (result.position) {
      case 'top-left':
      case 'top-center':
      case 'top-right':
        return result.hasTop === true;
      case 'bottom-left':
      case 'bottom-center':
      case 'bottom-right':
        return result.hasBottom === true;
      case 'center':
        return result.hasTransform === true;
      default:
        return false;
    }
  });
};

// Helper function to get text position styles (from TrophyAwardImage component)
const getTextPositionStyle = (textPosition) => {
  switch (textPosition) {
    case 'top-left':
      return { top: 20, left: 20, textAlign: 'left' };
    case 'top-right':
      return { top: 20, right: 20, textAlign: 'right' };
    case 'top-center':
      return { top: 20, left: '50%', transform: [{ translateX: -50 }], textAlign: 'center' };
    case 'bottom-left':
      return { bottom: 20, left: 20, textAlign: 'left' };
    case 'bottom-right':
      return { bottom: 20, right: 20, textAlign: 'right' };
    case 'bottom-center':
      return { bottom: 20, left: '50%', transform: [{ translateX: -50 }], textAlign: 'center' };
    case 'center':
    default:
      return {
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        textAlign: 'center'
      };
  }
};

// Dynamic content example
export const DynamicTrophyExample = ({ userName, score, achievement }) => {
  const getOverlayText = () => {
    if (achievement === 'perfect') return 'ممتاز!';
    if (achievement === 'excellent') return 'مبروك!';
    if (achievement === 'good') return 'جيد!';
    return 'مبروك!';
  };

  const getTextPosition = () => {
    if (score >= 90) return 'bottom-center';
    if (score >= 70) return 'center';
    return 'top-center';
  };

  return (
    <TrophyAwardImage
      imageSource={require('./assets/trophy.png')}
      overlayText={`${userName}\n${getOverlayText()}`}
      textPosition={getTextPosition()}
      textStyle={{
        fontSize: score >= 90 ? 18 : 14,
        color: score >= 90 ? '#FFD700' : '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center'
      }}
    />
  );
};
