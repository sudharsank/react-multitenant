import { FC, useCallback, useEffect, useState } from "react";
import { useMsal } from '@azure/msal-react';
import { InteractionStatus, InteractionType, InteractionRequiredAuthError, AccountInfo } from "@azure/msal-browser";
import { getAllUsers, getProfileData } from "./graphHelper";
import { getAccessToken, loginRequest } from './auth';


export interface IProfileData {
    displayName: string;
    givenName: string;
    mail: string;
}

export const ProfileInfo: FC<{}> = (props) => {
    const { instance, inProgress } = useMsal();
    const [profileData, setProfileData] = useState<null | IProfileData>(null);
    const [userCount, setUserCount] = useState<number>(0);

    const loadProfile = async () => {
        if (!profileData && inProgress === InteractionStatus.None) {
            try {
                const allUsers = await getAllUsers();
                setUserCount(allUsers?.value.length);
                const profileData = await getProfileData();
                console.log(allUsers, profileData);
                setProfileData(profileData);
            } catch (err) {
                console.log(err);
            }
        }
    }   

    useEffect(() => {
        console.log(inProgress, instance);
        loadProfile();
    }, [inProgress, instance]);

    return (
        <div>
            {profileData ? (
                <div>
                    <p>Display Name: {profileData.displayName}</p>
                    <p>EMail: {profileData.mail}</p>
                    <div>
                        Users Count: {userCount}
                    </div>
                </div>
            ) : (
                <div>Please login or wait to retrieve the profile data.</div>
            )}
        </div>
    )
}