import axios from 'axios'
import { API_URL} from '../Constants'
import { Product } from '../Types/Product';

class ProductAPI {

    retrieveAllProducts(name:string) {
        return axios.get(`${API_URL}/users/${name}/product`);
    }

    retrieveProduct(name:string, id:number) {
        return axios.get(`${API_URL}/users/${name}/product/${id}`);
    }

    deleteProduct(name:string, id:number) {
        return axios.delete(`${API_URL}/users/${name}/product/${id}`);
    }

    updateProduct(name:string, id:number, product:Product) {
        return axios.put(`${API_URL}/users/${name}/product/${id}`, product);
    }

    createProduct(name:string, product:Product) {
        return axios.post(`${API_URL}/users/${name}/product/`, product);
    }

}
export default new ProductAPI()