import Image from 'next/image';
import { useMemo, useState } from 'react';
import { mutate } from 'swr';

import { Button, ButtonType } from 'src/client/shared/components/Button';
import { QuerySelect } from 'src/client/shared/components/QuerySelect';
import { QuerySearch } from 'src/client/shared/components/QuerySearch';
import { apiRoutes } from 'src/client/shared/utils/api/apiRoutes';
import { Drawer } from 'src/client/shared/components/Drawer';

import { useFilters } from './SidebarFilters.hooks';

import FiltersIcon from 'public/icons/filters_default.svg';
import FiltersActiveIcon from 'public/icons/filters_active.svg';

import styles from './SidebarFilters.module.css';

export const SidebarFilters = () => {
    const [isOpen, setOpen] = useState(false);
    const filters = useFilters();

    const filtersComponent = useMemo(
        () =>
            filters.map((selectProps) => (
                <QuerySelect
                    {...selectProps}
                    key={selectProps.name}
                    onSuccess={() =>
                        Promise.all([
                            mutate(`map${apiRoutes.facilitySearch}`),
                            mutate(`all${apiRoutes.facilitySearch}`),
                        ])
                    }
                />
            )),
        [filters]
    );

    return (
        <fieldset className={styles['SidebarFilters']}>
            <QuerySearch
                className={styles['SidebarFilters-Search']}
                onSuccess={() => mutate(`map${apiRoutes.facilitySearch}`)}
            />
            <Button
                onClick={() => setOpen(!isOpen)}
                view={isOpen ? ButtonType.Active : ButtonType.Clear}
                className={[
                    styles['SidebarFilters-Toggle'],
                    isOpen ? styles['SidebarFilters-Toggle_open'] : styles['SidebarFilters-Toggle_closed'],
                ].join(' ')}
                icon={isOpen ? <FiltersActiveIcon width={38} height={38} /> : <FiltersIcon width={38} height={38} />}
            />
            {isOpen && <div className={styles['SidebarFilters_desktop']}>{filtersComponent}</div>}
            <Drawer
                open={isOpen}
                rootClassName={styles['SidebarFilters_mobile']}
                className={styles['SidebarFilters-Drawer']}
                placement="bottom"
                onClose={() => setOpen(false)}
                closable={false}
            >
                <div className={styles['SidebarFilters-DrawerContent']}>{filtersComponent}</div>
            </Drawer>
        </fieldset>
    );
};
