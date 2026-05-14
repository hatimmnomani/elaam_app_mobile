import { showAlert } from '../../common/CustomAlert';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import QuizService from '../services/quizService';
import {
   QUIZ_ACCESS_ERROR,
   QUIZ_ACCESS_LOADING,
   QUIZ_ACCESS_SUCCESS,
   QUIZ_ERROR,
   QUIZ_LOADED,
   QUIZ_LOADING,
   QUIZ_SUBMIT_ERROR,
   QUIZ_SUBMIT_LOADING,
   QUIZ_SUBMITTED,
   RESET_QUIZ,
   SET_ANSWER,
   SET_CURRENT_QUESTION,
   SUBMIT_ANSWER_ERROR,
   SUBMIT_ANSWER_LOADING,
   SUBMIT_ANSWER_SUCCESS,
   USER_QUIZZES_ERROR,
   USER_QUIZZES_LOADING,
   USER_QUIZZES_SUCCESS,
} from './types';

// Load quiz questions
export const loadQuiz = quizId => async dispatch => {
  try {
    dispatch({ type: QUIZ_LOADING });
    const response = await QuizService.getQuiz(quizId);
    dispatch({
      type: QUIZ_LOADED,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: QUIZ_ERROR,
      payload: error.response?.data?.message || 'Failed to load quiz',
    });
    showAlert({
      title: 'Error',
      message: 'Failed to load quiz. Please try again.',
    });
  }
};

// Submit a single answer and store result in Redux
export const submitAnswerAndStore =
  (quizId, { questionId, answer }) =>
  async dispatch => {
    try {
      dispatch({ type: SUBMIT_ANSWER_LOADING });
      const { data } = await QuizService.submitAnswer(quizId, {
        questionId,
        answer,
      });
      const result = data?.data;
      dispatch({ type: SUBMIT_ANSWER_SUCCESS, payload: result });
      return result;
    } catch (error) {
      dispatch({
        type: SUBMIT_ANSWER_ERROR,
        payload: error?.response?.data?.message || 'Failed to submit answer',
      });
      throw error;
    }
  };

// Fetch quizzes for the logged-in user
export const fetchUserQuizzes = () => async dispatch => {
  try {
    dispatch({ type: USER_QUIZZES_LOADING });
    const { data } = await QuizService.getUserQuizzes();
    const list = Array.isArray(data?.data) ? data.data : [];
    dispatch({ type: USER_QUIZZES_SUCCESS, payload: list });
    return list;
  } catch (error) {
    dispatch({
      type: USER_QUIZZES_ERROR,
      payload: error?.response?.data?.message || 'Failed to fetch quizzes',
    });
    return [];
  }
};

// Submit quiz answers
export const submitQuiz = (quizId, answers) => async dispatch => {
  try {
    dispatch({ type: QUIZ_SUBMIT_LOADING });
    const response = await QuizService.submitQuiz(quizId, answers);
    dispatch({
      type: QUIZ_SUBMITTED,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: QUIZ_SUBMIT_ERROR,
      payload: error.response?.data?.message || 'Failed to submit quiz',
    });
    showAlert({
      title: 'Error',
      message: 'Failed to submit quiz. Please try again.',
    });
    throw error;
  }
};

// Check if quiz is allowed for current user
export const checkQuizAccess = itsIdParam => async dispatch => {
  try {
    dispatch({ type: QUIZ_ACCESS_LOADING });
    let itsId = itsIdParam;
    if (!itsId) {
      itsId = await MyAsyncStorage.getItem('itsid');
    }
    if (!itsId) {
      dispatch({ type: QUIZ_ACCESS_SUCCESS, payload: false });
      return false;
    }
    const { data } = await QuizService.checkQuizAccess(itsId);
    const allowed = !!data?.data?.allowed;
    dispatch({ type: QUIZ_ACCESS_SUCCESS, payload: allowed });
    return allowed;
  } catch (error) {
    dispatch({
      type: QUIZ_ACCESS_ERROR,
      payload: error?.response?.data?.message || 'Failed to check quiz access',
    });
    return false;
  }
};

// Set current question
export const setCurrentQuestion = index => ({
  type: SET_CURRENT_QUESTION,
  payload: index,
});

// Set answer for a question
export const setAnswer = (questionId, answer) => ({
  type: SET_ANSWER,
  payload: { questionId, answer },
});

// Reset quiz state
export const resetQuiz = () => ({
  type: RESET_QUIZ,
});
