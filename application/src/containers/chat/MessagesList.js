import { connect } from 'react-redux';
import MessagesListComponent from '../../components/chat/MessagesList/MessagesList';

const mapStateToProps = state => ({
    messages: state.messages
});

const MessagesList = connect(mapStateToProps, {})(MessagesListComponent);

export default MessagesList;
