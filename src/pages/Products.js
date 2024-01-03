import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsAction } from '../features/productsReducer';

const Products = () => {
  const dispatch = useDispatch();
  dispatch(productsAction.loadProducts());
  const { products } = useSelector((state) => state);
  // const handleDispatchProds = useCallback(() => {
  //   dispatch(productsAction.loadProducts());
  //   console.log('callback');
  // }, [products.length]);

  // useEffect(() => {
  //   handleDispatchProds();
  //   console.log('loaded');
  // dispatch(productsAction.loadProducts());
  // }, [handleDispatchProds]);
  useEffect(() => {
    dispatch(productsAction.loadProducts());
    console.log(' first load');
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <AddPoductForm></AddPoductForm>
      {products.length > 0 && (
        <ul className='ph4'>
          {products.map((prod) => (
            <Product product={prod} key={prod.id}></Product>
          ))}
        </ul>
      )}
    </div>
  );
};
function Product({ product }) {
  const { id, name, description } = product;
  return (
    <li>
      <article>
        <p>id : {id}</p>
        <p>name : {name}</p>
        <p>description : {description}</p>
      </article>
    </li>
  );
}
function AddPoductForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    const data = Object.fromEntries(new FormData(target));

    console.log(data);
  };
  return (
    <div className='ph4 pv6'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='name' name='name'></input>
        <input type='text' placeholder='description' name='description'></input>
        <button className='w-3' type='submit'>
          add
        </button>
      </form>
    </div>
  );
}

export default Products;
