import { getCookie, hasCookie, setCookie } from 'cookies-next';

import { refreshToken } from './login';

export const getAuthToken = async () => {
    const isExpired = !hasCookie('sportsmap_expiresIn');

    if (isExpired) {
        const oldTokenValue = getCookie('sportsmap_token') as string | undefined;
        const refreshTokenValue = getCookie('sportsmap_refreshToken') as string | undefined;

        if (oldTokenValue && refreshTokenValue) {
            try {
                const { access_token, refresh_token, access_token_expires_in } = await refreshToken({
                    access_token: oldTokenValue,
                    refresh_token: refreshTokenValue,
                });

                setCookie('sportsmap_token', access_token);
                setCookie('sportsmap_expiresIn', access_token_expires_in, {
                    maxAge: access_token_expires_in,
                });
                setCookie('sportsmap_refreshToken', refresh_token);
            } catch (e) {
                throw Error(e);
            }
        }
    }

    return getCookie('sportsmap_token');
};
