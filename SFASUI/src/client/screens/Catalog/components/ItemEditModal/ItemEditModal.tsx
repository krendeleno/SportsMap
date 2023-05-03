import Image from 'next/image';
import { useCallback, useState } from 'react';
import { FormikHelpers, FormikProvider, useFormik } from 'formik';

import { Modal } from 'src/client/shared/components/Modal';
import { Tabs } from 'src/client/shared/components/Tabs';
import { Button } from 'src/client/shared/components/Button';
import { FacilityType } from 'src/client/shared/types/facilities';

import { useOnNextTab, useTabs } from './ItemEditModal.hooks';

import styles from './ItemEditModal.module.css';

type ItemEditModalProps = {
    handleSubmit: (fields: FacilityType, formikHelpers: FormikHelpers<FacilityType>) => Promise<void>;
    initialValues: FacilityType;
    hide: () => void;
    isNew: boolean;
};

export const ItemEditModal = ({ handleSubmit, initialValues, hide, isNew }: ItemEditModalProps) => {
    const items = useTabs(isNew);

    const formikStateAndHelpers = useFormik<FacilityType>({
        initialValues: initialValues,
        onSubmit: handleSubmit,
    });

    const [activeTab, setActiveTab] = useState('1');
    const onTabChange = useCallback((value) => setActiveTab(value), [setActiveTab]);

    const { buttonText, clickHandler } = useOnNextTab({
        activeTab,
        setActiveTab,
        submitForm: formikStateAndHelpers.submitForm,
    });

    return (
        <FormikProvider value={formikStateAndHelpers}>
            <Modal
                open
                title={<h2 className={styles['ItemEditModal-Title']}>Создание спортивного объекта</h2>}
                closeIcon={<Image width={10} height={10} src="/icons/close.svg" layout="fixed" />}
                footer={<Button onClick={clickHandler} text={buttonText} />}
                width={1110}
                destroyOnClose
                afterClose={hide}
                onCancel={hide}
            >
                <Tabs items={items} activeKey={activeTab} onChange={onTabChange} />
            </Modal>
        </FormikProvider>
    );
};
