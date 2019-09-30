import { connect } from 'react-redux';
import CanvasComponent from '../../components/home/Canvas/Canvas';

const mapStateToProps = state => ({
    users: state.users
});

const Canvas = connect(mapStateToProps)(CanvasComponent);

export default Canvas;
