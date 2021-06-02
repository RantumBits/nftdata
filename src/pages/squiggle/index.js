import { graphql } from 'gatsby';
import React from 'react'
import { Heading, Button, Text, Box, Link, Loader, Image, Table } from 'rimble-ui';
import styled from 'styled-components';
import _ from 'lodash';

// Layout Components
import Layout from '../../components/layout';
import SEO from '../../components/seo';

const TableCellHeading = styled.th`
  padding: 1rem !important;
`
const TableCell = styled.td`
  padding: 1rem !important;
`


const ListHolders = ({data}) => {
    
    const allHolders = data.allExportTokenholdersForContract0X373Acda15Ce392362E4B46Ed97A7Feecd7Ef9Eb8Csv?data.allExportTokenholdersForContract0X373Acda15Ce392362E4B46Ed97A7Feecd7Ef9Eb8Csv.edges:[];
    const allHoldersSorted = _.orderBy(allHolders, ({node}) => node.Balance, 'desc')

    return (
        <Layout>
            <SEO title={`List SQUIGGLE Holders`} />
            <Heading as={"h3"}>List SQUIGGLE Holders</Heading>
            <Table mt={4}>
                <thead>
                    <tr>
                        <TableCellHeading>Rank</TableCellHeading>
                        <TableCellHeading>Address</TableCellHeading>
                        <TableCellHeading>Quantity</TableCellHeading>
                        {/* <TableCellHeading>Total Sale</TableCellHeading> */}
                    </tr>
                </thead>
                <tbody>
                    {allHoldersSorted.map(({node}, index) => (
                        <tr key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell><Link href={`/squiggle/${node.HolderAddress}`}>{node.HolderAddress}</Link></TableCell>
                            <TableCell>{node.Balance}</TableCell>
                            {/* <TableCell>{asset.num_sales || 0}</TableCell> */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Layout>
    );
}

export default ListHolders;

export const holdersQuery = graphql`
  query  {
    allExportTokenholdersForContract0X373Acda15Ce392362E4B46Ed97A7Feecd7Ef9Eb8Csv {
      edges {
        node {
          HolderAddress
          Balance
        }
      }
    }
  }
`;