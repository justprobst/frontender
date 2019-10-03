import { connect } from 'react-redux';
import AddMessageComponent from '../../components/chat/AddMessage/AddMessage';
import { addMessage as addMessageAction } from '../../store/actions/messages';

const mapDispatchToProps = dispatch => ({
    onSubmit: (message, author) => {
        dispatch(addMessageAction(message, author));
    }
});

const AddMessage = connect(() => ({}), mapDispatchToProps)(AddMessageComponent);

export default AddMessage;
