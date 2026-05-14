import React from 'react';
import {render} from '@testing-library/react-native';
import Notification from './NotificationScreen';

describe('Welcome Screen Component', () => {
  it('should Notification Text is available', async () => {
    const rawText = await 'Notification';
    const {toJSON, getByText} = render(<Notification />);
    const foundHelloWorldText = getByText(rawText);
    expect(foundHelloWorldText.props.children).toEqual(rawText);
    expect(toJSON()).toMatchSnapshot();
  });
});
