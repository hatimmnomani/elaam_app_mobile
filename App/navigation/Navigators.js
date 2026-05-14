/* eslint-disable no-shadow */
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  NotificationScreen,
  WelcomeScreen,
  MuminScreen,
  LoginScreen,
  ApprovalScreen,
  NiyatInfromationScreen,
  CatalogueScreen,
  ApproveNiyatInfo,
  ApproveCatalogue,
  Auth,
  ITSLOGIN,
  SuperAdminScreen,
  NiyatList,
  WebScreen,
} from '../screens';
import { DrawerContent } from './DrawerContent';
import { ActiveNiyatList } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Filter from '../screens/SuperAdminDashboard/Filter';
import SendMessage from '../screens/SuperAdminDashboard/SendMessage';
import {
  createNavigationContainerRef,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import RewardList from '../screens/ApproveCatalogue/RewardList';
import Launch from '../screens/SuperAdminDashboard/Launch';
import { Dimensions } from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import Scanner from '../screens/Scanner/Scanner';
import { MyConsole } from '../utils/MyConsole';
import { useDispatch, useSelector } from 'react-redux';
import { drawerTabSelect } from './DrawerTabSelect';
import { Color, string } from '../constants';
import QuizDescriptionScreen from '../quiz/screens/QuizDescription/QuizDescriptionScreen';
import QuizQuestionScreen from '../quiz/screens/QuizQuestion/QuizQuestionScreen';
import QuizResultScreen from '../quiz/screens/QuizResult/QuizResultScreen';
import PrizePageScreen from '../quiz/screens/PrizePage/PrizePageScreen';
import CompletionScreen from '../quiz/screens/Completion/CompletionScreen';
const windowWidth = Dimensions.get('window').width;
const Authentication = createNativeStackNavigator();

export const AuthenticationNavigation = props => {
  return (
    <Authentication.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Auth"
    >
      <Authentication.Screen
        name="Auth"
        component={Auth}
        option={{ title: 'Auth', headerTitleAlign: 'center' }}
      />
      <Authentication.Screen
        name={string.LoginScreen}
        component={LoginScreen}
        option={{ title: string.LoginScreen, headerTitleAlign: 'center' }}
      />
      <Authentication.Screen
        name={string.LaunchScreen}
        component={Launch}
        option={{ title: string.LoginScreen, headerTitleAlign: 'center' }}
      />
      <Authentication.Screen
        name="ITSLOGIN"
        component={ITSLOGIN}
        option={{ title: 'ITSLOGIN', headerTitleAlign: 'center' }}
      />
      <Authentication.Screen
        name={string.PrivacyPolicy}
        component={WebScreen}
        options={{
          headerShown: true,
          headerTintColor: Color.titleColor,
          headerStyle: {
            backgroundColor: Color.bgColor,
          },
        }}
      />
    </Authentication.Navigator>
  );
};

const MuminDrawer = createDrawerNavigator();

export const MuminDrawerNavigators = props => {
  return (
    <MuminDrawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: deviceInfoModule.isTablet() ? '30%' : '50%',
        },
      }}
      backBehavior="initialRoute"
      initialRouteName={string.MuminScreen}
    >
      <MuminDrawer.Screen
        name={string.MuminScreen}
        component={MuminScreen}
        options={{ headerShown: false }}
      />
      <MuminDrawer.Screen
        name={string.ActiveNiyatList}
        component={ActiveNiyatList}
        options={{ headerShown: false }}
      />
      <MuminDrawer.Screen
        name={string.NiyatInfromationScreen}
        component={NiyatInfromationScreen}
        options={{ headerShown: false }}
      />
      <MuminDrawer.Screen
        name={string.ApprovalScreen}
        component={ApprovalScreen}
        options={{ headerShown: false }}
      />
      <MuminDrawer.Screen
        name={string.NotificationScreen}
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <MuminDrawer.Screen
        name={string.PrivacyPolicy}
        component={WebScreen}
        options={{ headerShown: false }}
      />

      <MuminDrawer.Screen
        name={string.CatalogueScreen}
        component={CatalogueScreen}
        options={{ headerShown: false }}
      />
      <MuminDrawer.Screen
        name={string.Scanner}
        component={Scanner}
        options={{
          headerShown: true,
          headerTintColor: Color.titleColor,
          headerStyle: {
            backgroundColor: Color.bgColor,
          },
        }}
      />
    </MuminDrawer.Navigator>
  );
};

const ApproveDrawer = createDrawerNavigator();

export const ApproveDrawerNavigators = props => {
  return (
    <ApproveDrawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: deviceInfoModule.isTablet() ? '30%' : '50%',
        },
      }}
      backBehavior="initialRoute"
      initialRouteName={string.ApprovalScreen}
    >
      <ApproveDrawer.Screen
        name={string.ApprovalScreen}
        component={ApprovalScreen}
        options={{ headerShown: false }}
      />
      <ApproveDrawer.Screen
        name={string.NotificationScreen}
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <ApproveDrawer.Screen
        name={string.PrivacyPolicy}
        component={WebScreen}
        options={{ headerShown: false }}
      />

      <ApproveDrawer.Screen
        name={string.ActiveNiyatList}
        component={ActiveNiyatList}
        options={{ headerShown: false }}
      />
      <ApproveDrawer.Screen
        name={string.MuminScreen}
        component={MuminScreen}
        options={{ headerShown: false }}
      />
      <ApproveDrawer.Screen
        name={string.ApproveNiyatInfo}
        component={ApproveNiyatInfo}
        options={{ headerShown: false }}
      />
      <ApproveDrawer.Screen
        name={string.CatalogueScreen}
        component={CatalogueScreen}
        options={{ headerShown: false }}
      />
      <ApproveDrawer.Screen
        name={string.ApproveCatalogue}
        component={ApproveCatalogue}
        options={{ headerShown: false }}
      />
      <ApproveDrawer.Screen
        name={string.RewardList}
        component={RewardList}
        options={{ headerShown: false }}
      />
      <ApproveDrawer.Screen
        name={string.Scanner}
        component={Scanner}
        options={{
          headerShown: true,
          headerTintColor: Color.titleColor,
          headerStyle: {
            backgroundColor: Color.bgColor,
          },
        }}
      />
    </ApproveDrawer.Navigator>
  );
};

