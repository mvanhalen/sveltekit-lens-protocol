<script>
      /** @type {import('./$types').PageData} */
    import { ethers } from 'ethers'
    import {challenge, authenticate, exploreProfiles} from '$lib/lensApi.js'
    import { onMount } from 'svelte';
    import { graphClient } from '$lib/store';

    let address = null;
    let token = null;
    let profilesResult = null;

    
    console.log('grapghQL client',$graphClient);

    onMount(async () => {

        
    })


    async function connectWallet() {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Please install MetaMask or other wallet");
            return;
        }
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            const account = accounts[0];
            console.log("Connected", account);
            address = account;
        } catch (err) {
            console.log(err);
        }
    }
    async function loginLens() {
        console.log('login');
       
        try {
            /* first request the challenge from the API server */
            const challengeInfo = await $graphClient.query({
                query:challenge,
                variables: { address }
            })
            console.log('challengeInfo',challengeInfo)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log('provider',provider);
            const signer = provider.getSigner()
            /* ask the user to sign a message with the challenge info returned from the server */
            const signature = await signer.signMessage(challengeInfo.data.challenge.text)
            /* authenticate the user */
            const authData = await $graphClient.mutate({
                mutation:authenticate,
                variables: {
                    address, signature
                }
            })
            /* if user authentication is successful, you will receive an accessToken and refreshToken */
            const { data: { authenticate: { accessToken }}} = authData
            console.log({ accessToken })
            token = accessToken
        } catch (err) {
            console.log('Error signing in: ', err)
        }
    }
    async function getProfiles() {
        console.log('getProfiles');
        try {
            const profiles = await $graphClient.query({query:exploreProfiles});

            console.log('profiles',profiles)
            
            if(profiles){
                profilesResult = profiles;
            }
        } catch (err) {
            console.log('Error getting profiles: ', err)
        }
    }
</script>

<h1>Welcome to SvelteKit and Lens Protocol</h1>

<h2>Authentication</h2>
{#if !address}
    <p>Connect your wallet</p>
    <button on:click={connectWallet}>Connect</button>

{:else}
    <p>Wallet:{address}</p>
    {#if !token}
        <p>Sign in with Lens</p>
        <button on:click={loginLens}>Login</button>
    {:else}
        <p>Signed in succesfully!</p>
        <p>Token:<b>{token}</b></p>
    {/if}
{/if}

<h2>Query Data</h2>

<button on:click={getProfiles}>Get profiles</button>

{#if profilesResult}
    <p>Profiles:</p>
    <pre>{JSON.stringify(profilesResult, null, 2)}</pre>
{/if}
