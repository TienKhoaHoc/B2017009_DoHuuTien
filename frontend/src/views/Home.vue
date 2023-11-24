<template>
    <!-- <h1>Hiiii</h1> -->
    <headercomponent class=""></headercomponent>
   
    <!-- <main style=""> -->
      <!-- <main style="margin-top:100px;"> -->
        <!-- <div > -->
          <router-view v-slot="{ Component }">
            <transition name="fade" >
              <component :is="Component" ></component>
            </transition>
          </router-view>
        <!-- </div> -->
    <!-- </main> -->
    <footercomponent/>
</template>


<script>
  // import headercomponent from "../layout/navbar.vue";
import headercomponent from "@/views/layout/navbar.vue";
import footercomponent from "./layout/footer.vue";
export default {
    components: {
        headercomponent,
        footercomponent,
    },
    
};
</script>
  

<style>
/*
  @import '@/assets/product_list.css';
  @import url(https://fonts.googleapis.com/css?family=Open+Sans);
  @import url(https://www.w3schools.com/w3css/4/w3.css);
  @import url(https://fonts.googleapis.com/css?family=Raleway);
  @import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);

  .route-enter-form {
    opacity: 0;
    transform: translateX(100px);
  }
  
  .route-leave-to {
    opacity: 0;
    transform: translateX(-100px);
  }
  
  .route-enter-active {
    transition: ass 0.3s ease-out;
  }
  
  .route-leave-active {
    transition: all 0.3s ease-in;
  }
  
  .fade-enter-from,
  .fade-leave-to {
      opacity: 0;
  
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease-in;
      transition: opacity 0.3s ease-out;
  }
  
  body,h1,h2,h3,h4,h5,h6 {font-family: "Raleway", sans-serif}
  
  body{
    height: 100%;
    line-height: 1.8;
  }
  
  .bgimg-1 {
    background-position: center;
    background-size: cover;
    background-image: url("/w3images/mac.jpg");
    min-height: 100%;
  }
  
  .w3-bar .w3-button {
    padding: 16px;
  } 
*/
</style>