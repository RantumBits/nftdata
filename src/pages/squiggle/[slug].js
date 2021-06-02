import React from 'react'
import { Heading, Button, Text, Box, Link, Loader, Image, Table } from 'rimble-ui';
import styled from 'styled-components';

// Layout Components
import Layout from '../../components/layout';
import SEO from '../../components/seo';

const TableCellHeading = styled.th`
  padding: 1rem !important;
`
const TableCell = styled.td`
  padding: 1rem !important;
`


const IndividualHolder = (props) => {
    console.log("***** collection props", props)
    const { slug } = props;

    const [loaded, setLoaded] = React.useState(false);
    const [assets, setAssets] = React.useState([]);

    React.useEffect(() => {
        //get assets
        const fetch = require('node-fetch');
        const url = `https://api.opensea.io/api/v1/assets?owner=${slug}&order_direction=desc&collection=art-blocks`;
        const options = { method: 'GET'};
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setLoaded(true)
                setAssets(json.assets)
            })
            .catch(err => console.error('error:' + err));
    }, []);

    return (
        <Layout>
            <SEO title={`Holder | ${slug}`} />
            <Box mt={4}>
                <Text.p style={{ float: "right" }}>
                    <Button size="small" as="a" href="/squiggle">&lt;&lt; Back to List</Button>
                </Text.p>
            </Box>
            <Heading as={"h3"}>
                '{slug}' assets
            </Heading>
            <Table mt={4}>
                <thead>
                    <tr>
                        <TableCellHeading>SrNo</TableCellHeading>
                        <TableCellHeading>Name</TableCellHeading>
                        <TableCellHeading>Image</TableCellHeading>
                        <TableCellHeading>Total Sale</TableCellHeading>
                    </tr>
                </thead>
                <tbody>
                    {!loaded && <tr><TableCell><Loader style={{ display: "inline-flex" }} />Loading Assets...</TableCell></tr>}
                    {assets && assets.map((asset, index) => (
                        <tr key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell><Link href={asset.permalink} target="_blank">{asset.name || "No Name"}</Link></TableCell>
                            <TableCell><Image src={asset.image_thumbnail_url || asset.image_url} alt={asset.name} borderRadius={8} width={80} /></TableCell>
                            <TableCell>{asset.num_sales || 0}</TableCell>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Layout>
    );
}

export default IndividualHolder ;