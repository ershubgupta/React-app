// import { Col, Container, Grid, Row, Text } from '@nextui-org/react';
// import { Divider } from "@nextui-org/divider";
import React from 'react'
import { IDishDetails } from '../redux/Types';
import { useParams } from 'react-router-dom';
import mock from "../static/mock.json"
import SingleDish from '../components/SingleDish';

function Detail() {
  const {productId} = useParams();
  const productDetails: IDishDetails = mock.find(item => item.id === Number(productId))!;

  return (
    // <div className="flex my-5">
    //   <img src={productDetails.image} alt="" className='w-full'/>
    //   <div className='ml-4'>
    //     <p>{productDetails.isNonVeg}</p>
    //     <p>{productDetails.category}</p>
    //     <p>{productDetails.rating}</p>
    //     <p>{productDetails.name}</p>
    //     <p>{productDetails.description}</p>
    //     <p>{productDetails.price}</p>
    //     <p>{productDetails.discount}</p>
    //   </div>
    // </div>
    <SingleDish {...productDetails} />
  );
}

export default Detail