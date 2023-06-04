import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Clusterer, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

import { SearchFacilities, useFacilitySearch, useFacilitySearchAll } from 'src/client/shared/utils/api/facilities';
import { useTheme } from 'src/client/shared/hooks/use-theme';
import { appLayoutRenderer } from 'src/client/shared/layouts/AppLayout';
import { Button, ButtonType } from 'src/client/shared/components/Button';

import { Sidebar } from './components/Sidebar';
import { getPlacemarkIcon, getSearchQuery } from './MapObjects.helpers';

import styles from './MapObject.module.css';
import { ClustererMenu } from './components/ClustererMenu';
import { FacilityType } from "../../shared/types/facilities";

export type MapObjectsPageProps = {
    facilityObjects?: SearchFacilities.Response;
    facilityObjectsQuery?: SearchFacilities.Response;
};

export const MapObjects = ({
    facilityObjects: initialFacilityObjects,
    facilityObjectsQuery: initialFacilityObjectsQuery,
}: MapObjectsPageProps) => {
    const { query } = useRouter();
    const searchQuery = getSearchQuery(query);

    const {
        data: sportObjectsList,
        error,
        isValidating,
    } = useFacilitySearch(
        searchQuery,
        {
            fallbackData: initialFacilityObjectsQuery,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateOnMount: true,
        },
        'map'
    );

    const isLogged = getCookie('sportsmap_is_admin');

    const { data: sportObjectsListAll } = useFacilitySearchAll(
        { ...searchQuery, hidden: isLogged ? undefined : false, limit: undefined, offset: undefined },
        {
            fallbackData: initialFacilityObjects,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateOnMount: false,
        }
    );

    const { isLight } = useTheme();

    const mapRef = useRef(null);

    const [activeItem, setActiveItem] = useState<Definitions.FacilityResponse | null>(null);

    const onOpenItem = useCallback((item: Definitions.FacilityResponse | null) => {
        if (item && mapRef.current) {
            mapRef.current.panTo([item.x, item.y]);
        }
        setActiveItem(item);
        setIsDrawerOpen(true);
    }, []);

    const [clustererItems, setClustererItems] = useState([]);
    const [isClustererMenuOpen, setIsClustererMenuOpen] = useState(false);

    const onClustererClick = useCallback(
        (event: any) => {
            // если зум слишком большой, то карта приблизится и кластеры превратятся в placemark,
            // попап не нужен
            if (mapRef.current && mapRef.current.getZoom() < 21) {
                return;
            }

            const target = event.get('target');

            // если это placemark, то не показываем попап
            if (target.options._name !== 'cluster') {
                return;
            }

            const items = target.getGeoObjects().map((object) => object.properties._data.item);
            setClustererItems(items);

            setIsClustererMenuOpen(true);
        },
        [setClustererItems, setIsClustererMenuOpen]
    );

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const onClusterMenuClick =  useCallback((item: FacilityType) => {
      setActiveItem(item);
      setIsDrawerOpen(true);
    }, [setActiveItem, setIsDrawerOpen])

    return (
        <>
            <Head>
                <title>Карта</title>
                <meta name="title" content="Карта" />
            </Head>
            <main className={styles['MapObjects']}>
                <ClustererMenu onItemClick={onClusterMenuClick} items={clustererItems} open={isClustererMenuOpen} />
                <Sidebar
                    count={sportObjectsList?.count}
                    className={styles['Sidebar']}
                    error={error}
                    items={sportObjectsList?.facilities}
                    isLoading={isValidating}
                    activeItem={activeItem}
                    setActiveItem={onOpenItem}
                    isDrawerOpen={isDrawerOpen}
                    setIsDrawerOpen={setIsDrawerOpen}
                />
                <div className={styles['MapObjects-ShowButton']}>
                    <Button view={ButtonType.Clear} text="Показать объекты" onClick={() => setIsDrawerOpen(true)} />
                </div>
                <Map
                    width="100%"
                    height="100%"
                    instanceRef={mapRef}
                    defaultState={{
                        center: [59.964462, 30.460398],
                        zoom: 13,
                    }}
                    _events={{
                        actionbegin: () => setIsClustererMenuOpen(false),
                        wheel: () => setIsClustererMenuOpen(false),
                    }}
                >
                    <ZoomControl options={{ position: { right: 20, top: '30vh' } }} />
                    <Clusterer
                        onClick={onClustererClick}
                        options={{
                            clusterIconColor: isLight ? '#7AD6F3' : '#90B8F8',
                            groupByCoordinates: false,
                        }}
                    >
                        {sportObjectsListAll?.facilities?.map((item) => (
                            <Placemark
                                onClick={() => onOpenItem(item)}
                                key={item.id}
                                modules={['geoObject.addon.hint']}
                                geometry={[item.x, item.y]}
                                properties={{
                                    hintContent: `<span className="map-hint">${item.name}</span>`,
                                    item,
                                }}
                                options={{
                                    iconLayout: 'default#image',
                                    iconImageHref: getPlacemarkIcon(isLight, item.id === activeItem?.id),
                                    iconImageSize: [40, 40],
                                    hintCloseTimeout: 0,
                                }}
                            />
                        ))}
                    </Clusterer>
                </Map>
            </main>
        </>
    );
};

export const mapLayoutRenderer = appLayoutRenderer('', false);
