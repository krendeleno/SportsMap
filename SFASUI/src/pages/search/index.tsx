import React from 'react';
import { GetServerSideProps } from 'next';

import { ExtendedNextPage } from 'src/client/shared/types/next';

import { Catalog, catalogLayoutRenderer, CatalogPageProps } from 'src/client/screens/Catalog';

import NextError from 'src/pages/_error';
import { searchFacility } from 'src/client/shared/utils/api/facilities';
import { getSearchQuery } from 'src/client/screens/Catalog/Catalog.helpers';

type SearchPageProps = {
    data?: CatalogPageProps;
    error?: any;
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async ({ query }) => {
    const searchQuery = getSearchQuery(query);

    const facilityObjects = await searchFacility(searchQuery);

    return {
        props: { data: { facilityObjects } },
    };
};

const SearchPage: ExtendedNextPage<SearchPageProps> = ({ data, error }: SearchPageProps) => {
    if (error) {
        return <NextError code={500} />;
    }

    return <Catalog {...data} />;
};

SearchPage.layoutRenderer = catalogLayoutRenderer;

export default SearchPage;
