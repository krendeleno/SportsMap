import { FacilityType } from 'src/client/shared/types/facilities';

import { WORKING_DAYS } from '../WorkingHoursForm';

export const createWorkingHours = (workingHours: FacilityType['working_hours']) => {
    if (!workingHours) {
        return {
            monday: {
                open: false,
            },
            tuesday: {
                open: false,
            },
            wednesday: {
                open: false,
            },
            thursday: {
                open: false,
            },
            friday: {
                open: false,
            },
            saturday: {
                open: false,
            },
            sunday: {
                open: false,
            },
        };
    }

    for (let day of WORKING_DAYS) {
        workingHours[day] = workingHours[day] || { open: false };
    }

    return workingHours;
};
