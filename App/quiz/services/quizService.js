import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import quizHttpClient from './quizHttpClient';

class QuizService {
  
  // Get quiz details by ID
  static getQuiz(quizId) {
    return quizHttpClient.get(`/api/quiz/${quizId}`);
  }

  // Get quizzes for the logged-in user
  static getUserQuizzes() {
    return quizHttpClient.get(`/api/v1/quizzes/user`);
  }

  // Submit quiz answers
  static submitQuiz(quizId, answers) {
    return quizHttpClient.post(`/api/quiz/${quizId}/submit`, { answers });
  }

  // Submit a single answer for a question in a quiz
  static submitAnswer(quizId, { questionId, answer }) {
    return quizHttpClient.post(`/api/v1/quizzes/${quizId}/submit-answer`, {
      questionId,
      answer,
    });
  }

  // Get user's quiz history
  static getQuizHistory(userId) {
    return quizHttpClient.get(`/api/user/${userId}/quizzes`);
  }

  // Check if user has access to quiz
  static checkQuizAccess(itsId) {
    return quizHttpClient.get(`/api/v1/public/user-quiz-access`, {
      params: { itsId },
    });
  }

  // Get quiz results
  static getQuizResults(quizId, attemptId) {
    return quizHttpClient.get(`/api/quiz/${quizId}/results/${attemptId}`);
  }

  // Fetch certificate image
  static async getCertificateImage(score, name) {
    const apiUrl = `${
      quizHttpClient.defaults.baseURL
    }/api/v1/reports/cerificate?score=${encodeURIComponent(
      score,
    )}&name=${encodeURIComponent(name)}`;
    MyConsole.log('=== CERTIFICATE API REQUEST ===');
    MyConsole.log('CURL Command:');
    MyConsole.log(
      `curl -X GET "${apiUrl}" -H "Content-Type: application/json" -H "Authorization: Bearer [TOKEN]" -o certificate.png`,
    );
    MyConsole.log('API URL:', apiUrl);

    const token = await this.getAuthToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    };

    MyConsole.log('Request Headers:', JSON.stringify(headers, null, 2));

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
      });

      MyConsole.log('=== RESPONSE ===');
      MyConsole.log('Status:', response.status);
      MyConsole.log('Status Text:', response.statusText);
      MyConsole.log(
        'Response Headers:',
        Object.fromEntries(response.headers.entries()),
      );

      if (!response.ok) {
        MyConsole.log(`Failed to fetch image: ${response.status}`);
        const errorText = await response.text();
        MyConsole.log('Error Response Body:', errorText);
        return null;
      }

      const arrayBuffer = await response.arrayBuffer();
      MyConsole.log(
        'Response Body: ArrayBuffer (length:',
        arrayBuffer.byteLength,
        'bytes)',
      );

      return arrayBuffer;
    } catch (error) {
      MyConsole.log('=== ERROR ===');
      MyConsole.log('Error fetching image:', error);
      return null;
    }
  }

  // Helper to get auth token
  static async getAuthToken() {
    const token = await MyAsyncStorage.getItem('userToken');
    return token;
  }
}

export default QuizService;
