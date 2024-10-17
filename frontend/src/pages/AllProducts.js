   // frontend/src/pages/AllProducts.js
   import React, { useEffect } from 'react';
   import { useDispatch, useSelector } from 'react-redux';
   import { getAllProducts, addToWishlist } from '../features/products/productSlice';
   import ReactStars from 'react-rating-stars-component';
   import { Link } from 'react-router-dom';
   import Container from '../components/Container';
   import wish from '../assets/images/wishlist.svg'; // Ensure the path is correct

   const AllProducts = () => {
     const dispatch = useDispatch();
     const { product, status, error } = useSelector((state) => state.product);

     useEffect(() => {
       dispatch(getAllProducts());
     }, [dispatch]);

     const handleAddToWishlist = (id) => {
       dispatch(addToWishlist(id));
     };

     return (
       <Container class1="all-products-wrapper py-5 home-wrapper-2">
         <div className="row">
           <div className="col-12">
             <h3 className="section-heading">All Products</h3>
           </div>

           {status === 'loading' && (
             <div className="col-12">
               <p>Loading...</p>
             </div>
           )}

           {status === 'failed' && (
             <div className="col-12">
               <p>Error: {error}</p>
             </div>
           )}

           {status === 'succeeded' && product.length === 0 && (
             <div className="col-12">
               <p>No products available.</p>
             </div>
           )}

           {status === 'succeeded' && product.map((item, index) => (
             <div key={index} className="col-3">
               <div className="product-card position-relative mb-3">
                 <div className="wishlist-icon position-absolute">
                   <button
                     className="border-0 bg-transparent"
                     onClick={() => handleAddToWishlist(item._id)}
                   >
                     <img src={wish} alt="wishlist" />
                   </button>
                 </div>

                 <div className="product-image">
                   {item.images && item.images.length > 0 ? (
                     <img
                       src={item.images[0].url}
                       alt={item.title}
                       className="img-fluid"
                       width={200}
                       height={200}
                     />
                   ) : (
                     <img
                       src="/images/default-product.png" // Path to a default image
                       alt={item.title}
                       className="img-fluid"
                       width={200}
                       height={200}
                     />
                   )}
                 </div>

                 <div className="product-details">
                   <h6 className="brand">{item.brand}</h6>
                   <h5 className="product-title">
                     <Link to={`/product/${item._id}`}>{item.title}</Link>
                   </h5>
                   <ReactStars
                     value={Number(item.totalrating)}
                     edit={false}
                     count={5}
                     size={24}
                     activeColor="#ffd700"
                   />
                   <p className="price">₹{item.price}</p>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </Container>
     );
   };

   export default AllProducts;