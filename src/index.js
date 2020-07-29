import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'typeface-roboto';
import Keycloak from 'keycloak-js'
//
//let initOptions = {
//  url: 'http://127.0.0.1:8080/auth', realm: 'demo', clientId: 'app-react', onLoad: 'login-required'
//}
//
//
//let keycloak = Keycloak(initOptions);
//
//keycloak.init({ onLoad: initOptions.onLoad }).success((auth) => {
//
//  if (!auth) {
//      window.location.reload();
//  } else {
//      console.info("Authenticated user");
//  }
//
  ReactDOM.render(
      <App />,
    document.getElementById('root')
  );

//  localStorage.setItem("react-token", keycloak.token);
//  localStorage.setItem("react-refresh-token", keycloak.refreshToken);
//
//  setTimeout(() => {
//      keycloak.updateToken(70).success((refreshed) => {
//          if (refreshed) {
//              console.debug('Token refreshed' + refreshed);
//          } else {
//              console.warn('Token not refreshed, valid for '
//                  + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
//          }
//      }).error(() => {
//          console.error('Failed to refresh token');
//      });
//
//
//  }, 60000)
//
//}).error(() => {
//  console.error("Authenticated Failed");
//});
//