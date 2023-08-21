import React from 'react'
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Badge,
} from "@nextui-org/react";
import {Bag2 } from "react-iconly";
import { connect } from 'react-redux';
import { IStateType, IUserCart } from "../redux/Types";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { SiFoodpanda } from "react-icons/si";



function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // console.log(props)
  const getProduct = useSelector((state: RootState) => state.cartReducer.cartItem);

  const calProductCount = getProduct.reduce((acc,cur):number => {
    return acc + cur.quantity
  }, 0)

  // console.log(calProductCount);

  return (
    <>
      <Navbar className="bg-slate-800 text-white" maxWidth="xl">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <SiFoodpanda className="text-4xl mr-2 text-pink-500" /> Food Mania
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link to="/resturant">Home</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/resturant/cart">Cart</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link to="/resturant/cart">
              <Badge
                color="danger"
                content={calProductCount}
                // isInvisible={isInvisible}
                shape="circle"
              >
                <AiOutlineShoppingCart className="text-3xl" />
              </Badge>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}

const mapStateToProps = (state:IStateType) => {
  return {cartItem: state.cartItem}
}
export default connect(mapStateToProps)(Header)