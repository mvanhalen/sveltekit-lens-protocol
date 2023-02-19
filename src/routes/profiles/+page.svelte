<script>
    import { exploreProfiles } from "$lib/lensApi";
    import LensProfile from "$lib/LensProfile.svelte";
    import { graphClient } from "$lib/store";
    import { onMount } from "svelte";


    let profilesResult = null;
    let lensProfiles = [];    
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
    onMount(async () => {
        await getProfiles();
        if(profilesResult?.data?.exploreProfiles?.items){
            lensProfiles = profilesResult.data.exploreProfiles.items;
        }
    })
</script>

<h2>Top Lens Profiles</h2>

{#if !lensProfiles}
    <p>Loading...</p>
{:else}
    <div class="profiles">
        {#each lensProfiles as profile}
            <LensProfile {profile} />
        {/each}
    </div>
{/if}
