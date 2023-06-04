import { FacilityType } from 'src/client/shared/types/facilities';
import { Popover } from 'src/client/shared/components/Popover';

import styles from './ClustererMenu.module.css';

export type ClustererMenuProps = {
    items: FacilityType[];
    onItemClick: (item: FacilityType) => void;
    open: boolean;
};

export const ClustererMenu = ({ items, onItemClick, open }: ClustererMenuProps) => {
    return (
        <Popover
            destroyTooltipOnHide
            open={open}
            className={styles['ClustererMenu']}
            trigger="click"
            overlayInnerStyle={{ padding: 0 }}
            placement="top"
            content={
                <ul className={styles['ClustererMenu-List']}>
                    {items.map((item) => (
                        <li onClick={() => onItemClick(item)} className={styles['ClustererMenu-Item']}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            }
        />
    );
};
