import createApiClient from "./api.service";
// import { userAccStore } from "@/Store/userStore";
// const userStore = userAccStore();

const commonConfig = {
    headers: {
        // 'Authorization': `Bearer ${userStore.user.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

class OrderService {
    constructor(baseUrl = "/api/orders"){
        this.api = createApiClient(baseUrl);
    }

    async getAll(){
        return (await this.api.get('/', commonConfig)).data;
    }

    async create(data){
        return (await this.api.post('/', data , commonConfig)).data;
    }

    async get(id){
        return (await this.api.get(`/${id}`, commonConfig)).data;
    }

    async update(id,data){
        return (await this.api.put(`/${id}`,data, commonConfig)).data;
    }

    async delete(id){
        return (await this.api.delete(`/${id}`, commonConfig)).data;
    }

    async approve(id){
        return (await this.api.get(`/approve/${id}`, commonConfig)).data;
    }

    async findByUserId(id){
        return (await this.api.get(`/findByUserId/${id}`, commonConfig)).data;
    }
}

export default new OrderService();