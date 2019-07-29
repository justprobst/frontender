import { connect } from 'react-redux';
import AddMessageComponent from '../../components/chat/AddMessage/AddMessage';
import { messages } from '../../store/actions';

const mapDispatchToProps = dispatch => ({
    onSubmit: (message, author) => {
        dispatch(messages.AddMessage(message, author));
    }
});

export const AddMessage = connect(() => ({}), mapDispatchToProps)(AddMessageComponent);
