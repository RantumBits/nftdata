import React from 'react';
import { Heading, Button, Blockie, EthAddress, Text, Box, Flex, Card, Modal, Link, Loader, Image, Table } from 'rimble-ui';
import { ModalManager } from 'react-dynamic-modal'
import AssetItemModal from './AssetItemModal'

const SingleAsset = (props) => {
    const { item, buttonText, isSell } = props
    const imageURL = item && item.asset && (item.asset.image_thumbnail_url || item.asset.image_preview_url || item.asset.image_url)
    const name = item && item.asset && (item.asset.name || 'No Title')
    const assetLink = item && item.asset && (item.asset.permalink || '#')
    const collectionName = item && item.asset && item.asset.collection && item.asset.collection.name
    const collectionLink = item && item.asset && item.asset.collection && item.asset.collection.slug
    const price = item && (item.total_price || 0) / 1000000000000000000;

    const openModal = (item) => {
        ModalManager.open(<AssetItemModal item={item} sell={isSell || false} onRequestClose={() => true} />)
    }

    const randomNumber = Math.random() * 10000;

    return (
        <Card key={'myassets-' + randomNumber} m={3}>
            <Image src={imageURL} alt={name} width={1} borderRadius={8} />
            <Link href={assetLink} target="_blank"><Heading as={'h4'}>{name}</Heading></Link>
            {collectionName &&
                <Link href={`/collection/${collectionLink}`} target="_blank"><Text>{collectionName}</Text></Link>
            }
            <Text>Price: {price} ETH</Text>
            <Button.Outline size="small" onClick={() => openModal(item)}>{buttonText}</Button.Outline>
        </Card>
    );
}

export default SingleAsset;