import { connect } from 'react-redux';
import SidebarComponent from '../../components/chat/Sidebar/Sidebar';

const mapStateToProps = state => ({
    users: state.users
});

export const Sidebar = connect(mapStateToProps, {})(SidebarComponent);
