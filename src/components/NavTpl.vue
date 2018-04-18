<template>
    <nav class="navigation nav-justified center">
        <a class="navbar-brand" :href="`#/`"><i class="fa fa-home"></i> Home </a>
        <a class="navbar-brand" :href="`#/chat`"><i class="fa fa-comments"></i> Chat Room</a>
        <!--<a class="navbar-brand float-right" ng-show="hasLoggedIn" :href="`#/`" @click="logout()"><i-->
                <!--class="fa fa-sign-out"></i> Log out </a>-->
    </nav>
</template>

<script>
    require('bootstrap')
    export default {
        name: 'navTpl',
        data () {
            return {

            }
        }

    }
</script>