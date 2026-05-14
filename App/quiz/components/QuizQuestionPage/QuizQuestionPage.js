import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Color } from '../../../constants';
import QuestionHeader from './QuestionHeader';
import QuestionTitle from './QuestionTitle';
import QuestionContent from './QuestionContent';
import OptionButton from './OptionButton';
import BackButton from './BackButton';
import { appScreen } from '../../../utils/responsive/SizeUtil';
import CommonButton from './CommonButton';

const QuizQuestionPage = ({
  questionTitle,
  questionDescription,
  websiteOptions,
  onOptionSelect,
  onBackPress,
  onSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = option => {
    setSelectedOption(option);
    onOptionSelect && onOptionSelect(option);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Question Header */}
        <QuestionHeader />

        {/* Question Title */}
        <QuestionTitle title={questionTitle} />

        {/* Question Content */}
        <QuestionContent questionDescription={questionDescription} />

        {/* Website Options */}
        <View style={styles.optionsContainer}>
          {websiteOptions.map((option, index) => (
            <OptionButton
              key={index}
              text={option}
              onPress={() => handleOptionPress(option)}
              isSelected={selectedOption === option}
            />
          ))}
        </View>

        {/* Back Button */}
        {/* Buttons Container */}
        <View style={styles.buttonsContainer}>
          <CommonButton
            text="Back"
            onPress={onBackPress}
            isBackButton={true}
            style={styles.button}
          />
          {selectedOption && (
            <CommonButton
              text="Submit"
              onPress={() => onSubmit(selectedOption)}
              isBackButton={false}
              style={[styles.button, styles.submitButton]}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    width: appScreen.width,
    alignSelf: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginTop: 20,
  },
  button: {
    width: '48%',
  },
  submitButton: {
    backgroundColor: Color.titleColor,
  },
});

export default QuizQuestionPage;
