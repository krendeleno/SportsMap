import {useMemo} from 'react';
import {object, string, number, boolean, array} from 'yup';

export function useSchema() {
    return useMemo(
        () =>
            object({
                address: string().ensure().required('Это обязательное поле'),
                owner: string().ensure().required('Это обязательное поле'),
                type: string().ensure().required('Это обязательное поле'),
                phone_number: string().notRequired(),
                site: string().notRequired(),
                area: number().positive('Число должно быть положительным').required('Это обязательное поле'),
                width: number().positive('Число должно быть положительным').notRequired(),
                height: number().positive('Число должно быть положительным').notRequired(),
                length: number().positive('Число должно быть положительным').notRequired(),
                depth: number().positive('Число должно быть положительным').notRequired(),
                hidden: boolean(),
                covering_type: string().notRequired(),
                owning_type: string().notRequired(),
                note: string().notRequired(),
                eps: number().positive('Число должно быть положительным').notRequired(),
                actual_workload: number().positive('Число должно быть положительным').notRequired(),
                annual_capacity: number().positive('Число должно быть положительным').notRequired(),
                age: array().ensure().min(1, 'Должно быть выбрано хотя бы одно значение'),
                accessibility: boolean(),
                name: string().ensure().required('Это обязательное поле'),
                paying_type: array().ensure().min(1, 'Должно быть выбрано хотя бы одно значение'),
            }),
        []
    );
}
