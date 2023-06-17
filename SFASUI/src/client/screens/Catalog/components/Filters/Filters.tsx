import { useCallback, useState } from 'react';

import { Divider } from 'src/client/shared/components/Divider';
import {
    useFacilityAges,
    useFacilityPayingTypes,
    useFacilityTypes,
    useFacilityCoveringTypes,
    useFacilityOwningTypes,
} from 'src/client/shared/utils/api/facilities';

import { FiltersTab, OTHER_INPUTS, SIZE_INPUTS } from './Filters.constants';
import { CheckboxTab } from './components/CheckboxTab';
import { InputTab } from './components/InputTab';
import { FiltersHeader } from './components/FiltersHeader';
import { FiltersControls } from './components/FiltersControls';

type FiltersProps = {
    className?: string;
};

export const Filters = ({ className }: FiltersProps) => {
    const [activeTab, setActiveTab] = useState<FiltersTab | null>(null);
    const { data: facilityTypes } = useFacilityTypes();
    const { data: ageTypes } = useFacilityAges();
    const { data: payingTypes } = useFacilityPayingTypes();
    const { data: coveringTypes } = useFacilityCoveringTypes();
    const { data: owningTypes } = useFacilityOwningTypes();

    const onTabClick = useCallback(
        (tab: FiltersTab) => (tab === activeTab ? setActiveTab(null) : setActiveTab(tab)),
        [activeTab, setActiveTab]
    );

    return (
        <div className={className}>
            <FiltersControls />
            <FiltersHeader onTabClick={onTabClick} activeTab={activeTab} />
            <Divider />
            {activeTab === FiltersTab.FacilityType && <CheckboxTab name="type" items={facilityTypes?.data || []} />}
            {activeTab === FiltersTab.Age && <CheckboxTab name="age" items={ageTypes?.data || []} />}
            {activeTab === FiltersTab.CoveringType && (
                <CheckboxTab name="covering_type" items={coveringTypes?.data || []} />
            )}
            {activeTab === FiltersTab.PayingType && <CheckboxTab name="paying_type" items={payingTypes?.data || []} />}

            {activeTab === FiltersTab.Owner && <CheckboxTab name="owning_type" items={owningTypes?.data || []} />}
            {activeTab === FiltersTab.Size && <InputTab items={SIZE_INPUTS} />}
            {activeTab === FiltersTab.Other && <InputTab items={OTHER_INPUTS} />}
            {activeTab && <Divider />}
        </div>
    );
};
