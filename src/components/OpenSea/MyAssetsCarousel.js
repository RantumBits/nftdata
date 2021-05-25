import React from 'react';
import { Heading, Button, Blockie, EthAddress, Text, Box, Flex, Card, Modal, Link, Loader, Image, Table } from 'rimble-ui';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SingleAsset from './SingleAsset';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 2 // optional, default to 1.
    }
};

const MyAssetsCarousel = (props) => {
    const { accountaddress } = props;
    const [loaded, setLoaded] = React.useState(false);
    const [data, setData] = React.useState([]);

    const fetchData = (account) => {
        if (!accountaddress) { setLoaded(true); return; }

        const fetch = require('node-fetch');
        const url = 'https://api.opensea.io/api/v1/events';
        let qs = '?only_opensea=false';
        if (account) qs += "&account_address=" + account;
        const options = { method: 'GET' };
        fetch(url + qs, options)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setLoaded(true)
                setData(json.asset_events)
            })
            .catch(err => console.error('error:' + err));
    }

    React.useEffect(() => {
        fetchData(accountaddress);
    }, []);

    return (
        <>
            {!loaded && <Loader size='30px' marginRight={3} style={{ display: "inline-flex" }} />}
            {data &&
                <Carousel
                    showDots={true}
                    responsive={responsive}
                    infinite={true}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                >
                    {data && data.map((item, index) => {
                        return (
                            <SingleAsset key={index} item={item} buttonText={'Manage Item'} isSell={true} />
                        );
                    })}
                </Carousel>
            }
        </>
    );
}

export default MyAssetsCarousel;
