import React, { useEffect ,useState} from "react";
import { Table } from "antd";
import { deleteAProduct, getProducts ,resetState} from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => (
      <img
        src={image}
        alt="product"
        style={{ width: "60px", height: "60px" }}
      />
    ),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },

  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState('');
  const dispatch = useDispatch();

  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => { 
    dispatch(resetState());
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);
  console.log(productState);

  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      brand: productState[i].brand,
      category: productState[i].category,
      title: productState[i].title,
      price: `₹ ${productState[i].price}`,
      image: productState[i]?.images[0]?.url,
     
      actions: (
        <>
          <Link to={`/admin/product/${productState[i]?._id}`}>
            <FaRegEdit className="fs-3 text-danger" />
          </Link>
          <button
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
        
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
          {/* <Link className="ms-3 fs-3 text-danger" to="/admin">
            <AiFillDelete />
          </Link> */}
        </>
      ),
    });
  }

  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 300);
  };

  return (
    <div>
      <h3 className="mb-3 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are you sure want to delete this blog?"
        hideModal={hideModal}
        open={open}
        performAction={() => deleteProduct(productId)}
      />
    </div>
  );
};

export default Productlist;
