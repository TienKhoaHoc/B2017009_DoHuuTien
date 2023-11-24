<template>
<!-- <div class="container-fluid d-flex justify-content-center p-5 align-content-center bg-info" style="height:300px;">
    <h3>Our Product</h3>
</div> -->
	<!-- breadcrumb-section -->
	<div class="breadcrumb-section breadcrumb-bg">
		<div class="container">
			<div class="row">
				<div class="col-lg-8 offset-lg-2 text-center">
					<div class="breadcrumb-text">
						<!-- <p>Fresh and Organic</p> -->
						<h1>Sản Phẩm</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- end breadcrumb section -->


<div class="container row d-flex justify-content-center" style="margin-left:50px;">
    <div class="col-4 px-4">
        <div class="searchbar my-4">
            <input class="search_input" type="search"
            name="" placeholder="Tìm..."
            v-model="searchText" 
            @input="updateModelValue" 
            @keyup.enter="submitsearch"
            >
            <!-- <a href="#" class="search_icon"><i class="fas fa-search"></i></a> -->
            <button @click="submitsearch" type="button" class="search_icon" style="border: none;"><i class="fas fa-search"></i></button>
        </div>

        
    </div>
    
    <div class="col-8 row bg-light">
            
            <div v-for="(product,index) in this.filteredproducts"
                :key="product._id" class="col-lg-4 col-md-6 text-center">
                <div class="single-product-item">
                    <div class="product-image">
                        
                        <router-link
                        :to="{
                            name: 'user.product.detail',
                            params: { id: product._id },
                        }"
                        >
                            <img width="100" height="100" :src="'http://localhost:3000/images/'+product.prod_img" class="img-fluid rounded thumbnail-image imageSize">
                        </router-link>

                        <!-- <a href="single-product.html">
                            <img src="assets/img/products/product-img-1.jpg" alt="">
                        </a> -->
                    </div>
                    <h3>{{product.prod_name}}</h3>
                    <p class="product-price text-danger" style="font-size: larger;">{{ formatCurrency(product.prod_price) }}</p>

                    <p class="r" style="font-size: larger;">Quantity: {{product.prod_quantity}} </p>
                    <a href="" class="cart-btn"  @click="submitAddToCart(product._id, product.prod_name, 1, product.prod_img, product.prod_price)">
                        <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
                    </a>
                </div>
            </div>
        
    </div>
</div>
</template>
<script>
import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";
import CategoryService from "@/services/category.service";

export default {
    components: {
        ProductService,
        CartService,
        CategoryService,

    },
    data() {
        return {
            category:{},
            categories:[],
            product:{},
            products:[],
            activeIndex: -1,
            searchText:'',
            userId: null,
        };
    },
    watch: {
        'searchText' : function(v) {
            this.searchText = v.toLowerCase().trim();
        },
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
        productStrings() {
            return this.products.map((product) => {
                const { prod_name, prod_desc, prod_price, prod_quantity,prod_category } = product;
                return [prod_name, prod_desc, prod_price, prod_quantity,prod_category].join("").toLowerCase();
            });
        },
        // Trả về các product có chứa thông tin cần tìm kiếm.
        filteredproducts() {
            if (!this.searchText) return this.products;
                return this.products.filter((_product, index) =>
                this.productStrings[index].includes(this.searchText)
            );
        },

        activeproduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredproducts[this.activeIndex];
        },

        filteredproductsCount() {
            return this.filteredproducts.length;
        },
        categoriesStrings() {
            return this.categories.map((category) => {
                const { cate_name, cate_desc } = category;
                return [cate_name, cate_desc].join("").toLowerCase();
            });
        },
        // Trả về các category có chứa thông tin cần tìm kiếm.
        filteredcategories() {
            if (!this.searchText) return this.categories;
                return this.categories.filter((_category, index) =>
                this.categoriesStrings[index].includes(this.searchText)
            );
        },
    },
    methods: {
        formatCurrency(value) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            });
            return formatter.format(value);
        },
        async getAllcategories(){
            try {
                this.categories = await CategoryService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async getAllProducts(){
            try {
                this.products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async submitAddToCart(id, name, num, img, price){
            const data = {
                "account_id": this.userId,
                "product_list":[
                    {
                        "prod_id": id,
                        "prod_name": name,
                        "prod_num": num,
                        "prod_img": img,
                        "prod_price":price
                    }
                ]
            }
            console.log(data)
            try {
                await CartService.create(data);
                this.message = "your cart was updated!!!"
                // router.push({ name: 'user.cart', params: { id: this.AccountStore.user._id  } })
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.getAllcategories();
            this.getAllProducts();
            this.activeIndex = -1;
        },
        

        // async findByPlace(data){
        //     try {
        //         this.products = await ProductService.findByPlace(data);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },

        // async findByBrand(data){
        //     try {
        //         this.products = await ProductService.findByBrand(data);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    },
    mounted() {
        const userData = localStorage.getItem('user'); // Lấy dữ liệu người dùng từ localStorage
        if (userData) {
            const user = JSON.parse(userData); // Chuyển chuỗi JSON thành đối tượng JavaScript
            if (user && user._id) {
                this.userId = user._id; // Gán giá trị email vào biến userEmail trong data
            }
        }
        this.refreshList();
    },
    
};

</script>