const SuperAdminDrawer = createDrawerNavigator();

export const SuperAdminDrawerNavigators = props => {
  return (
    <SuperAdminDrawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: deviceInfoModule.isTablet() ? '30%' : '50%',
        },
      }}
      backBehavior="initialRoute"
      initialRouteName={string.SuperAdminScreen}
    >
      <SuperAdminDrawer.Screen
        name={string.LaunchScreen}
        component={Launch}
        options={{ headerShown: false }}
      />
      <SuperAdminDrawer.Screen
        name={string.SuperAdminScreen}
        component={SuperAdminScreen}
        options={{ headerShown: false }}
      />
      <SuperAdminDrawer.Screen
        name={string.NiyatList}
        component={NiyatList}
        options={{ headerShown: false }}
      />
      <SuperAdminDrawer.Screen
        name={string.SendMessage}
        component={SendMessage}
        options={{ headerShown: false }}
      />
      <SuperAdminDrawer.Screen
        name={string.Filter}
        component={Filter}
        options={{ headerShown: false }}
      />
      <SuperAdminDrawer.Screen
        name={string.NotificationScreen}
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <SuperAdminDrawer.Screen
        name={string.PrivacyPolicy}
        component={WebScreen}
        options={{ headerShown: false }}
      />

      <SuperAdminDrawer.Screen
        name={string.ApproveNiyatInfo}
        component={ApproveNiyatInfo}
        options={{ headerShown: false }}
      />

      <SuperAdminDrawer.Screen
        name={string.Scanner}
        component={Scanner}
        options={{ headerShown: false }}
      />
    </SuperAdminDrawer.Navigator>
  );
};

const QuizStack = createNativeStackNavigator();

const QuizNavigator = () => {
  return (
    <QuizStack.Navigator screenOptions={{ headerShown: false }}>
      <QuizStack.Screen
        name="QuizDescription"
        component={QuizDescriptionScreen}
      />
      <QuizStack.Screen
        name="QuizQuestionScreen"
        component={QuizQuestionScreen}
      />
      <QuizStack.Screen name="QuizResultScreen" component={QuizResultScreen} />
      <QuizStack.Screen name="PrizePageScreen" component={PrizePageScreen} />
      <QuizStack.Screen name="CompletionScreen" component={CompletionScreen} />
    </QuizStack.Navigator>
  );
};

const CombineStack = createNativeStackNavigator();

export const CombineNavigation = () => {
  const dispatch = useDispatch();
  const dashboardTitle = useSelector(s => s.CommonReducer.dashboard_title);
  return (
    <CombineStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Authentication"
    >
      <CombineStack.Screen
        name="Authentication"
        component={AuthenticationNavigation}
      />
      <CombineStack.Screen
        name={string.MuminDrawerNavigators}
        component={MuminDrawerNavigators}
        listeners={({ route }) => ({
          state: () => {
            const focusedScreen = getFocusedRouteNameFromRoute(route);
            drawerTabSelect(dispatch, focusedScreen, dashboardTitle);
          },
        })}
      />
      <CombineStack.Screen
        name={string.ApproveDrawerNavigators}
        component={ApproveDrawerNavigators}
        listeners={({ route }) => ({
          state: () => {
            const focusedScreen = getFocusedRouteNameFromRoute(route);
            drawerTabSelect(dispatch, focusedScreen, dashboardTitle);
          },
        })}
      />
      <CombineStack.Screen
        name={string.WelcomeScreen}
        component={WelcomeScreen}
        option={{
          headerShown: false,
        }}
      />
      <CombineStack.Screen
        name={string.SuperAdminDrawerNavigators}
        component={SuperAdminDrawerNavigators}
        listeners={({ route }) => ({
          state: () => {
            const focusedScreen = getFocusedRouteNameFromRoute(route);
            drawerTabSelect(dispatch, focusedScreen, dashboardTitle);
          },
        })}
      />
      <CombineStack.Screen
        name={string.Quiz}
        component={QuizNavigator}
        listeners={({ route }) => ({
          state: () => {
            const focusedScreen = getFocusedRouteNameFromRoute(route);
            drawerTabSelect(dispatch, focusedScreen, dashboardTitle);
          },
        })}
      />
    </CombineStack.Navigator>
  );
};

// RootNavigation.js

export const navigationRef = createNavigationContainerRef();

export function reset(name, params) {
  if (navigationRef.isReady()) {
    // navigationRef.navigate(name, params);
    //RootNavigation.navigate('Authentication');
    navigationRef.reset({
      index: 0,
      routes: [
        {
          name: 'Authentication',
          state: {
            routes: [{ name }],
          },
        },
      ],
    });
  }
}
