import moment from 'moment';

const STRING = {
  /*superAdmin Screen */
  Jamiat: 'Jamiat',
  Jamaat: 'Jamaat',
  Umoor: 'Umoor',
  Department: 'Department',
  Niyat: 'Niyat',
  FMB_DASHBOARD: 'FMB Dashboard',
  HQHB_Dashboard: 'HQHB Dashboard',
  Mahad_Al_Zahra_Dashboard: 'Mahad al Zahra Dashboard',
  Dashboard: 'DASHBOARD',
  defaultStartDate: moment().subtract(240, 'month').format('YYYY-MM-DD'), //'2002-09-30',
  UmoorHMessage:
    'Message will be sent to all Umoor Heads. If you want to send message to an individual Umoor Head please select only those Umoors.',
  DepartmentHMessage:
    'Message will be sent to all Department Heads. If you want to send message to an individual Department Heads please select only those Departments.',
  AamilSMessage:
    'Message will be sent to all Jamaat Aamil. If you want to send message to an individual Aamil please select only those Jamaat.',
  JamiatMMessage:
    'Message will be sent to all Jamiat Masool. If you want to send message to an individual Jamiat Masool please select only those Jamiat.',
  UmoorC:
    'Message will be sent to all Umoor Coordinator . If you want to send message to an individual Umoor Coordinator please select only those Umoors.',

  /* MuminDashboard Screens */
  Reward: 'REWARD',
  Trophies_Redeemed: 'Trophies Redeemed:',
  REDEEM_NOW_Button: 'REDEEM NOW',
  Total_Niyat_Done: 'Total Niyat Done-All over the World',
  Level_Gold: 'Level-Gold',
  Total_Niyat_Global: '1000',
  TOTAL_NIYATS: 'TOTAL NIYATS',
  ACTIVE: 'ACTIVE',
  APPROVAL_PENDING: 'APPROVAL PENDING',
  COMPLETED: 'COMPLETED',

  /* Catalogue Screens */

  Catalogue: 'Catalogue',
  Catalogue_detail: 'Catalogue Details',
  Trophies_to_Redeem: 'Trophies to Redeem:',
  Confirm: 'CONFIRM',
  Cancel: 'CANCEL',
  NOTHAVE: " YOU DON'T HAVE ENOUGH TROPHIES TO REDEEM",
  HAVE: 'Will Be Consumed From Your Trophy Balance.',
  SearchbyUMOOR: 'Search by UMOOR',

  /* Login Screen */

  Copyright: '© Elaam ' + new Date().getFullYear() + ' All rights reserved |',
  LOGIN: 'LOGIN',
  LoginDesc: 'By logging in, you are agreeing Elaam’s T&C.',
  ForgetPassword: 'Forgot Password ?',
  RememberMe: 'Remember Me',
  ITSIDMsg: 'ITS ID should be 8 digits ',
  ITSLOGIN: 'LOGIN',

  /* niyatStatus */

  DownloadMsg: 'Your form has been downloaded',

  /* Approval Dashboard Screen */

  APPROVED_NIYATS: 'APPROVED NIYATS',

  /* Approve Niyat information screen */

  requestSubmitMsg:
    'Your Niyat request has been submitted. Following are the respective approvers. Once they approve. you will get trophies.',
  PrivacyPolicy: 'Privacy Policy',
  RedeemTxt: 'REDEEM YOUR TROPHY',
  AchieveTxt: 'MY ACHIEVEMENTS',
  cameraPermission: 'Allow elaam to access your camera',
  galleryHeadingPermission: 'Allow Elaam to access your gallery',
  galleryDescPermission:
    'Elaam need to access your phones photo library to upload and select barcode photo.',

  /* Screen Name*/
  NotificationScreen: 'NotificationScreen',
  RewardList: 'RewardList',
  CatalogueScreen: 'CatalogueScreen',
  ApproveCatalogue: 'ApproveCatalogue',
  Scanner: 'Scanner',
  ApprovalScreen: 'ApprovalScreen',
  SuperAdminScreen: 'SuperAdminScreen',
  MuminScreen: 'MuminScreen',
  ApproveNiyatInfo: 'ApproveNiyatInfo',
  ActiveNiyatList: 'ActiveNiyatList',
  NiyatInfromationScreen: 'NiyatInfromationScreen',
  WelcomeScreen: 'WelcomeScreen',
  CompletionScreen: 'CompletionScreen',
  NiyatList: 'NiyatList',
  SendMessage: 'SendMessage',
  Filter: 'Filter',
  LaunchScreen: 'LaunchScreen',
  LoginScreen: 'LoginScreen',
  SuperAdminDrawerNavigators: 'SuperAdminDrawerNavigators',
  ApproveDrawerNavigators: 'ApproveDrawerNavigators',
  MuminDrawerNavigators: 'MuminDrawerNavigators',

  Quiz: 'Quiz',
  IstefadaIlmiyaQuiz: 'Istefada Ilmiya Quiz',
};
export default STRING;

export const urls = {
  GET_ALL_JAMAAT: '/api/getAllJamaat',
  GET_ALL_JAMIAT: '/api/getAllJamiat',
  GET_ALL_ACTIVE_UMOOR: '/api/getAllActiveUmoor',
  GET_ALL_ACTIVE_DEPART: '/api/getAllActiveDepartments',
  GET_ALL_NIYAT: '/api/get-all-niyat-question',
  USER_REFRESH_TOKEN: '/useRefreshToken',
};

export const selectTime = [
  'Last 1 Month',
  'Last 3 Month',
  'Last 6 Month',
  '1 year',
  'All',
];

export const contactNo = {
  support1: '+91 9326179816',
  support2: '+91 9324625416',
  support3: '+91 9326173664',
  helpLineTime: 'Timings(Mon-Sat)',
  startTime: '10:30 am to 1:30 pm(IST)',
  endTime: '2:30 pm to 6:30 pm(IST)',
};
