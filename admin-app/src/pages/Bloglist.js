import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABlog, getBlogs } from '../features/blogs/blogSlice';
import CustomModal from '../components/CustomModal';
import { resetState } from '../features/brand/brandSlice';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => (
      <img
        src={image}
        alt="product"
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: 'Status',
    dataIndex: 'status',

  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
 
];

const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);

  const blogState = useSelector((state) => state.blog.blogs);
  console.log(blogState);

  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      name: blogState[i].title,
      category: blogState[i].category,
      image:blogState[i]?.images[0]?.url,
      status:blogState[i]?.publish,
      actions: (
        <>
          <Link to={`/admin/blog/${blogState[i]._id}`}>
            <FaRegEdit className="fs-3 text-danger" />
          </Link>
          <button
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
            onClick={() => showModal(blogState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blog List</h3>
      <div class="container mb-4 bg-white p-4 fs-5">
  {/* <div class="row row-cols-3">
    <div class="col"> All Blogs :{
        blogState.length 
      }</div>
    <div class="col"> Published Blog : {
        blogState.filter((blog) => blog.status === "published").length

      }</div>
    <div class="col"> Draft Blog : {
        blogState.filter((blog) => blog.status === "draft").length

      }</div>
  </div> */}
</div>
    

     
      
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are you sure want to delete this blog?"
        hideModal={hideModal}
        open={open}
        performAction={() => deleteBlog(blogId)}
      />
    </div>
  );
};

export default Bloglist;
