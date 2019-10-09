import React from 'react';
import { shallow } from 'enzyme';
import Message from './Message';

describe('message', () => {
    it('renders author and message', () => {
        const props = {
            author: 'Roman',
            message: 'Hello'
        };

        const message = shallow(<Message {...props} />);

        expect(message.find('.Message__Author').text()).toEqual(props.author);
        expect(message.find('.Message__Text').text()).toEqual(props.message);
    });
});
