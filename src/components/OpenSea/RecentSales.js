import React from 'react';
import { Heading, Button, Text, Box, Flex, Card, Link, Loader, Image } from 'rimble-ui';
import { ModalManager } from 'react-dynamic-modal'
import AssetItemModal from './AssetItemModal'

const RecentSales = (props) => {
    const [loaded, setLoaded] = React.useState(false);
    const [data, setData] = React.useState([]);
    const limitSteps = 20
    const [currentLimit, setCurrentLimit] = React.useState(limitSteps);

    const fetchData = (account) => {
        const fetch = require('node-fetch');
        const url = 'https://api.opensea.io/api/v1/events';
        let qs = '?event_type=successful&only_opensea=false&offset=0&limit=' + currentLimit
        if (account) qs += "&account_address=" + account;
        const options = { method: 'GET' };
        // console.log("****** url", currentLimit, url + qs)
        fetch(url + qs, options)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setLoaded(true)
                setData(json.asset_events)
            })
            .catch(err => console.error('error:' + err));
    }

    const loadMore = () => {
        setLoaded(false)
        setCurrentLimit(currentLimit + limitSteps)
    }

    const openModal = (item) => {
        ModalManager.open(<AssetItemModal item={item} onRequestClose={() => true} />)
    }

    React.useEffect(() => {
        fetchData('0x694e64d4ad77e0c234b7b1c55ac40302ad86ce3f');
    }, [currentLimit]);

    return (
        <Box width={1} my={1} p={2} border='1px solid'>
            <Heading>
                RECENT SALES
                {!loaded && <Loader mx={2} style={{ display: "inline-flex" }} />}
            </Heading>
            {data && data.map((item, index) => {
                const imageURL = item.asset && (item.asset.image_thumbnail_url || item.asset.image_preview_url || item.asset.image_url)
                const name = item.asset && (item.asset.name || 'No Title')
                const assetLink = item.asset && (item.asset.permalink || '#')
                const collectionName = item.asset && item.asset.collection && item.asset.collection.name
                const collectionLink = item.asset && item.asset.collection && item.asset.collection.slug
                const price = (item.total_price || 0) / 1000000000000000000;
                const sellername = item.seller && item.seller.user && item.seller.user.username
                return (
                    <Card px={3} key={index}>
                        <Flex>
                            <Box>
                                <Image src={imageURL} alt={name} width={80} borderRadius={8} />
                            </Box>
                            <Box px={3}>
                                <Link href={assetLink} target="_blank"><Heading as={'h4'}>{name}</Heading></Link>
                                {collectionName &&
                                    <Link href={`http://opensea.io/collection/${collectionLink}`} target="_blank"><Text>{collectionName}</Text></Link>
                                }
                                <Text>Price: {price} ETH</Text>
                                {sellername &&
                                    <Text>Sold by: {sellername}</Text>
                                }
                                <Button.Outline size="small" onClick={() => openModal(item)}>Get Details</Button.Outline>
                            </Box>
                        </Flex>
                    </Card>
                )
            })}

            {data && data.length > 0 &&
                <Flex justifyContent='flex-end' my={3}>
                    {!loaded && <Loader size='30px' marginRight={3} style={{ display: "inline-flex" }} />}
                    <Button size="small" onClick={loadMore}>Load More</Button>
                </Flex>
            }

        </Box>
    )
}

export default RecentSales;