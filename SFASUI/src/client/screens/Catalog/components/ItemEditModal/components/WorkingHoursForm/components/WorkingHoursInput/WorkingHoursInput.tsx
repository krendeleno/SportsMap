import React, { useState, useCallback, useMemo } from 'react';
import { useFormikContext } from 'formik';

import { Switch } from 'src/client/shared/components/Switch';
import { TextInputField } from 'src/client/shared/components/TextInput/formik/TextInputField';
import { Divider } from 'src/client/shared/components/Divider';
import { engToRusDay, WorkingDaysEnum } from 'src/client/shared/types/facilities';

import styles from './WorkingHoursInput.module.css';

type WorkingHoursInputProps = {
    day: WorkingDaysEnum;
};

export const WorkingHoursInput = ({ day }: WorkingHoursInputProps) => {
    const { setFieldValue, values } = useFormikContext();
    const rusDay = useMemo(() => engToRusDay[day], []);
    console.log(values)

    const [isOpen, setIsOpen] = useState(Boolean(values?.working_hours?.[day]?.open));

    const handleSwitchChange = useCallback(
        (checked: boolean) => {
            setIsOpen(checked);
            setFieldValue(`working_hours.${day}.open`, checked);
            setFieldValue(`working_hours.${day}.to`, undefined);
            setFieldValue(`working_hours.${day}.since`, undefined);
        },
        [setIsOpen, setFieldValue, day]
    );

    return (
        <div className={styles['WorkingHoursInput']}>
            <span className={styles['WorkingHoursInput-Day']}>{rusDay}</span>
            <Switch size="default" checked={isOpen} onChange={handleSwitchChange} />
            {isOpen ? (
                <span className={styles['WorkingHoursInput-SwitchText']}>Открыто</span>
            ) : (
                <span className={styles['WorkingHoursInput-SwitchText']}>Закрыто</span>
            )}
            {isOpen && (
                <div className={styles['WorkingHoursInput-Input']}>
                    <TextInputField
                        className={styles['WorkingHoursInput-Field']}
                        fieldName={`working_hours.${day}.since`}
                        label={`Начало работы в ${rusDay}`}
                        hiddenLabel
                        inputClassName={styles['WorkingHoursInput-HoursInput']}
                        placeholder="00:00"
                    />
                    <Divider className={styles['WorkingHoursInput-Divider']} />
                    <TextInputField
                        className={styles['WorkingHoursInput-Field']}
                        fieldName={`working_hours.${day}.to`}
                        label={`Конец работы в ${rusDay}`}
                        hiddenLabel
                        inputClassName={styles['WorkingHoursInput-HoursInput']}
                        placeholder="00:00"
                    />
                </div>
            )}
        </div>
    );
};
