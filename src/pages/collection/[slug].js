import _,{ sampleSize } from 'lodash';
import React from 'react'
import { Heading, Button, Text, Box, Flex, Card, Link, Loader, Image } from 'rimble-ui';
import styled from 'styled-components';

// Layout Components
import Layout from '../../components/layout';
import SEO from '../../components/seo';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../../components/custom-tabs.css';
import RecentSales from '../../components/OpenSea/RecentSales'
import RecentListings from '../../components/OpenSea/RecentListings'

const TableCellHeading = styled.th`
  padding: 1rem !important;
`
const TableCell = styled.td`
  padding: 1rem !important;
`


const IndividualCollection = (props) => {
    const { slug } = props;

    const [loaded, setLoaded] = React.useState(false);
    const [collectionData, setCollectionData] = React.useState();
    // superrare, known-origin, async-art, cryptopunks, art-blocks
    const collectionMap = [
        { slug:'superrare', address:'0x8c9f364bf7a56ed058fc63ef81c6cf09c833e656' }, // Superrare
        { slug:'known-origin', address: '0xfbeef911dc5821886e1dda71586d90ed28174b7d' }, // Known Origin
        { slug:'async-art', address: '0xb6dae651468e9593e4581705a09c10a76ac1e0c8' }, // async-art
        { slug:'cryptopunks', address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb' }, // Cryptopunks
        { slug:'art-blocks', address: '0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270' }, // art-blocks
    ]
    const collectionAddress = _.find(collectionMap, ["slug", slug]) || {};

    React.useEffect(() => {
        //get assets
        const fetch = require('node-fetch');
        const url = 'https://api.opensea.io/api/v1/collections?offset=0&limit=1&asset_owner=' + collectionAddress.address;
        console.log("*** url", url)
        fetch(url)
            .then(res => res.json())
            .then(json => {
                console.log(json[0])
                setLoaded(true)
                setCollectionData(json[0])
            })
            .catch(err => console.error('error:' + err));
    }, []);

    const imageURL = collectionData && (collectionData.featured_image_url || collectionData.banner_image_url || collectionData.image_url)

    return (
        <Layout>
            <SEO title={`Collection | ${slug}`} />
            {/**
            <Box mt={4}>
                <Text.p style={{ float: "right" }}>
                    <Button size="small" as="a" href="/">&lt;&lt; Back to Home</Button>
                </Text.p>
            </Box>

              <Heading as={"h3"}>
                '{slug}' collection
            </Heading>
            **/}
            {!loaded && <Loader mx={2} style={{ display: "inline-flex" }} />}
            {collectionData &&
                <Card m={3}>
                    <Image src={imageURL} alt={collectionData.name} width={1 / 4} borderRadius={8} />
                    <Link href={`/collection/${collectionData.slug}`} target="_blank">
                        <Heading as={'h3'}>{collectionData.name}</Heading>
                    </Link>
                    <Text>{collectionData.description}</Text>
                    <Flex>
                        <Card width={1 / 4} m={3}>
                            <Heading as={'h4'} textAlign='center'>{collectionData.stats.market_cap.toFixed(2)}</Heading>
                            <Text fontSize={0} textAlign='center'>Market Cap</Text>
                        </Card>
                        <Card width={1 / 4} m={3}>
                            <Heading as={'h4'} textAlign='center'>{collectionData.stats.average_price.toFixed(2)}</Heading>
                            <Text fontSize={0} textAlign='center'>Avg. Price</Text>
                        </Card>
                        <Card width={1 / 4} m={3}>
                            <Heading as={'h4'} textAlign='center'>{collectionData.stats.total_sales.toFixed(2)}</Heading>
                            <Text fontSize={0} textAlign='center'>Total Sales</Text>
                        </Card>
                        <Card width={1 / 4} m={3}>
                            <Heading as={'h4'} textAlign='center'>{collectionData.stats.num_owners}</Heading>
                            <Text fontSize={0} textAlign='center'>Owners</Text>
                        </Card>
                    </Flex>
                </Card>
            }
            <Tabs>
                <TabList>
                    <Tab bg="blue">Recent Sales</Tab>
                    <Tab>Recent Listings</Tab>
                    <Tab>Data & Charts</Tab>
                    <Tab>Info</Tab>
                </TabList>

                <TabPanel>
                    <RecentSales
                        initialCollections={[slug]}
                        filterCollection={'All'}
                    />
                </TabPanel>
                <TabPanel>
                    <RecentListings
                        initialCollections={[slug]}
                        filterCollection={'All'}
                    />
                </TabPanel>
                <TabPanel>
                    embedded link(s)
                </TabPanel>
                <TabPanel>

                </TabPanel>
            </Tabs>
        </Layout>
    );
}

export default IndividualCollection;
