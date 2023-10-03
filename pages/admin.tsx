import { useState, useEffect } from "react";
import Head from "next/head";
import Container from "components/container";
import Layout from "components/layout";
import env from "lib/env";
import PriceColumn from "components/price-column";

type User = {
  user_id: string;
  name: string;
  email: string;
  product: any;
};

type AdminPageProps = {
  users: User[];
  preview: any;
};

export default function AdminPage({ preview, users }: AdminPageProps) {
  console.log("users", users)

  return (
    <Layout preview={preview} fullPage >
      <Head>
        <title>Beyond Health</title>
      </Head>
      <Container>
       {users.length && 
          <div>
            <h2 className="my-7">User List</h2>
            <table className="text-left">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Charge</th>
              </tr>
              {users?.map((user) => (
                <tr>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.product.name}</td>
                  <PriceColumn initialPrice={user.product.price}/>
                </tr>
              ))}
            </table>
          </div>
        }
      </Container>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  try {
    // Fetch user data from your API route
    const response = await fetch(`${env.host}/api/get-stripe-customer`);
    const data = await response.json();

    return {
      props: {
        users: data, // Pass the fetched user data as props
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      props: {
        users: [], // Return an empty array if there's an error
      },
    };
  }
};
