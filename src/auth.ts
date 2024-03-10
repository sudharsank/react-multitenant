import { AccountInfo, Configuration, InteractionRequiredAuthError, PopupRequest, SilentRequest } from "@azure/msal-browser";
import { msalInstance } from './index';

export const requiredScopes = ["User.Read", "User.Read.All"];

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: "<application id>", 
        authority: "https://login.microsoftonline.com/common", 
        redirectUri: "http://localhost:3000",
        postLogoutRedirectUri: "/"
    },
    system: {
        allowNativeBroker: false // Disables WAM Broker
    }
};

export const signOut = async () => {
    try {
        await msalInstance.logoutPopup();
        sessionStorage.removeItem('msalAccount');
    } catch (err) {
        console.log(err);
    }
}

export const signIn = async () => {
    try {
        const loginResult = await msalInstance.loginPopup(loginRequest);
        sessionStorage.setItem('msalAccount', loginResult.account.username);
    } catch (err) {
        console.log(err);
    }
}

export const getAccessToken = async () => {
    let account = sessionStorage.getItem('msalAccount');
    if (!account) {
        throw new Error('User info cleared from session. Please sign out and sign in again.');
    }
    try {
        const silentRequest: SilentRequest = {
            scopes: requiredScopes,
            account: msalInstance.getActiveAccount() as AccountInfo
        };
        const silentResult = await msalInstance.acquireTokenSilent(silentRequest);
        return silentResult.accessToken;
    } catch (err) {
        if (err instanceof InteractionRequiredAuthError) {
            const interactionResult = await msalInstance.acquireTokenPopup(loginRequest);
            return interactionResult.accessToken;
        } else {
            console.log(err);
        }
    }
}

export const getAccessToken1 = async () => {
    const account = msalInstance.getActiveAccount();
    if (!account) {
        msalInstance.loginPopup(loginRequest);
    }
    let response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account as AccountInfo
    });
    if (!response.accessToken?.split(' ').some((scope: string) => requiredScopes.includes(scope))) {
        response = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: account as AccountInfo
        });
    }
    return response?.accessToken;
}

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
    scopes: requiredScopes
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphAllUsersEndpoint: "https://graph.microsoft.com/v1.0/users"
};