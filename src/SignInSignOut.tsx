import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { signIn, signOut } from "./auth";
import { ProfileInfo } from "./ProfileInfo";

const SignInSignOut = () => {
    const { inProgress, instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const handleLogin = (loginType: string) => {
        signIn();
    };

    const handleLogout = (logoutType: string) => {
        signOut();
    };

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <button onClick={() => handleLogout('popup')}>Sign out using Popup</button>
                    <ProfileInfo />
                </div>
            ) : (
                <>
                    {(inProgress !== InteractionStatus.Startup && inProgress !== InteractionStatus.HandleRedirect) &&
                        <div>
                            <button onClick={() => handleLogin('popup')}>Sign in using Popup</button>
                        </div>
                    }
                </>
            )}
        </div>
    );
};

export default SignInSignOut;