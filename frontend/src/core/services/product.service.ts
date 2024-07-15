import { AxiosInterceptor } from "../interceptor/axios.interceptor";

class ProductService {
	private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
	private axios = this.axiosInterceptor.getAxiosInstance();
    private api = import.meta.env.VITE_API_URL

	async getAllProducts() {
		const response = await this.axios.get(
			`${this.api}/products`
		);
        return response
	}
}

export default ProductService;
