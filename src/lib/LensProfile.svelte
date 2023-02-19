<script>
    import { anoIconUrl, ipfsUrl } from "./common";
    
    export let profile
    
</script>
<div class="profile">
    <div class="left">
        {#if profile.picture?.original?.url}
            <img src="{profile.picture?.original?.url.replace('ipfs://',ipfsUrl)}" loading="lazy"  alt="profile image {profile.handle}" />
        {:else}
            <img src="{anoIconUrl}" loading="lazy"  alt="profile image {profile.handle}" />
        {/if}
        {#if profile?.stats?.totalFollowers}
        <br/>
            followers<br/>
            {profile?.stats?.totalFollowers}
        {/if}
  
    </div>
    <div>
        <h3>{profile.handle}</h3>
        <p>{profile.bio}</p>
    </div>
</div>

<style>
    .profile{
        border-bottom:1px solid black;
        margin:10px;
        padding:10px;
        display:flex;
    }
    .profile .left{
        width:100px;
        text-align:center;
    }
    .profile img{
        width:80px;
        height:80px;
        border-radius:50%;
        margin: 10px;
    }
</style>