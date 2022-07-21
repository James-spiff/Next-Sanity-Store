import React from 'react';
import { Cart, Footer, FooterBanner, HeroBanner, Layout, Navbar, Product } from '../components/index';
import { client } from '../lib/client';

const Home = ({ products, bannerData }) => {
  return (
    <>
      {/* {console.log(bannerData)} */}
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {
          products?.map((product) => <Product key={product._id} product={product} />)
        }
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

//in nextjs it's preferrable to use getServerSideProps whenever you want to fetch data that changes often from an api 
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'; //this query grabs all the products from the database //* means all _type specifies the type of field 
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]'; 
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  } //whatever props are returned by getServerSideProps are accessable in all functions on this page

}

export default Home