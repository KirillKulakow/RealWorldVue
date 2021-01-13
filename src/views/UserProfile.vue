<template>
    <div class="profile-page" v-if="userProfile">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img class="user-img" :src="userProfile.image" @error="replaceByDefault"/>
                        <h4>{{userProfile.username}}</h4>
                        <p>{{userProfile.bio}}</p>
                        <div>
                            FOLLOW USER BUTTON
                            <router-link v-if="isCurrentUserProfile" class="btn btn-sm btn-outline-secondary action-btn" :to="{name: 'settings'}">
                                Edit profile settings
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="article-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <router-link class="nav-link" :class="{'active': !isFavorites}" :to="{name: 'userProfile', params: {slug: userProfile.username}}">
                                    My post
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" :class="{'active': isFavorites}" :to="{name: 'userProfileFavorites', params: {slug: userProfile.username}}">
                                    Favorites Posts
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <mcv-feed :api-url="apiUrl"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    import {actionTypes} from '@/store/modules/userProfile'
    import {getterTypes as authGetterTypes} from '@/store/modules/auth'
    import McvFeed from '@/components/Feed'

    export default {
        name: 'McvUserProfile',
        computed: {
            ...mapState({
                isLoading: state => state.userProfile.isLoading,
                error: state => state.userProfile.error,
                userProfile: state => state.userProfile.data,
            }),
            ...mapGetters({
                currentUser: authGetterTypes.currentUser
            }),
            isCurrentUserProfile(){
                if(!this.currentUser || !this.userProfile){
                    return false
                } else {
                    return this.currentUser.username === this.userProfile.username
                }
            },
            isFavorites(){
                return this.$route.path.includes('favorites')
            },
            apiUrl(){
                return this.isFavorites ? `/articles?favorited=${this.userProfileSlug}` : `/articles?author=${this.userProfileSlug   }`
            },
            userProfileSlug(){
                return this.$route.params.slug
            }
        },
        watch: {
            userProfileSlug(){
                this.getUserProfile()
            }
        },
        mounted() {
            this.getUserProfile()
        },
        methods: {
            replaceByDefault(e) {
                e.target.src = 'https://static.productionready.io/images/smiley-cyrus.jpg'
            },
            getUserProfile(){
                this.$store.dispatch(actionTypes.getUserProfile, {slug: this.userProfileSlug})
            }
        },
        components: {
            McvFeed
        }
    }
</script>
