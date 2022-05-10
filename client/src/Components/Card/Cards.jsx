import React from 'react';
import './card.css';
import { postWish } from '../../redux/reducer/getWishilist';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import {
  addShoppingList,
  postShoppingCart,
} from '../../redux/reducer/shoopingCart';

const Card = ({
  description,
  name,
  price,
  image,
  id,
  color,
  brand,
  stock,
  warranty,
  category,
}) => {
  const dispatch = useDispatch();
  const addShopping = () => {
    dispatch(addShoppingList(id));
    toast.promise(dispatch(postShoppingCart(id)), {
      loading: 'Guardando...',
      success: <b>Agregado al carrito 🛒</b>,
      error: <b>No se puedo agregar al carrito 😿</b>,
    });
  };

  const addAWish = productId => {
    dispatch(postWish(productId));
  };

  return (
    <div className='d-flex flex-wrap'>
      <Toaster position='top-center' reverseOrder={false} />
      <div
        className='card'
        type='button'
        data-toggle='modal'
        data-target={`#modal${id}`}
      >
        <img className='card-img-top' src={image[0]} alt='foto' />

        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <span className={`badge ${category}`}>{category}</span>
          <p className='card__precio'>Precio: ${price}</p>
        </div>
      </div>
      {/* inicio modal */}
      <div
        className='modal fade'
        id={`modal${id}`}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden={image.length ? true : false}
      >
        <div
          className='modal-dialog modal-lg modal-dialog-centered'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title ' id='exampleModalLabel'>
                Detalles del artículo
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>

            <div className='modal-body'>
              <div className='d-flex'>
                <div className='col-6'>
                  <div
                    id={'carousel' + id}
                    className='carousel carousel-dark slide'
                    data-bs-ride='carousel'
                  >
                    <div className='carousel-indicators'>
                      {image.map((url, index) => (
                        <button
                          key={index}
                          type='button'
                          data-bs-target={'#carousel' + id}
                          data-bs-slide-to={index}
                          className={index === 0 ? 'active' : ''}
                          aria-current={index === 0 && 'true'}
                          aria-label={'Slide ' + index + 1}
                        ></button>
                      ))}
                    </div>
                    <div className='carousel-inner'>
                      {image.map((url, index) => (
                        <div
                          key={index}
                          className={
                            'carousel-item ' + (index === 0 && 'active')
                          }
                          data-bs-interval='3000'
                        >
                          <img src={url} className='d-block w-100' alt='...' />
                        </div>
                      ))}
                    </div>
                    <button
                      className='carousel-control-prev'
                      type='button'
                      data-bs-target={'#carousel' + id}
                      data-bs-slide='prev'
                    >
                      <span
                        className='carousel-control-prev-icon'
                        aria-hidden='true'
                      ></span>
                      <span className='visually-hidden'>Previous</span>
                    </button>
                    <button
                      className='carousel-control-next'
                      type='button'
                      data-bs-target={'#carousel' + id}
                      data-bs-slide='next'
                    >
                      <span
                        className='carousel-control-next-icon'
                        aria-hidden='true'
                      ></span>
                      <span className='visually-hidden'>Next</span>
                    </button>
                  </div>

                  {/* <img className='img-fluid' src={image[0]} alt='foto' /> */}
                </div>
                <div className='col-6 text-left'>
                  <p>Nombre: {name}</p>
                  <p className='modal__description'>
                    Descripcion: {description}
                  </p>
                  <p>Brand: {brand}</p>
                  <p>Price: ${price}</p>
                  <p>Color: {color}</p>
                  <p>Disponibles: {stock}</p>
                  <p>
                    Garantia: {warranty} {warranty > 1 ? 'años' : 'año'}
                  </p>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-success'
                onClick={addShopping}
              >
                Agregar al carrito
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => addAWish(id)}
              >
                Agregar a la lista de deseos
              </button>
            </div>
            {/* fin modal */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
