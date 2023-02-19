<script>
    //layout is called on all first client requests.
    import Header from "$lib/Header.svelte";
    import { setApolloClient } from "$lib/lensApi";
    import { graphClient } from "$lib/store";


    const client = setApolloClient();
    //set the client in the store so it can be used in other components
    graphClient.set(client);

</script>
<Header/>
<main>
    <slot/>
</main>
<style>
    main{
        margin: 0 auto;
        max-width: 800px;
        padding:10px;
    }
</style>