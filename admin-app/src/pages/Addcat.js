import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  createCategory,
  getAProductCategory,
  resetState,
  updateAProductCategory,
} from '../features/pcategory/pcategorySlice';
import { uploadImg, delImg } from '../features/upload/uploadSlice';
let userSchema = Yup.object({
  title: Yup.string().required('Category name is Required'),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getPcatId = location.pathname.split('/')[3];

  const newCategory = useSelector((state) => state.pCategory);
  const imgState = useSelector((state) => state.upload.images);

  const {
    isSuccess,
    isLoading,
    isError,
    createdCategory,
    updatedProductCategory,
    categoryName,
    categoryImg,
  } = newCategory;

  const img = [];
  useEffect(() => {
    if (getPcatId !== undefined) {
      dispatch(getAProductCategory(getPcatId));
      img.push(categoryImg);
    } else {
      dispatch(resetState());
    }
  }, [getPcatId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success('Category Added Successfully!');
    }
    if (isSuccess && updatedProductCategory) {
      toast.success('Category Updated Successfully!');
      navigate('/admin/list-category');
    }

    if (isError) {
      toast.error('something Went Wrong!');
    }
  }, [isSuccess, isLoading, isError]);

  imgState.forEach((image) => {
    img.push({
      public_id : image.public_id,
      url : image.url,
    })
  });

  useEffect(() => {
    formik.values.images = img;
  }, [imgState])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || '',
      images : " ",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getPcatId !== undefined) {
        const data = { id: getPcatId, pCatData: values };
        dispatch(updateAProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState);
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-3 title">
        {getPcatId !== undefined ? 'Edit' : 'Add'} Category
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter product category"
            name="title"
            onChng={formik.handleChange('title')}
            onBlr={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error my-3">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="bg-white border-1 p-5 text-center my-3">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((image, index) => {
              return (
                <div key={index} className="position-relative">
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(image.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: '5px', right: '5px' }}
                  ></button>
                  <img src={image.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button type="submit" className="button my-3 px-3">
            {getPcatId !== undefined ? 'Edit' : 'Add'} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
