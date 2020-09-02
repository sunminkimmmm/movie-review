<template>
    <div>
        <p>MOVIE REVIEW</p>
        <b-navbar toggleable="md" type="dark" variant="secondary">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-navbar-brand to="/">Home</b-navbar-brand>
          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <template>
                    <b-nav-item to="/signIn">Login</b-nav-item>
                    <b-nav-item to="/signUp">Join</b-nav-item>
                     <b-nav-item to="/logOut">Logout</b-nav-item>
                </template>
              
               
            </b-navbar-nav>

           </b-collapse>
        </b-navbar>


    </div>
</template>

<script>
    export default {
        name:"Nav"
    }
</script>

<style scoped>
 p{font-size: 30px;margin-top: 10px;font-weight:400}
</style>