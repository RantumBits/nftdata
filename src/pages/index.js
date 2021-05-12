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

import { RootStoreContext } from '../app/stores/root.store';

const IndexPage = ({ data }) => {

    const rootStore = React.useContext(RootStoreContext);
    const isLoggedIn = rootStore.walletStore.hasAccount;
    const accountAddress = rootStore.walletStore.defaultAddress;

    const [filterCollection, setFilterCollection] = React.useState("All")

    return (
        <Layout>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            <MyAssetsSection site={data.site} />
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
            <Flex>
                <RecentSales filterCollection={filterCollection} accountAddress={accountAddress} />
                <RecentListings filterCollection={filterCollection} accountAddress={accountAddress} />
            </Flex>
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