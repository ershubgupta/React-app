import React, { useState } from "react";
// import { Card, Grid, Row, Text, Col, Button } from "@nextui-org/react";
import SingleDish from "../components/SingleDish";
import mock from '../static/mock.json'
import { IDishDetails } from "../redux/Types";

function Home() {
  const productListWithFilteredData = mock.map(content => {
    const filteredData: IDishDetails = {
      id: content.id,
      name: content.name,
      image: content.image,
      price: Number(content.price),
      category : content.category,
      isNonVeg : content.isNonVeg,
      rating : content.rating,
      quantity: content.quantity
    }
    return filteredData;
  });
  console.log("home", productListWithFilteredData);

  return (
    <>
      <div className="grid">
        <p>Main Course</p>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {productListWithFilteredData.map((item) => (
          <SingleDish key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}

export default Home;

// import React, { useState } from 'react'

// function Home(prop:any) {
//   const [a, setA] = useState(prop.num);
//   console.log("load")
//   return (
//     <div onClick={() => setA(a+1)}>{a}</div>
//   )
// }

// export default Home