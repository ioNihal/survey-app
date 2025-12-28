import '../App.css';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
    return (
        <div className="survey-card animate__animated animate__fadeIn">
            {children}
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
