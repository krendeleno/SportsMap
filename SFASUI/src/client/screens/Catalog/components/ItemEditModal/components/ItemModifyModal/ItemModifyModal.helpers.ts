import {FacilityType, WorkingHoursType} from "src/client/shared/types/facilities";

import {WORKING_DAYS} from "../WorkingHoursForm";

export const createWorkingHours = (workingHours: FacilityType['working_hours']) => {
    if (!workingHours) {
        return {} as WorkingHoursType;
    }

   for (let day of WORKING_DAYS) {
       workingHours[day] = workingHours[day] || {open: false}
   }

   return workingHours;
};