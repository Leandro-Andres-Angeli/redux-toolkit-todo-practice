import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsAction } from '../features/productsReducer';
import { createId as id } from '../utils/utils';

const Products = () => {
  const dispatch = useDispatch();

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
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    const data = {
      id: id(),
      price: 111,
      ...Object.fromEntries(new FormData(target)),
    };

    console.log(data);
    dispatch(productsAction.addProduct(data));
    target.reset();
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
