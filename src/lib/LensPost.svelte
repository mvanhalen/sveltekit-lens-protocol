<script>
    import { anoIconUrl, ipfsUrl } from "./common";
    export let post;
</script>
<div class="post">
    <div class="left profile">
        {#if post?.profile?.coverPicture?.original?.url}
            <img src="{post?.profile.coverPicture?.original?.url.replace('ipfs://',ipfsUrl)}" loading="lazy"  alt="profile image {post?.profile?.handle}" />
        {:else}
            <img src="{anoIconUrl}" loading="lazy"  alt="profile image {post?.profile?.handle}" />
        {/if}
        {#if post?.profile?.handle}
        <br/>
            {post.profile.handle}
        {/if}
    </div>
    <div class="right">
        {#if post?.metadata?.content}
            <p>{post.metadata.content}</p>
        {/if}
        {#if post?.metadata?.media?.length > 0 && post.metadata.media[0]?.original?.url}
            <img src="{post.metadata.media[0].original.url.replace('ipfs://',ipfsUrl)}" loading="lazy"  alt="post image" />
        {/if}
    </div>
</div>

<style>
    .post{
        border-bottom:1px solid black;
        margin:10px;
        padding:10px;
        display:flex;
    }
    .post .left{
        width:150px;
        text-align:center;
    }
    .profile img{
        width:60px;
        height:60px;
        border-radius:50%;
        margin: 10px;
    }
    .post .right p{
        padding:10px;
        max-width:500px;
        font-size: 0.9em;
    }
    .post .right img{
        margin: 10px;
        max-width:300px;
        border-radius: 10px;
    }
</style>