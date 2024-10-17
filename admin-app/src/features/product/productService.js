import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};
// export const updateProduct = async (product) => {
//   const response = await axios.put(`${base_url}product/${id}`, product,config);
//   return response.data;
// };
const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/${product.id}`,
    product,
    { title: product.productData.title },
    { description: product.productData.description },
    { price: product.productData.price },
    { images: product.productData.images },
    { price: product.productData.price },
    { color: product.productData.color },
    { tags: product.productData.tags },
    { category: product.productData.category },
    { quantity: product.productData.quantity },
    // { price: product.productData.price },
    config
  );
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  return response.data;
};
const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);
  return response.data;
};
const productService = {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
};

export default productService;
