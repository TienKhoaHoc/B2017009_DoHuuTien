<template>
<div class="bg-gradient-primary">
    <div class="container">

        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-4 rounded--1rem">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <!-- {{-- <div class="col-lg-5 d-none d-lg-block bg-register-image"></div> --}} -->
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Tạo tài khoản</h1>
                                    </div>
                
                                    <Form class="user" :validation-schema="validateFormSchema">
                                        <!-- <div class="my-2 mb-3 mb-sm-0">
                                            <input required name="customer_name" type="text" class="form-control form-control-user" id="exampleFirstName"
                                                placeholder="Tên tài khoản">
                                        </div> -->


                                        <div class="my-2 mb-3 mb-sm-0">
                                            <Field name="email" type="email" class="form-control form-control-user" v-model="this.userLocal.email" placeholder="Email" />
                                            <ErrorMessage name="email" class="mx-1 error-feedback" />
                                            <!-- <input required name="customer_email" type="email" class="form-control form-control-user" id="exampleInputEmail"
                                                placeholder="Email"> -->
                                        </div>
                                        <div class="my-2 mb-3 mb-sm-0">
                                            <Field name="password" type="password" class="form-control form-control-user" v-model="this.userLocal.password" placeholder="Nhập password" />
                                            <ErrorMessage name="password" class="mx-1 error-feedback" />

                                            <!-- <input required name="customer_password" type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Mật khẩu"> -->
                                        </div>
                                        <div class="my-2 mb-3 mb-sm-0">
                                            <Field name="cpassword" type="password" class="form-control form-control-user" placeholder="Nhập lại password" />
                                            <ErrorMessage name="cpassword" class="mx-1 error-feedback" />

                                            <!-- <input required name="customer_password" type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Mật khẩu"> -->
                                        </div>


                                        <button name="" type="button" class="btn btn-primary btn-user btn-block mt-3" @click="createUser(this.userLocal)">
                                            Đăng kí
                                        </button>

                                    </Form>
                
                                    <hr>
                                    <div class="text-center">
                                        <a class="" href="">Quên mật khẩu</a>
                                    </div>
                                    <div class="text-center">
                                        <router-link :to="{name: 'login'}">
                                            <a class="" href="">Đã có tài khoản? Đăng nhập</a>
                                        </router-link>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6  d-flex">
                                <img src="../assets/sh160i-den.png" alt="">
                            </div>
                        </div>
                    </div>    
                </div>                     
                    

            </div>

        </div>

    </div>
</div>
<!-- 
<hr>
<section class="vh-100">
    <div class="container-fluid">
        <div class="row">
        <div class="col-sm-6 text-black">
            <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <Form style="width: 23rem;" :validation-schema="validateFormSchema">
                    <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Signup</h3>
            
                    <div class="form-outline mb-2">
                        <Field name="email" type="email"  class="form-control form-control-lg" v-model="this.userLocal.email" placeholder="email" />
                        <ErrorMessage name="email" class="error-feedback" />
                        <label class="form-label" for="email">Email</label>
                    </div>
            
                    <div class="form-outline mb-2">
                        <Field name="password" type="password"  class="form-control form-control-lg" v-model="this.userLocal.password" placeholder="*****" />
                        <ErrorMessage name="password" class="error-feedback" />
                        <label class="form-label" for="password">Password</label>
                    </div>
                    <div class="form-outline mb-2">
                        <p>{{this.message}}</p>
                    </div>
                    <div class="pt-1 mb-2">
                        <button class="btn btn-info btn-lg btn-block" type="button" @click="createUser(this.userLocal)">Register</button>
                    </div>
                    <p>Login in here! 
                    
                        <router-link
                            :to="{
                                name: 'login',
                            }"
                            >
                            <a href="#!" class="link-info">Cick Me</a>
                            </router-link>
                    </p>
                </Form>
            </div>
        </div>
        </div>
    </div>
</section> -->
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import UserService from "@/services/user.service";
export default {
    components: {
        UserService,
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const validateFormSchema = yup.object().shape({
            email: yup
                .string()
                .required("Vui lòng nhập email.")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            password: yup
                .string()
                .min(6, "Mật khẩu có ít nhất 6 ký tự.")
                .required("Vui lòng nhập password."),
            cpassword: yup
                .string()
                .required("Vui lòng nhập lại mật khẩu.")
                .oneOf([yup.ref('password'), null], "Mật khẩu không trùng khớp."),
        });
        return {
            userLocal: {
                email: "",
                password: "",
            },
            validateFormSchema,
            result: {},
        };
    },
    methods: {
        async createUser(data) {
            try {
                console.log(data);
                await UserService.create(data);
                this.message = "User account được Tao thành công.";
                console.log(this.message);
                this.$router.push({
                    name: "login",
                });
            } catch (error) {
                console.log(error);
            }
        }
    },
};
</script>

<style>
.error-feedback{
    color: red;
}

.bg-image-vertical {
    position: relative;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: right center;
    background-size: auto 100%;
}

@media (min-width: 1025px) {
    .h-custom-2 {
        height: 100%;
    }
}
</style>