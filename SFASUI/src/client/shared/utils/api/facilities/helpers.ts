import { fetch } from 'src/client/shared/utils/api/fetch';
import { apiRoutes } from 'src/client/shared/utils/api/apiRoutes';

import { CreateFacility, PartialUpdateFacility, UpdateFacility } from '.';

export const createFacility = (body: CreateFacility.Body) => {
    return fetch<CreateFacility.Response>(apiRoutes.facility, {
        method: 'POST',
        data: body,
    });
};

export const updateFacility = (id: number, body: UpdateFacility.Body) => {
    return fetch<UpdateFacility.Response>(apiRoutes.facilities(id), {
        method: 'PUT',
        data: body,
    });
};

export const partialUpdateFacility = (id: number, body: UpdateFacility.Body) => {
    return fetch<PartialUpdateFacility.Response>(apiRoutes.facilities(id), {
        method: 'PATCH',
        data: body,
    });
};

export const deleteFacility = (id: number) => {
    return fetch(apiRoutes.facilities(id), {
        method: 'DELETE',
    });
};
