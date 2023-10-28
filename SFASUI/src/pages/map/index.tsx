import React from 'react';
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';

import { ExtendedNextPage } from 'src/client/shared/types/next';
import { searchFacility } from 'src/client/shared/utils/api/facilities';

import { getSearchQuery, mapLayoutRenderer, MapObjects, MapObjectsPageProps } from 'src/client/screens/MapObjects';

import NextError from 'src/pages/_error';

type MapPageProps = {
    data?: MapObjectsPageProps;
    error?: any;
};

export const getServerSideProps: GetServerSideProps<MapPageProps> = async ({ query }) => {
    const isLogged = getCookie('sportsmap_is_admin');

    const searchQuery = getSearchQuery(query);

    const facilityObjects = await searchFacility({
        ...searchQuery,
        hidden: isLogged ? undefined : false,
        limit: undefined,
        offset: undefined,
    });

    const facilityObjectsQuery = await searchFacility(searchQuery);

    return {
        props: { data: { facilityObjects, facilityObjectsQuery } },
    };
};

const MapPage: ExtendedNextPage<MapPageProps> = ({ data, error }: MapPageProps) => {
    if (error) {
        return <NextError code={500} />;
    }

    return <MapObjects {...data} />;
};

MapPage.layoutRenderer = mapLayoutRenderer;

export default MapPage;
