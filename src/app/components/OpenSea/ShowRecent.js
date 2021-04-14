import React from 'react';

// Wallet Interface
import Wallet from '../../wallets';

import { OpenSeaPort, Network } from 'opensea-js'
import { Heading, Loader, Flex, Box } from 'rimble-ui';
import ShowAsset from './ShowAsset'

const ShowRecent = (props) => {

    const [loaded, setLoaded] = React.useState(false);
    const [assets, setAssets] = React.useState([]);

    React.useEffect(() => {
        const walletInstance = Wallet.instance();
        if (walletInstance && walletInstance.wallet) {
            const seaport = new OpenSeaPort(walletInstance.wallet.provider, {
                networkName: Network.Main
            })
            console.log("*** before fetchdata", walletInstance.wallet);
            seaport.api.getAssets().then((response) => {
                console.log("***** after getorders", response)
                setLoaded(true)
                setAssets(response.assets)
            });
        }
    }, []);

    return (
        <div>
            <Heading>Showing Recent Items</Heading>
            {!loaded && <span>Loading...<Loader /></span>}
            <Flex style={{flexWrap: "wrap"}}>
                {assets && assets.map((asset, i) => {
                    return <ShowAsset key={i} asset={asset} />
                })}
            </Flex>
        </div>
    );
}

export default ShowRecent;