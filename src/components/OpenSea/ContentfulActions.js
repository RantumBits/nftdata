import * as contentful from 'contentful-management';

const config = {
    cfAccessToken: 'CF' + 'PAT' + '-UjglQTu0UcIGgRtK9i44' + '_Lvh481GA7DAeGwNY32MKMA',
    cfSpaceID: 'lz0damvofaeg',
}
const ContentfulInit = () => {
    const localClient = contentful.createClient({
        accessToken: config.cfAccessToken
    });
    return localClient;
}
export const ContentfulReadTags = (walletAddress, assetId) => {
    return new Promise(function (resolve, reject) {
        const cfClient = ContentfulInit();
        cfClient.getSpace(config.cfSpaceID).then((space) => {
            space.getEnvironment('master').then((environment) => {
                environment.getEntries({ 'content_type': 'nftDataTags', 'fields.walletAddress': walletAddress }).then((entries) => {
                    if (entries.items && entries.items.length > 0) {
                        const existingAssets = entries.items[0].fields['savedTags']['en-US']['assets'];
                        const existingAssetNode = existingAssets.find(item => item.id === assetId)
                        resolve((existingAssetNode && existingAssetNode['tags']) || []);
                    }
                })
            })
        })
    })
}

export const ContentfulWriteTags = (walletAddress, assetId, tag) => {
    return new Promise(function (resolve, reject) {
        const cfClient = ContentfulInit();
        cfClient.getSpace(config.cfSpaceID).then((space) => {
            space.getEnvironment('master').then((environment) => {
                environment.getEntries({ 'content_type': 'nftDataTags', 'fields.walletAddress': walletAddress }).then((entries) => {
                    if (entries.items && entries.items.length > 0) {
                        const existingAssets = entries.items[0].fields['savedTags']['en-US']['assets'];
                        // console.log("*** existingAssets=", existingAssets, (!!!existingAssets.find(item => item.id === assetId)))
                        //if asset node doesnot exists then create a node with tag in it
                        if (!!!existingAssets.find(item => item.id === assetId)) {
                            const newNode = {
                                id: assetId,
                                tags: [tag]
                            }
                            existingAssets.push(newNode)
                        } else { // if asset node exists then append the tag to it
                            const existingAssetNode = existingAssets.find(item => item.id === assetId)
                            existingAssetNode['tags'].push(tag)
                        }
                        entries.items[0].update();
                        resolve(true);
                    }
                    else { // if this is first item for the customer then create content in contentful
                        const newNode = {
                            id: assetId,
                            tags: [tag]
                        }
                        environment.createEntry('nftDataTags', {
                            fields: {
                                walletAddress: { 'en-US': walletAddress },
                                // savedTags: { 'en-US': { [assetId]: [tag] } }                                
                                savedTags: { 'en-US': { assets: [newNode] } }
                            }
                        }).then((entry) => { console.log("New entry created successfully", entry); resolve(entry); })
                            .catch(console.error)
                    }
                })
            })
        })
    })
}