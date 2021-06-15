import React from 'react';
import { Heading, Button, Text, Box, Flex, Card, Link, Loader, Image } from 'rimble-ui';

const ListCollections = (props) => {
    const [loaded, setLoaded] = React.useState(false);
    const [data, setData] = React.useState([]);
    const inputCollections = [
        '0x8c9f364bf7a56ed058fc63ef81c6cf09c833e656', // Superrare
        '0xfbeef911dc5821886e1dda71586d90ed28174b7d', // Known Origin
        '0xb6dae651468e9593e4581705a09c10a76ac1e0c8', // async-art
        '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb', // Cryptopunks
        '0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270', // art-blocks
    ]

    const fetchData = (collectionAddress) => {
        const fetch = require('node-fetch');
        const url = 'https://api.opensea.io/api/v1/collections?offset=0&limit=1&asset_owner=' + collectionAddress;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json && json.length >= 0) {
                    console.log(json[0])
                    setData(data => [...data, ...json])
                    setLoaded(true)
                }
            })
            .catch(err => console.error('error:' + err));
    }

    React.useEffect(() => {
        setLoaded(false)
        setData([])
        inputCollections.map(item => {
            fetchData(item);
        })
    }, []);

    return (
        <Box width={1} my={1} p={2} border='1px solid'>
            <Heading>
                List of Collections
                {!loaded && <Loader mx={2} style={{ display: "inline-flex" }} />}
            </Heading>
            {data && data.map((item, index) => {
                const imageURL = item && (item.featured_image_url || item.banner_image_url || item.image_url)
                return (
                    <Card key={index} m={3}>
                        <Image src={imageURL} alt={item.name} width={1 / 4} borderRadius={8} />
                        <Link href={`/collection/${item.slug}`} target="_blank">
                            <Heading as={'h3'}>{item.name}</Heading>
                        </Link>
                        <Text>{item.description}</Text>
                        <Flex>
                            <Card width={1 / 4} m={3}>
                                <Heading as={'h4'} textAlign='center'>{item.stats.market_cap.toFixed(2)}</Heading>
                                <Text fontSize={0} textAlign='center'>Market Cap</Text>
                            </Card>
                            <Card width={1 / 4} m={3}>
                                <Heading as={'h4'} textAlign='center'>{item.stats.average_price.toFixed(2)}</Heading>
                                <Text fontSize={0} textAlign='center'>Avg. Price</Text>
                            </Card>
                            <Card width={1 / 4} m={3}>
                                <Heading as={'h4'} textAlign='center'>{item.stats.total_sales.toFixed(2)}</Heading>
                                <Text fontSize={0} textAlign='center'>Total Sales</Text>
                            </Card>
                            <Card width={1 / 4} m={3}>
                                <Heading as={'h4'} textAlign='center'>{item.stats.num_owners}</Heading>
                                <Text fontSize={0} textAlign='center'>Owners</Text>
                            </Card>
                        </Flex>
                    </Card>
                )
            })}
        </Box>
    )
}

export default ListCollections;
