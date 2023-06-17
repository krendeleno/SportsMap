import { WorkingHoursRecord } from "src/client/shared/types/facilities";

export const getWorkingHours = (workingHours: WorkingHoursRecord) => {
    if (!workingHours.open) {
        return 'Закрыто'
    }

    if (workingHours.since && workingHours.to) {
        return `${workingHours.since} - ${workingHours.to}`
    }

    if (workingHours.since) {
        return `с ${workingHours.since}`
    }

    if (workingHours.to) {
        return `до ${workingHours.to}`
    }

    return 'Открыто'
}