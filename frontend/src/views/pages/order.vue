<template>
<!-- breadcrumb-section -->
<div class="breadcrumb-section breadcrumb-bg">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2 text-center">
        <div class="breadcrumb-text">
          <p>Fresh and Organic</p>
          <h1>Order list</h1>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- end breadcrumb section -->


    <div class="container">
        <div class="">
            <section v-for="(order,index) in this.orders"
            :key="order._id" class="">
                <router-link
                :to="{
                    name: 'user.order.detail',
                    params: { id: order._id },
                }"
                >
                <div class="container py-5 h-100">
                  <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12">
                      <div class="w-100 card card-stepper text-black" style="border-radius: 16px;">
          
                        <div class="card-body p-5">
                          <div class="d-flex justify-content-between align-items-center mb-5">
                            <div class="">
                              <h4 class="mb-2">Order code</h4> 
                              <h5 class="text-primary font-weight-bold">#{{order._id}}</h5>
                              <!-- <button type="button" class="btn btn-info" >detail</button> -->
                            </div>
                            <div class="text-end">
                              <p class="mb-0"> <strong>Date time:</strong> {{order.date_time}}</p>
                              <p class="mb-0"><strong>Customer ID:</strong> {{order.user_id}}</p>
                              <p class="mb-0"><strong>Total:</strong> {{order.total_cost}}</p>
                            </div>
                            <img v-if="order.status == true" src="../../assets/assets/img/check.png" alt="" style="width: 68px;">
                            <img v-else src="../../assets/assets/img/ưaiting.png" alt="" style="width: 68px;">
                            
                          </div>
              
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                </router-link>
            </section>
        </div>
    </div>
</template>
<script>
import { useAccountStore } from "@/stores/AccountStore";
import OrderService from "@/services/order.service";
export default {
    components: {
        OrderService,
    },
    data() {
        const AccountStore = useAccountStore();
        return {
            AccountStore,
            data:{},
            orders:[],
            userId:null,

        };
    },
    methods: {
        async getorders(){
            try {
                this.orders = await OrderService.findByUserId(this.userId);
                // console.log('---------------------------------')
                // console.log(this.userId)
                // console.log(this.AccountStore._id)
                // console.log(this.orders)
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.getorders();
            this.activeIndex = -1;
        },
    
        
    },
    mounted() {
        const userData = localStorage.getItem('user'); // Lấy dữ liệu người dùng từ localStorage
        if (userData) {
            const user = JSON.parse(userData); // Chuyển chuỗi JSON thành đối tượng JavaScript
            if (user && user._id) {
                this.userId = user._id;
                this.refreshList(); // Gán giá trị email vào biến userEmail trong data
            }
        }
    },
}
</script>
<style>
.card-stepper {
    z-index: 0
    }
    
    #progressbar-2 {
    color: #455A64;
    }
    
    #progressbar-2 li {
    list-style-type: none;
    font-size: 13px;
    width: 33.33%;
    float: left;
    position: relative;
    }
    
    #progressbar-2 #step1:before {
    content: '\f058';
    font-family: "Font Awesome 5 Free";
    color: #fff;
    width: 37px;
    margin-left: 0px;
    padding-left: 0px;
    }
    
    #progressbar-2 #step2:before {
    content: '\f058';
    font-family: "Font Awesome 5 Free";
    color: #fff;
    width: 37px;
    }
    
    #progressbar-2 #step3:before {
    content: '\f058';
    font-family: "Font Awesome 5 Free";
    color: #fff;
    width: 37px;
    margin-right: 0;
    text-align: center;
    }
    
    #progressbar-2 #step4:before {
    content: '\f111';
    font-family: "Font Awesome 5 Free";
    color: #fff;
    width: 37px;
    margin-right: 0;
    text-align: center;
    }
    
    #progressbar-2 li:before {
    line-height: 37px;
    display: block;
    font-size: 12px;
    background: #c5cae9;
    border-radius: 50%;
    }
    
    #progressbar-2 li:after {
    content: '';
    width: 100%;
    height: 10px;
    background: #c5cae9;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 15px;
    z-index: -1;
    }
    
    #progressbar-2 li:nth-child(1):after {
    left: 1%;
    width: 100%
    }
    
    #progressbar-2 li:nth-child(2):after {
    left: 1%;
    width: 100%;
    }
    
    #progressbar-2 li:nth-child(3):after {
    left: 1%;
    width: 100%;
    background: #c5cae9 !important;
    }
    
    #progressbar-2 li:nth-child(4) {
    left: 0;
    width: 37px;
    }
    
    #progressbar-2 li:nth-child(4):after {
    left: 0;
    width: 0;
    }
    
    #progressbar-2 li.active:before,
    #progressbar-2 li.active:after {
    background: #6520ff;
    }
</style>