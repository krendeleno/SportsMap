import { GetStaticProps, NextPage } from 'next';
import React from 'react';

import { Main, MainScreenPageProps } from 'src/client/screens/Main';

import NextError from 'src/pages/_error';
import { searchFacility } from 'src/client/shared/utils/api/facilities';
import { SEARCH_QUERY } from 'src/client/screens/Main/Main.constants';

type MainPageProps = {
    data?: MainScreenPageProps;
    error?: any;
};

export const getStaticProps: GetStaticProps<MainPageProps> = async () => {
    const facilityObjects = await searchFacility(SEARCH_QUERY);

    return {
        props: { data: { facilityObjects } },
    };
};

const MainPage: NextPage<MainPageProps> = ({ data, error }: MainPageProps) => {
    if (error) {
        return <NextError code={500} />;
    }

    return <Main {...data} />;
};

export default MainPage;
