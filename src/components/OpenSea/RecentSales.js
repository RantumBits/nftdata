import React from 'react';
import { Heading, Button, Text, Box, Flex, Card, Link, Loader, Image } from 'rimble-ui';
import SingleAsset from './SingleAsset';
import _ from 'lodash'

const RecentSales = (props) => {
    const [loaded, setLoaded] = React.useState(false);
    const [data, setData] = React.useState([]);
    const limitSteps = 20
    const [currentLimit, setCurrentLimit] = React.useState(limitSteps);

    const fetchData = (accountAddress, collection) => {
        const fetch = require('node-fetch');
        const url = 'https://api.opensea.io/api/v1/events';
        let qs = '?event_type=created&only_opensea=false&offset=0&limit=' + currentLimit
        if (accountAddress) qs += "&account_address=" + accountAddress;
        if (collection) qs += "&collection_slug=" + collection;
        const options = { method: 'GET' };
        console.log("****** recent sales api url", currentLimit, url + qs)
        fetch(url + qs, options)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setLoaded(true)
                if (json.asset_events) setData(data => [...data, ...json.asset_events])
            })
            .catch(err => console.error('error:' + err));
    }

    const loadMore = () => {
        setLoaded(false)
        setCurrentLimit(currentLimit + limitSteps)
    }

    React.useEffect(() => {
        setLoaded(false)
        setData([])
        if (props.filterCollection == 'All' && props.initialCollections) {
            props.initialCollections.map(item => {
                fetchData(props.accountAddress, item);
            })
        } else {
            fetchData(props.accountAddress);
        }
    }, [currentLimit, props.filterCollection]);

    return (
        <Box width={1} m={0} p={2} border='1px solid' borderTop='0'>
            <Heading>
                {/* Recent sales */}
                {!loaded && <Loader mx={2} style={{ display: "inline-flex" }} />}
            </Heading>
            <Flex flexWrap='wrap'>
                {data && data.map((item, index) => {
                    return (
                        <Box width={1 / 2}>
                            <SingleAsset key={index} item={item} buttonText={'Get Details'} />
                        </Box>
                    )
                })}
            </Flex>

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
