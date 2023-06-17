export enum WorkingDaysEnum {
    monday = 'monday',
    tuesday = 'tuesday',
    wednesday = 'wednesday',
    thursday = 'thursday',
    friday = 'friday',
    saturday = 'saturday',
    sunday = 'sunday',
}

export const engToRusDay = {
    [WorkingDaysEnum.monday]: 'Понедельник',
    [WorkingDaysEnum.tuesday]: 'Вторник',
    [WorkingDaysEnum.wednesday]: 'Среда',
    [WorkingDaysEnum.thursday]: 'Четверг',
    [WorkingDaysEnum.friday]: 'Пятница',
    [WorkingDaysEnum.saturday]: 'Суббота',
    [WorkingDaysEnum.sunday]: 'Воскресенье',
};

export type WorkingHoursRecord = { open: true; since?: string; to?: string } | { open: false };
export type WorkingHoursType = Record<WorkingDaysEnum, WorkingHoursRecord>;

export type FacilityPhoto = {
    id: string;
    url: string;
};

export type FacilityType = {
    id: string;
    name: string;
    type: string;
    phone_number?: string;
    site?: string;
    working_hours?: WorkingHoursType;
    age: string[];
    paying_type: string[];
    owner: string;
    address: string;
    area: number;
    width?: number;
    height?: number;
    length?: number;
    depth?: number;
    covering_type?: string;
    owning_type?: string;
    note?: string;
    eps?: number;
    actual_workload?: number;
    annual_capacity?: number;
    photo: FacilityPhoto[];
    accessibility?: boolean;
    x: number;
    y: number;
    hidden: boolean;
};
