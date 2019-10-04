import React from 'react';
import { shallow } from 'enzyme';
import MessagesList from './MessagesList';

describe('messages list', () => {
    it('renders messages', () => {
        const props = {
            messages: [{}, {}, {}]
        };

        const messagesList = shallow(<MessagesList {...props} />);

        expect(messagesList.find('Message')).toHaveLength(props.messages.length);
    });
});
