<script>
    import {getPosts } from "$lib/lensApi";
    import LensPost from "$lib/LensPost.svelte";
    import { graphClient } from "$lib/store";
    import { onMount } from "svelte";


    let postsResult = null;
    let lensPosts = [];    
    async function getLensPosts() {
        console.log('getProfiles');
        try {
            const posts = await $graphClient.query({query:getPosts});

            console.log('posts',posts)
            
            if(posts){
                postsResult = posts;
            }
        } catch (err) {
            console.log('Error getting posts: ', err)
        }
    }
    onMount(async () => {
        await getLensPosts();
        if(postsResult?.data?.explorePublications?.items){
            lensPosts = postsResult.data.explorePublications.items;
        }
    })
</script>

<h2>Lens Posts by Top commented</h2>

{#if !lensPosts}
    <p>Loading...</p>
{:else}
    <div class="posts">
        {#each lensPosts as post}
            <LensPost {post} />
        {/each}
    </div>
{/if}
