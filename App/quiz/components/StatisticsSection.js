import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {quizTheme} from '../theme/quizTheme';

const StatisticsSection = ({title, statistics}) => {
  return (
    <View style={styles.container}>
      {/* Did you know title */}
      <Text style={styles.title}>{title}</Text>
      
      {/* Statistics list */}
      {statistics.map((stat, index) => (
        <Text key={index} style={styles.statisticText}>
          {stat}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: quizTheme.typography.sizes.header,
    fontWeight: quizTheme.typography.weights.medium,
    color: quizTheme.colors.text,
    fontFamily: quizTheme.typography.fontFamily,
    textAlign: 'center',
    marginBottom: 15,
  },
  statisticText: {
    fontSize: quizTheme.typography.sizes.body,
    fontWeight: quizTheme.typography.weights.medium,
    color: quizTheme.colors.text,
    fontFamily: quizTheme.typography.fontFamily,
    textAlign: 'center',
    lineHeight: 35,
    marginBottom: 10,
  },
});

export default StatisticsSection;