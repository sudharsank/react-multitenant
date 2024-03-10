import React from 'react';
import logo from './logo.svg';
import './App.css';
// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import SignInSignOut from './SignInSignOut';

export interface IAppProps {
    pca: IPublicClientApplication;
}

function App(props: IAppProps) {
    return (
        <MsalProvider instance={props.pca}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        <SignInSignOut />
                    </p>
                </header>
            </div>
        </MsalProvider>
    );
}

export default App;
