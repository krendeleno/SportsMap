import { useMemo } from 'react';
import { object, string } from 'yup';

export function useSchema() {
    return useMemo(
        () =>
            object({
                email: string().ensure().email('Введите валидную электронную почту').required('Это обязательное поле'),
                name: string().ensure().required('Это обязательное поле'),
                surname: string().ensure().required('Это обязательное поле'),
                note: string().notRequired(),
            }),
        []
    );
}
