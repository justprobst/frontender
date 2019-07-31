import { connect } from 'react-redux';
import SidebarComponent from '../../components/chat/Sidebar/Sidebar';

const mapStateToProps = state => ({
    users: state.users
});

const Sidebar = connect(mapStateToProps, {})(SidebarComponent);

export default Sidebar;
