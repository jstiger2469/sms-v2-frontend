import React from 'react';
import PropTypes from 'prop-types'; // Add PropTypes import
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function AuthProvider({ children }) {
  const navigate = useNavigate(); // Use navigate hook for redirection

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const callbackUrl = process.env.REACT_APP_AUTH0_CALLBACK_URL;

  // Callback to handle redirect after login
  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname); // Redirect after login
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={callbackUrl}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

// Prop validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
