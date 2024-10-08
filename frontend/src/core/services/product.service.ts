import { AxiosInterceptor } from "../interceptor/axios.interceptor";

class ProductService {
	private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
	private axios = this.axiosInterceptor.getAxiosInstance();
	private api = import.meta.env.VITE_API_URL;

	async getAllProducts() {
		const response = await this.axios.get(`${this.api}/products`);
		return response;
	}

	async getMyProducts() {
		const response = await this.axios.get(`${this.api}/user/products`);
		return response;
	}

	async postProduct(payload: any){
		const response = await this.axios.post(`${this.api}/products`, payload);
		return response
	}

	async getProductById(id: string) {
		const product = await this.axios.get(`${this.api}/products/${id}`);
		return product;
	}

	async deleteProductById(id:string){
		const result = await this.axios.delete(`${this.api}/products/${id}`)
		return result
	}

	async updateProduct(id:string, payload:FormData){
		const result = await this.axios.put(`${this.api}/products/${id}`, payload)
		return result
	}
}

export default ProductService;
