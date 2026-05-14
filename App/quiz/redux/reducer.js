import {
  QUIZ_LOADING,
  QUIZ_LOADED,
  QUIZ_ERROR,
  QUIZ_SUBMIT_LOADING,
  QUIZ_SUBMITTED,
  QUIZ_SUBMIT_ERROR,
  SET_CURRENT_QUESTION,
  SET_ANSWER,
  RESET_QUIZ,
  QUIZ_ACCESS_LOADING,
  QUIZ_ACCESS_SUCCESS,
  QUIZ_ACCESS_ERROR,
  USER_QUIZZES_LOADING,
  USER_QUIZZES_SUCCESS,
  USER_QUIZZES_ERROR,
  SUBMIT_ANSWER_LOADING,
  SUBMIT_ANSWER_SUCCESS,
  SUBMIT_ANSWER_ERROR,
} from './types';

const initialState = {
  loading: false,
  quiz: null,
  error: null,
  currentQuestionIndex: 0,
  answers: {},
  submitLoading: false,
  submitError: null,
  result: null,
  // Access state
  accessLoading: false,
  accessAllowed: false,
  accessError: null,
  // User quizzes list
  quizzesLoading: false,
  quizzes: [],
  quizzesError: null,
  // Last submission result
  submissionLoading: false,
  submissionResult: null,
  submissionError: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUIZ_ACCESS_LOADING:
      return {
        ...state,
        accessLoading: true,
        accessError: null,
      };

    case QUIZ_ACCESS_SUCCESS:
      return {
        ...state,
        accessLoading: false,
        accessAllowed: !!action.payload,
        accessError: null,
      };

    case QUIZ_ACCESS_ERROR:
      return {
        ...state,
        accessLoading: false,
        accessAllowed: false,
        accessError: action.payload,
      };

    case QUIZ_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case QUIZ_LOADED:
      return {
        ...state,
        loading: false,
        quiz: action.payload,
        error: null,
        currentQuestionIndex: 0,
        answers: {},
        result: null
      };

    case QUIZ_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case QUIZ_SUBMIT_LOADING:
      return {
        ...state,
        submitLoading: true,
        submitError: null
      };

    case QUIZ_SUBMITTED:
      return {
        ...state,
        submitLoading: false,
        result: action.payload,
        submitError: null
      };

    case QUIZ_SUBMIT_ERROR:
      return {
        ...state,
        submitLoading: false,
        submitError: action.payload
      };

    case USER_QUIZZES_LOADING:
      return {
        ...state,
        quizzesLoading: true,
        quizzesError: null,
      };

    case USER_QUIZZES_SUCCESS:
      return {
        ...state,
        quizzesLoading: false,
        quizzes: action.payload || [],
        quizzesError: null,
      };

    case USER_QUIZZES_ERROR:
      return {
        ...state,
        quizzesLoading: false,
        quizzesError: action.payload,
      };

    case SUBMIT_ANSWER_LOADING:
      return {
        ...state,
        submissionLoading: true,
        submissionError: null,
      };

    case SUBMIT_ANSWER_SUCCESS:
      return {
        ...state,
        submissionLoading: false,
        submissionResult: action.payload,
        submissionError: null,
      };

    case SUBMIT_ANSWER_ERROR:
      return {
        ...state,
        submissionLoading: false,
        submissionError: action.payload,
      };

    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: action.payload
      };

    case SET_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer
        }
      };

    case RESET_QUIZ:
      return initialState;

    default:
      return state;
  }
};

export default quizReducer;
