import {ApolloClient,InMemoryCache,gql} from "@apollo/client/core/core.cjs";

export const LENS_API_URL = 'https://api.lens.dev'

export const setApolloClient = () => { 

    const client =  new ApolloClient({
        uri: LENS_API_URL,
        cache: new InMemoryCache()
    })
    
    return  client;

}

export const challenge = gql`
    query Challenge($address: EthereumAddress!) {
        challenge(request: { address: $address }) {
        text
        }
    }
`

export const authenticate = gql`
    mutation Authenticate(
        $address: EthereumAddress!
        $signature: Signature!
    ) {
        authenticate(request: {
        address: $address,
        signature: $signature
        }) {
        accessToken
        refreshToken
        }
    }
`

export const exploreProfiles = gql`
    query ExploreProfiles {
    exploreProfiles(request: { sortCriteria: MOST_FOLLOWERS }) {
        items {
        id
        name
        bio
        handle
        picture {
            ... on MediaSet {
            original {
                url
            }
            }
        }
        stats {
            totalFollowers
        }
        }
    }
    }
`

export const getPosts =  gql`
    query ExplorePublications {
    explorePublications(request: {
        sortCriteria: TOP_COMMENTED,
        publicationTypes: [POST, COMMENT, MIRROR],
        limit: 25
    }) {
        items {
        __typename 
        ... on Post {
            ...PostFields
        }
        ... on Comment {
            ...CommentFields
        }
        ... on Mirror {
            ...MirrorFields
        }
        }
        pageInfo {
        prev
        next
        totalCount
        }
    }
    }

    fragment MediaFields on Media {
    url
    width
    height
    mimeType
    }

    fragment ProfileFields on Profile {
    id
    name
    bio
    attributes {
        displayType
        traitType
        key
        value
    }
    isFollowedByMe
    isFollowing(who: null)
    followNftAddress
    metadata
    isDefault
    handle
    picture {
        ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
        }
        ... on MediaSet {
        original {
            ...MediaFields
        }
        small {
            ...MediaFields
        }
        medium {
            ...MediaFields
        }
        }
    }
    coverPicture {
        ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
        }
        ... on MediaSet {
        original {
            ...MediaFields
        }
        small {
            ...MediaFields
        }
        medium {
            ...MediaFields
        }
        }
    }
    ownedBy
    dispatcher {
        address
    }
    stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
    }
    followModule {
        ...FollowModuleFields
    }
    }

    fragment PublicationStatsFields on PublicationStats { 
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
    }

    fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
        original {
        ...MediaFields
        }
        small {
        ...MediaFields
        }
        medium {
        ...MediaFields
        }
    }
    attributes {
        displayType
        traitType
        value
    }
    }

    fragment Erc20Fields on Erc20 {
    name
    symbol
    decimals
    address
    }

    fragment PostFields on Post {
    id
    profile {
        ...ProfileFields
    }
    stats {
        ...PublicationStatsFields
    }
    metadata {
        ...MetadataOutputFields
    }
    createdAt
    collectModule {
        ...CollectModuleFields
    }
    referenceModule {
        ...ReferenceModuleFields
    }
    appId
    hidden
    reaction(request: null)
    mirrors(by: null)
    hasCollectedByMe
    }

    fragment MirrorBaseFields on Mirror {
    id
    profile {
        ...ProfileFields
    }
    stats {
        ...PublicationStatsFields
    }
    metadata {
        ...MetadataOutputFields
    }
    createdAt
    collectModule {
        ...CollectModuleFields
    }
    referenceModule {
        ...ReferenceModuleFields
    }
    appId
    hidden
    reaction(request: null)
    hasCollectedByMe
    }

    fragment MirrorFields on Mirror {
    ...MirrorBaseFields
    mirrorOf {
        ... on Post {
        ...PostFields          
        }
        ... on Comment {
        ...CommentFields          
        }
    }
    }

    fragment CommentBaseFields on Comment {
    id
    profile {
        ...ProfileFields
    }
    stats {
        ...PublicationStatsFields
    }
    metadata {
        ...MetadataOutputFields
    }
    createdAt
    collectModule {
        ...CollectModuleFields
    }
    referenceModule {
        ...ReferenceModuleFields
    }
    appId
    hidden
    reaction(request: null)
    mirrors(by: null)
    hasCollectedByMe
    }

    fragment CommentFields on Comment {
    ...CommentBaseFields
    mainPost {
        ... on Post {
        ...PostFields
        }
        ... on Mirror {
        ...MirrorBaseFields
        mirrorOf {
            ... on Post {
                ...PostFields          
            }
            ... on Comment {
                ...CommentMirrorOfFields        
            }
        }
        }
    }
    }

    fragment CommentMirrorOfFields on Comment {
    ...CommentBaseFields
    mainPost {
        ... on Post {
        ...PostFields
        }
        ... on Mirror {
            ...MirrorBaseFields
        }
    }
    }

    fragment FollowModuleFields on FollowModule {
    ... on FeeFollowModuleSettings {
        type
        amount {
        asset {
            name
            symbol
            decimals
            address
        }
        value
        }
        recipient
    }
    ... on ProfileFollowModuleSettings {
        type
        contractAddress
    }
    ... on RevertFollowModuleSettings {
        type
        contractAddress
    }
    ... on UnknownFollowModuleSettings {
        type
        contractAddress
        followModuleReturnData
    }
    }

    fragment CollectModuleFields on CollectModule {
    __typename
    ... on FreeCollectModuleSettings {
        type
        followerOnly
        contractAddress
    }
    ... on FeeCollectModuleSettings {
        type
        amount {
        asset {
            ...Erc20Fields
        }
        value
        }
        recipient
        referralFee
    }
    ... on LimitedFeeCollectModuleSettings {
        type
        collectLimit
        amount {
        asset {
            ...Erc20Fields
        }
        value
        }
        recipient
        referralFee
    }
    ... on LimitedTimedFeeCollectModuleSettings {
        type
        collectLimit
        amount {
        asset {
            ...Erc20Fields
        }
        value
        }
        recipient
        referralFee
        endTimestamp
    }
    ... on RevertCollectModuleSettings {
        type
    }
    ... on TimedFeeCollectModuleSettings {
        type
        amount {
        asset {
            ...Erc20Fields
        }
        value
        }
        recipient
        referralFee
        endTimestamp
    }
    ... on UnknownCollectModuleSettings {
        type
        contractAddress
        collectModuleReturnData
    }
    }

    fragment ReferenceModuleFields on ReferenceModule {
    ... on FollowOnlyReferenceModuleSettings {
        type
        contractAddress
    }
    ... on UnknownReferenceModuleSettings {
        type
        contractAddress
        referenceModuleReturnData
    }
    ... on DegreesOfSeparationReferenceModuleSettings {
        type
        contractAddress
        commentsRestricted
        mirrorsRestricted
        degreesOfSeparation
    }
    }
`
