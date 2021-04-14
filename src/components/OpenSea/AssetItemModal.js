import React from 'react';
import { Heading, Button, Text, Box, Flex, Card, Link, Loader, Image, ToastMessage } from 'rimble-ui';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal'

import Wallet from '../../app/wallets';
import { RootStoreContext } from '../../app/stores/root.store';
import { OpenSeaPort, Network } from 'opensea-js'

const AssetItemModal = (props) => {
    const { item, onRequestClose, sell } = props;

    const rootStore = React.useContext(RootStoreContext);
    const isLoggedIn = rootStore.walletStore.hasAccount;

    const [loaded, setLoaded] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const [data, setData] = React.useState();
    // console.log("**** item", item, data)

    const fetchData = (assetContract, tokenId) => {
        const fetch = require('node-fetch');
        const url = `https://api.opensea.io/api/v1/asset/${assetContract}/${tokenId}/`;
        const options = { method: 'GET' };
        // console.log("****** url", url)
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                // console.log("Asset Details", json)
                setLoaded(true)
                setData(json)
            })
            .catch(err => console.error('error:' + err));
    }

    React.useEffect(() => {
        if (item.asset) {
            fetchData(item.asset.asset_contract.address, item.asset.token_id);
        }
    }, []);

    const imageURL = data && (data.image_preview_url || data.image_url)
    const name = data && (data.name || 'No Title')
    const description = data && data.description
    const collectionName = data && data.collection && data.collection.name
    const collectionLink = data && data.collection && data.collection.slug
    const price = (data && data.last_sale && data.last_sale.total_price || 0) / 1000000000000000000;
    const sellername = data && data.seller && data.seller.user && data.seller.user.username
    const ownername = data && data.owner && data.owner.user && data.owner.user.username

    const makeBuyOrder = async () => {
        if (!isLoggedIn) {
            console.log("******** NOT LOGGED IN")
            return;
        }
        setProcessing(true);
        const walletInstance = Wallet.instance();
        if (walletInstance && walletInstance.wallet) {
            const seaport = new OpenSeaPort(walletInstance.wallet.provider, {
                networkName: Network.Main
            })
            console.log("*** before fetchdata", rootStore.walletStore.defaultAddress);
            const offer = await seaport.createBuyOrder({
                asset: {
                    tokenId: item.asset.token_id,
                    tokenAddress: item.asset.asset_contract.address,
                },
                accountAddress: rootStore.walletStore.defaultAddress,
                startAmount: price,
            })
            setProcessing(false)
            console.log("***** offer created", offer)
            ModalManager.close();
        }
    }
    const makeSellOrder = async () => {
        if (!isLoggedIn) {
            console.log("******** NOT LOGGED IN")
            return;
        }
        setProcessing(true);
        const walletInstance = Wallet.instance();
        if (walletInstance && walletInstance.wallet) {
            const seaport = new OpenSeaPort(walletInstance.wallet.provider, {
                networkName: Network.Main
            })
            const offer = await seaport.createSellOrder({
                asset: {
                    tokenId: item.asset.token_id,
                    tokenAddress: item.asset.asset_contract.address,
                },
                accountAddress: rootStore.walletStore.defaultAddress,
                startAmount: price,
            })
            setProcessing(false)
            console.log("***** sell order created", offer)
            ModalManager.close();
        }
    }
    return (
        <Modal onRequestClose={onRequestClose} effect={Effect.ScaleUp}>
            <Card p={0}>
                <Button.Text
                    icononly
                    icon={"Close"}
                    color={"moon-gray"}
                    position={"absolute"}
                    top={0}
                    right={0}
                    mt={3}
                    mr={3}
                    onClick={ModalManager.close}
                />

                <Box p={4} mb={3}>
                    {!loaded && <Box><Loader m={2} style={{ display: "inline-flex" }} /> Loading Asset Details...</Box>}
                    {data &&
                        <Flex mt={3} flexDirection={['column', 'row']}>
                            <Box width={[1, 1 / 2]}>
                                <Image src={imageURL} alt={name} width={'100%'} borderRadius={8} />
                            </Box>
                            <Box px={3}>
                                <Heading.h3>{name}</Heading.h3>
                                {collectionName &&
                                    <Link href={`http://opensea.io/collection/${collectionLink}`} target="_blank"><Text>{collectionName}</Text></Link>
                                }
                                <Text>{description}</Text>
                                <Text><strong>Price: </strong>{price} ETH</Text>
                                {sellername &&
                                    <Text><strong>Sold by: </strong>{sellername}</Text>
                                }
                                {ownername &&
                                    <Text><strong>Listed by: </strong>{ownername}</Text>
                                }
                                {!sell &&
                                    <Button
                                        variant="success"
                                        icon="ShoppingCart"
                                        size="small"
                                        mt={5}
                                        onClick={makeBuyOrder}
                                        disabled={!isLoggedIn}>
                                        Buy Now
                                </Button>
                                }
                                {sell &&
                                    <Button
                                        variant="success"
                                        icon="ShoppingCart"
                                        size="small"
                                        mt={5}
                                        onClick={makeSellOrder}
                                        disabled={!isLoggedIn}>
                                        Sell Now
                                </Button>
                                }
                                {processing && <Loader m={2} style={{ display: "inline-flex" }} />}
                                {!isLoggedIn &&
                                    <ToastMessage
                                        message={'Authentical Required'}
                                        secondaryMessage={"Please login to Buy this Item"}
                                        variant={'failure'}
                                    />
                                }
                            </Box>
                        </Flex>
                    }
                </Box>

                <Flex
                    px={4}
                    py={3}
                    borderTop={1}
                    borderColor={"#E8E8E8"}
                    justifyContent={"flex-end"}
                >
                    <Button size='small' onClick={ModalManager.close}>Close</Button>
                </Flex>
            </Card>
        </Modal>
    )
}

export default AssetItemModal;