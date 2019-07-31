import { connect } from 'react-redux';
import AddMessageComponent from '../../components/chat/AddMessage/AddMessage';
import { AddMessage as AddMessageAction } from '../../store/actions/messages';

const mapDispatchToProps = dispatch => ({
    onSubmit: (message, author) => {
        dispatch(AddMessageAction(message, author));
    }
});

const AddMessage = connect(() => ({}), mapDispatchToProps)(AddMessageComponent);

export default AddMessage;
