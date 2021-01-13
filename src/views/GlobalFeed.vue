<template>
    <div class="home-page">
        <mcv-banner/>
        <div class="container-page">
            <div class="row">
                <div class="col-md-9">
                    <mcv-feed-togler/>
                    <mcv-feed :api-url="apiUrlFeed"/>
                </div>
                <div class="col-md-3">
                    <mcv-popular-tags/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import McvFeed from '@/components/Feed'
    import McvPopularTags from '@/components/PopularTags'
    import McvBanner from '@/components/Banner'
    import McvFeedTogler from '@/components/FeedTogler'

    export default {
        name: 'McvGlobalFeed',
        components: {
            McvFeed,
            McvPopularTags,
            McvBanner,
            McvFeedTogler
        },
        data() {
            return {
                apiUrlFeed: '/articles'
            }
        }
    }
</script>