/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import {cleanup, render, fireEvent} from '@testing-library/react-native';
import {toHaveStyle} from '@testing-library/jest-native';

import WelcomeScreen from './WelcomeScreen';

afterEach(cleanup);

describe('Welcome Screen Component', () => {
  it('should find a button via TESTID', () => {
    const tstIDName = 'moveDashboard';
    const {getByTestId} = render(<WelcomeScreen />);
    const foundButton = getByTestId(tstIDName);
    expect(foundButton).toBeTruthy();
  });
  it('should find the button via accessibilityLabel', () => {
    const accessibilityLabel = 'Move DashboardBtn';
    const {getByA11yLabel} = render(<WelcomeScreen />);
    const foundButton = getByA11yLabel(accessibilityLabel);
    expect(foundButton).toBeTruthy();
  });
  it('should WELCOME Text is available', () => {
    const welcomeTxt = 'WELCOME !';
    const {toJSON, getByText} = render(<WelcomeScreen />);
    const foundHelloWorldText = getByText(welcomeTxt);
    expect(foundHelloWorldText.props.children).toEqual(welcomeTxt);
    expect(toJSON()).toMatchSnapshot();
  });
});
