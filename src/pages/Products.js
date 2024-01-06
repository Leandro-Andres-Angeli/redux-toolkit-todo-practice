import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsAction } from '../features/productsReducer';
import { createId as id } from '../utils/utils';

const ProductsComponent = () => {
  const { products } = useSelector((state) => state.products);
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
  const { id, name, description, price } = product;
  const [styles] = useState(null);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   return () => {
  //     setStyles({ bg: 'black' });
  //     setTimeout(() => {}, 6000);
  //     console.log('un mount');
  //   };
  // }, []);

  return (
    <li>
      <article styles={{ backgroundColor: styles && styles.bg }}>
        <p>id : {id}</p>
        <p>name : {name}</p>
        <p>description : {description}</p>
        <p>
          price :{' '}
          {new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
          }).format(price)}
        </p>
        <button
          className='bg-dark-red'
          onClick={() => dispatch(productsAction.removeProduct(id))}
        >
          Delete Product
        </button>
      </article>
    </li>
  );
}
function AddPoductForm() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    const entries = new FormData(target);
    console.log(typeof entries);
    // console.log(entries.);
    // entries.entries((el) => console.log(el));
    // const normalized = Array.from(entries).reduce((acc, el) => {
    //   !isNaN(Number(el[1])) ? [el[0], Number(el[1])] : el;

    //   return acc;
    // }, {});
    console.log('normalized');
    // const toObject = Object.from(new Map(normalized));
    // console.log(toObject);
    const data = {
      id: id(),
      name: entries.get('name'),
      description: entries.get('description'),
      price: Number(entries.get('price')),
    };

    // console.log(data);

    dispatch(productsAction.addProduct(data));
    target.reset();
  };
  return (
    <div className='ph4 pv6'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='name' name='name'></input>
        <input type='text' placeholder='description' name='description'></input>
        <input type='number' placeholder='price' name='price'></input>

        <button className='w-3' type='submit'>
          add
        </button>
      </form>
    </div>
  );
}

export default ProductsComponent;
