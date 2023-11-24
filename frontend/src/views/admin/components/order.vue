<template>
    <div class="page-heading" style="">
        
        <div class="row" style="display: grid;">
            <section class="section">

                <div class="card">
                    <div class="card-header text-center">
                        <h4 class="mt-1">Đơn Hàng</h4>
                    </div>
                    <div class="card-body">
                        <table class="table table-striped" id="table1">
                            <thead>
                                <tr>
                                    <th>Mã ID tài khoản</th>
                                    <th>Tổng</th>
                                    <th>Thời gian</th>
                                    <th>Trạng thái</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                               
                                <tr v-if="this.orders.length > 0"
                                    v-for="(order,index) in this.orders"
                                    :key="order._id" 
                                >
                                        <td>{{order._id}}</td>
                                        <td>{{order.total_cost}}</td>
                                        <td>{{order.date_time}}</td>
                                        <td>
                                            <button type="button" class="btn btn-success" v-if="order.status == true" >Chấp nhận</button>
                                            <button type="button" class="btn btn-secondary" data-mdb-ripple-color="dark" @click="approve(order._id)"  v-else >Chờ</button>
                                        </td>
                                        <td>
                                            <!-- <button type="button" class="btn btn-link" data-mdb-ripple-color="dark" @click="Deleteorder(order._id)"><i class="fas fa-trash-alt"></i></button> -->
                                            <div class="btn-group" role="group">
                                                <!-- <button type="button" class="btn btn-link" data-mdb-ripple-color="dark" ><i class="fas fa-edit"></i></button> -->
                                                <button type="button"  class="btn btn-link" data-mdb-ripple-color="dark" @click="Deleteorder(order._id)" ><i class="fas fa-trash-alt text-danger"></i></button>
                                            </div>
                                        </td>
                                </tr>
                                <tr v-else><td colspan="3" class="text-center">Không có đơn hàng</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>




            <section class="section col-6 mt-3" v-if="this.user.name !=null">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="mt-1"> user detail</h4>
                    </div>
                    <div class="card-body row ">
                        <table class="table">
                            <thead style="width:100%">
                                <tr>
                                <th scope="col" style="width:10%"><b>name</b></th>
                                <td scope="col">{{this.user.name}}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td><b>email</b></td>
                                <td>{{this.user.email}}</td>
                                </tr>
                                <tr>
                                <td><b>address</b></td>
                                <td>{{this.user.address}}</td>
                                </tr>
                                <tr>
                                <td><b>phone</b></td>
                                <td>{{this.user.phone}}</td>
                                </tr>
                            </tbody>
                            </table>
                    </div>
                </div>
            </section>
            <br>
            <section class="section col-6 mt-3" v-if="this.listProduct.length > 0">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="mt-1">product detail in order</h4>
                    </div>
                    <div class="card-body">
                        <table class="table table-striped" id="table1">
                            <thead>
                                <tr>
                                    <th>product name</th>
                                    <th>price</th>
                                    <th>quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr 
                                v-for="(product,index) in listProduct"
                                >
                                        <td>{{product.name}}</td>
                                        <td>{{product.price}}</td>
                                        <td>{{product.number}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </div>
    </div>

</template>

<script>
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
// import addorderForm from "./addorder.vue";
import OrderService from "@/services/order.service";
import orderDetailsForm from "./orderDetail.vue";
// import userService from "@/services/user.service";
export default {
    components: {
        // userService,
        orderDetailsForm,
        OrderService,
    },
    data() {
        return {
            data:{},
            orders:[],
            listProduct:[],
            user:{},
            activeIndex: -1,
        };
    },
    methods: {
        async getAllorders(){
            try {
                this.orders = await OrderService.getAll();
                console.log(this.orders)
            } catch (error) {
                console.log(error);
            }
        },

        async createorder(data){
            try{
                await OrderService.create(data);
                this.message = "order được tao thành công.";
                this.getAllorders();
                console.log(this.message);
            } catch(err) {
                console.log(err);
            }
        },
        async Deleteorder(id) {
            try{
                await OrderService.delete(id);
                this.getAllorders();
            } catch(err) {
                console.log(err);
            }
        },

        // async selected_product(id,data){
        //     this.listProduct = data;
        //     this.user = await userService.get(id);
        // },

        refreshList() {
            this.getAllorders();
            this.activeIndex = -1;
        },
        
        async approve(id){
            try {
                await OrderService.approve(id);
                this.getAllorders();
            } catch (error) {
                console.log(error);
            }
        },
        
    },
    mounted() {
        this.refreshList();
    },
    };
</script>

<style scoped src="@/assets/navbar.css">
@import './assets/navbar.css';
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css';
</style>