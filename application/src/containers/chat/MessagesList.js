import { connect } from 'react-redux';
import MessagesListComponent from '../../components/chat/MessagesList/MessagesList';

const mapStateToProps = state => ({
    messages: state.messages
});

export const MessagesList = connect(mapStateToProps, {})(MessagesListComponent);
