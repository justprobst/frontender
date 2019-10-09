import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';

describe('sidebar', () => {
    it('renders usernames', () => {
        const props = {
            users: [{username: 'Roman'}, {username: 'Ivan'}]
        };

        const sidebar = shallow(<Sidebar {...props} />);

        expect(sidebar.find('.UserName')).toHaveLength(props.users.length);

        props.users.forEach((user, index) => {
            expect(sidebar.find('.UserName').at(index).text()).toEqual(props.users[index].username);
        });
    });
});
