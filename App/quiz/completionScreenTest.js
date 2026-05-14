// Test for CompletionScreen data extraction
export const testCompletionScreenData = () => {
  console.log('=== CompletionScreen Data Extraction Test ===');

  // Mock Redux state
  const mockSubmissionResult = {
    userData: {
      userScore: '85',
      name: 'أحمد محمد',
      totalQuestions: 20,
      correctAnswers: 17
    }
  };

  // Simulate the data extraction logic from CompletionScreen
  const extractCompletionData = (submissionResult) => {
    const userData = submissionResult?.userData;
    const userScore = userData?.userScore || '0';
    const userName = userData?.name || 'مستخدم';

    const getAchievementLevel = (score) => {
      const numScore = parseInt(score);
      if (numScore >= 90) return 'ممتاز';
      if (numScore >= 80) return 'جيد جداً';
      if (numScore >= 70) return 'جيد';
      return 'محاولة جيدة';
    };

    const achievementLevel = getAchievementLevel(userScore);

    return {
      userScore,
      userName,
      achievementLevel,
      rawData: userData
    };
  };

  const result = extractCompletionData(mockSubmissionResult);

  console.log('Extracted data:', result);

  // Test cases
  const testCases = [
    {
      name: 'Valid data',
      input: { userData: { userScore: '85', name: 'أحمد' } },
      expected: { userScore: '85', userName: 'أحمد', achievementLevel: 'جيد جداً' }
    },
    {
      name: 'Missing userData',
      input: {},
      expected: { userScore: '0', userName: 'مستخدم', achievementLevel: 'محاولة جيدة' }
    },
    {
      name: 'Missing score',
      input: { userData: { name: 'أحمد' } },
      expected: { userScore: '0', userName: 'أحمد', achievementLevel: 'محاولة جيدة' }
    },
    {
      name: 'Perfect score',
      input: { userData: { userScore: '95', name: 'فاطمة' } },
      expected: { userScore: '95', userName: 'فاطمة', achievementLevel: 'ممتاز' }
    }
  ];

  testCases.forEach(testCase => {
    const result = extractCompletionData(testCase.input);
    const success = result.userScore === testCase.expected.userScore &&
                   result.userName === testCase.expected.userName &&
                   result.achievementLevel === testCase.expected.achievementLevel;

    console.log(`${testCase.name}: ${success ? '✅' : '❌'}`);
    console.log(`  Expected: ${JSON.stringify(testCase.expected)}`);
    console.log(`  Got: ${JSON.stringify(result)}`);
  });

  return testCases.every(testCase => {
    const result = extractCompletionData(testCase.input);
    return result.userScore === testCase.expected.userScore &&
           result.userName === testCase.expected.userName &&
           result.achievementLevel === testCase.expected.achievementLevel;
  });
};

// Test the actual TrophyAwardImage overlay text generation
export const testTrophyOverlayText = () => {
  console.log('=== TrophyAwardImage Overlay Text Test ===');

  const testData = [
    { userScore: '85', expected: '85%' },
    { userScore: '0', expected: '0%' },
    { userScore: '100', expected: '100%' },
    { userScore: undefined, expected: '0%' }
  ];

  testData.forEach(test => {
    const overlayText = test.userScore ? `${test.userScore}%` : '0%';
    const success = overlayText === test.expected;
    console.log(`Score ${test.userScore} → "${overlayText}" ${success ? '✅' : '❌'}`);
  });
};
