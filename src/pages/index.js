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

const IndexPage = ({ data }) => {

    return (
        <Layout>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            <MyAssetsSection site={data.site} />
            <Flex mt={3}>
                <RecentSales />
                <RecentListings />
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