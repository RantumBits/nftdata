import React from 'react';
import { Heading, Button, Text, Box, Flex, Card, Link, Loader, Image } from 'rimble-ui';
import SingleAsset from './SingleAsset';

const RecentListings = (props) => {
    const [loaded, setLoaded] = React.useState(false);
    const [data, setData] = React.useState([]);
    const limitSteps = 20
    const [currentLimit, setCurrentLimit] = React.useState(limitSteps);

    const fetchData = (account) => {
        const fetch = require('node-fetch');
        const url = 'https://api.opensea.io/api/v1/events';
        let qs = '?event_type=created&only_opensea=false&offset=0&limit=' + currentLimit
        if (account) qs += "&account_address=" + account;
        const options = { method: 'GET' };
        console.log("****** url", currentLimit, url + qs)
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

    React.useEffect(() => {
        //Filter based on login collection or all collection
        const currentAccountAddress = props.filterCollection !=='All' ? props.accountAddress : '0x694e64d4ad77e0c234b7b1c55ac40302ad86ce3f';
        setLoaded(false)
        setData([])
        fetchData(currentAccountAddress);
    }, [currentLimit, props.filterCollection]);

    return (
        <Box width={1} my={1} p={2} border='1px solid'>
            <Heading>
                Recent listings
                {!loaded && <Loader mx={2} style={{ display: "inline-flex" }} />}
            </Heading>
            {data && data.map((item, index) => {
                return (
                    <SingleAsset key={index} item={item} buttonText={'Make Offer'} />
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

export default RecentListings;