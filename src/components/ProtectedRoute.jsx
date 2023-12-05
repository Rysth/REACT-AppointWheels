import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ isAuthenticated, children, redirectTo }) {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  /* eslint-disable */
  children: PropTypes.object.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default ProtectedRoute;
