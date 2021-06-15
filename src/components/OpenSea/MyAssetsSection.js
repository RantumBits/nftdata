import React from 'react';
import { navigate } from 'gatsby';
import { Heading, Button, Blockie, EthAddress, Text, Box, Flex, Card, Modal, Link, Loader, Image, Table } from 'rimble-ui';
import _ from 'lodash'
import MyAssetsCarousel from './MyAssetsCarousel'

// Layout Components
import Wallet from '../../app/wallets';
import { RootStoreContext } from '../../app/stores/root.store';

const MyAssetsSection = ({ site }) => {

    const rootStore = React.useContext(RootStoreContext);
    const isLoggedIn = rootStore.walletStore.hasAccount;

    const [isOpen, setIsOpen] = React.useState(false);

    const closeModal = e => {
        e.preventDefault();
        setIsOpen(false);
    };

    const openModal = e => {
        e.preventDefault();
        setIsOpen(true);
    };

    // Prepare Wallet Interface
    const wallet = Wallet.instance();
    wallet.prepare({ store: rootStore.walletStore, site: site.siteMetadata })
        .catch(err => { console.log(err); });

    const _walletConnect = (walletType) => async () => {
        try {
            await wallet.init(walletType);
            await wallet.connect();
            setIsOpen(false);
            //navigate(`/`);
        }
        catch (err) {
            console.error(err);
        }
    };
    const _logout = async () => {
        await wallet.disconnect();
        navigate(`/`);
    };

    const walletButtons = _.map(Wallet.typeMap(), (walletData, walletType) => {
        const disabled = !Wallet.isEnabled(walletType);
        return (
            <Box key={walletType} m={2}>
                <Button size="small" onClick={_walletConnect(walletType)} disabled={disabled}>{walletData.name}</Button>
            </Box>
        );
    });

    return (
        <div>
            <Flex mt={4} flexDirection="row">

                {!isLoggedIn &&
                    <Box width={1}><Button size="small" style={{ float: "right" }} onClick={openModal}>Login</Button></Box>
                }
                {isLoggedIn &&
                    <>
                        <Box width={1 / 12}>
                            <Blockie
                                opts={{
                                    seed: rootStore.walletStore.defaultAddress,
                                    color: `#${rootStore.walletStore.defaultAddress.slice(2, 8)}`,
                                    bgcolor: `#${rootStore.walletStore.defaultAddress.slice(-6)}`,
                                    size: 15,
                                    scale: 3,
                                    spotcolor: '#000'
                                }}
                            />
                        </Box>
                        <Box width={1}><EthAddress address={rootStore.walletStore.defaultAddress} /></Box>
                        <Box width={1 / 12} ml={3}><Button size="small" onClick={_logout}>Logout</Button></Box>
                    </>
                }
            </Flex>
{/**
            {!isLoggedIn &&
                <Heading as={"h2"}>Login to manage Assets</Heading>
            }
            {isLoggedIn &&
                <Box>
                    <Heading as={"h2"}>Manage Assets</Heading>
                    <MyAssetsCarousel accountaddress={rootStore.walletStore.defaultAddress}/>
                </Box>
            }
**/}
            <Modal isOpen={isOpen}>
                <Card width={"420px"} p={0}>
                    <Button.Text
                        icononly
                        icon={"Close"}
                        color={"moon-gray"}
                        position={"absolute"}
                        top={0}
                        right={0}
                        mt={3}
                        mr={3}
                        onClick={closeModal}
                    />

                    <Box p={4} mb={3}>
                        <Heading.h3>Choose Login Option</Heading.h3>
                        <Flex flexWrap='wrap'>{walletButtons}</Flex>
                    </Box>

                    <Flex
                        px={4}
                        py={3}
                        borderTop={1}
                        borderColor={"#E8E8E8"}
                        justifyContent={"flex-end"}
                    >
                        <Button.Outline size='small' onClick={closeModal}>Close</Button.Outline>
                    </Flex>
                </Card>
            </Modal>
        </div>
    );
};

export default MyAssetsSection;
