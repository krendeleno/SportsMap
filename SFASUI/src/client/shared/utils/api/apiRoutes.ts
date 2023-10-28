const BACKEND_PREFIX = 'api';

export const apiRoutes = {
    login: `${BACKEND_PREFIX}/user/login`,
    resfreshToken: `${BACKEND_PREFIX}/user/token/refresh`,
    refreshPassword(token: string) {
        return `${BACKEND_PREFIX}/user/password-refresh/${token}`;
    },

    user: `${BACKEND_PREFIX}/user`,
    users(id: number) {
        return `${BACKEND_PREFIX}/user/${id}`;
    },

    facility: `${BACKEND_PREFIX}/facility`,
    facilitySearch: `${BACKEND_PREFIX}/facility/search`,
    facilities(id: string) {
        return `${BACKEND_PREFIX}/facility/${id}`;
    },

    facilityType: `${BACKEND_PREFIX}/facility-type`,
    facilityCoveringType: `${BACKEND_PREFIX}/facility-covering-type`,
    facilityPayingType: `${BACKEND_PREFIX}/facility-paying-type`,
    facilityOwningType: `${BACKEND_PREFIX}/facility-owning-type`,
    facilityAge: `${BACKEND_PREFIX}/facility-age`,

    excelImport: `${BACKEND_PREFIX}/excel/import`,
    excelValidate: `${BACKEND_PREFIX}/excel/validate`,
    excelExport: `${BACKEND_PREFIX}/excel/export`,

    facilityPhoto(id: string) {
        return `${BACKEND_PREFIX}/facility/${id}/photo`;
    },
    facilityPhotoDelete(id: string, photoId: string) {
        return `${BACKEND_PREFIX}/facility/${id}/photo/${photoId}`;
    },

    emailProposal: `${BACKEND_PREFIX}/email/suggestions`,
    emailNewObject: `${BACKEND_PREFIX}/email/offer-object`,
    emailSubscribe: `${BACKEND_PREFIX}/email/subscribe`,
    emailUnsubscribe: `${BACKEND_PREFIX}/email/unsubscribe`,
    newPassword: `${BACKEND_PREFIX}/email/new-password`,
};
