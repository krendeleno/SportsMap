import { useState } from 'react';

import { TextWithIcon } from 'src/client/shared/components/TextWithIcon';
import { Toggle } from 'src/client/shared/components/Toggle';
import { engToRusDay, WorkingHoursType } from 'src/client/shared/types/facilities';

import { DAY_OF_WEEKS } from "./WorkingHours.constants";
import { getWorkingHours } from "./WorkingHours.helpers";

import styles from './WorkingHours.module.css';

type WorkingHoursProps = {
    hours: WorkingHoursType;
};

export const WorkingHours = ({ hours }: WorkingHoursProps) => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div className={styles['WorkingHours']}>
            <TextWithIcon iconType='time'>
                <div className={styles['WorkingHours-ToggleWrapper']}>
                    <span className={styles['WorkingHours-ToggleText']}>Часы работы</span>
                    <Toggle isOpened={isOpened} onClick={() => setIsOpened(!isOpened)} />
                </div>
            </TextWithIcon>
            {isOpened && (
                <ul className={styles['WorkingHours-Details']}>
                    {DAY_OF_WEEKS.map((day) => (
                        <li className={styles['WorkingHours-DetailsItem']}>
                            <span className={styles['WorkingHours-Day']}>{engToRusDay[day]}</span>
                            <span className={styles['WorkingHours-Value']}>
                                {getWorkingHours(hours[day])}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
