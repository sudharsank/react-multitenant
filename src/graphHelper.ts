import { getAccessToken, graphConfig } from "./auth";

const getRequestOptions = async (): Promise<any> => {

    const accessToken = await getAccessToken();

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    return {
        method: "GET",
        headers: headers
    };
}

export const getProfileData = async (): Promise<any> => {
    const options = await getRequestOptions();
    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
};

export const getAllUsers = async (): Promise<any> => {
    const options = await getRequestOptions();
    return fetch(graphConfig.graphAllUsersEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

