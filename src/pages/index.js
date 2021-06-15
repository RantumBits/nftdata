// Frameworks
import React from 'react';
import { graphql } from 'gatsby';
import { Flex } from 'rimble-ui';

// Layout Components
import Layout from '../components/layout';
import SEO from '../components/seo';
import RecentSales from '../components/OpenSea/RecentSales'
import RecentListings from '../components/OpenSea/RecentListings'
import MyAssetsSection from '../components/OpenSea/MyAssetsSection'
import { Field, Radio } from 'rimble-ui';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../components/custom-tabs.css';

import { RootStoreContext } from '../app/stores/root.store';

const IndexPage = ({ data }) => {

    const rootStore = React.useContext(RootStoreContext);
    const isLoggedIn = rootStore.walletStore.hasAccount;
    const accountAddress = rootStore.walletStore.defaultAddress;

    const [filterCollection, setFilterCollection] = React.useState("All")

    const initialCollections = [
        'superrare',
        'known-origin',
        'async-art',
        'cryptopunks',
        'art-blocks',
    ]

    return (
        <Layout>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            {/* <ListCollections /> */}
            <MyAssetsSection site={data.site} />
            <h3>Crypto art sales, data, links and info </h3>
            <Field label="Filter collections" mt={3}>
                <Radio
                    name="filterCollection"
                    value="All"
                    label="All"
                    my={2}
                    defaultChecked
                    checked={filterCollection === "All"}
                    onChange={(e) => setFilterCollection(e.target.value)}
                />
                <Radio
                    name="filterCollection"
                    value="Wallet"
                    label="Wallet"
                    my={2}
                    checked={filterCollection === "Wallet"}
                    onChange={(e) => setFilterCollection(e.target.value)}
                />
            </Field>
            <Tabs>
                <TabList>
                    <Tab bg="blue">Recent Sales</Tab>
                    <Tab>Recent Listings</Tab>
                </TabList>

                <TabPanel>
                    <RecentSales
                        initialCollections={initialCollections}
                        filterCollection={filterCollection}
                        accountAddress={accountAddress}
                    />
                </TabPanel>
                <TabPanel>
                    <RecentListings
                        initialCollections={initialCollections}
                        filterCollection={filterCollection}
                        accountAddress={accountAddress}
                    />
                </TabPanel>
            </Tabs>
        </Layout>
    );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageSiteDataQuery {
    site {
        siteMetadata {
            title
            logoUrl
        }
    }
  }
`;
