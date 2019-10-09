import React from 'react';
import { shallow } from 'enzyme';
import AddMessage from './AddMessage';

describe('add message', () => {
    it('sends message', () => {
        const props = {
            onSubmit: jest.fn(),
            sendMessageToSocket: jest.fn()
        };

        const addMessage = shallow(<AddMessage {...props} />);
        addMessage.setState({input: 'hello'});
        addMessage.find('button').simulate('click');

        expect(props.onSubmit.mock.calls.length).toEqual(1);
        expect(props.onSubmit).toBeCalledWith('hello', 'Me');

        expect(props.sendMessageToSocket.mock.calls.length).toEqual(1);
        expect(props.sendMessageToSocket).toBeCalledWith('hello');

        expect(addMessage.state('input')).toEqual('');
    });

    it('doesnt send message if input is empty', () => {
        const props = {
            onSubmit: jest.fn(),
            sendMessageToSocket: jest.fn()
        };

        const addMessage = shallow(<AddMessage {...props} />);
        addMessage.find('button').simulate('click');

        expect(props.onSubmit).not.toBeCalled();
        expect(props.sendMessageToSocket).not.toBeCalled();

        expect(addMessage.state('input')).toEqual('');
    });
});
