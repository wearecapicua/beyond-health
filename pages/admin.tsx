import { useState, useEffect } from "react";
import Head from "next/head";
import Container from "components/container";
import Layout from "components/layout";
import env from "lib/env";
import PriceColumn from "components/price-column";
import { useSession } from "next-auth/react"
import PaymentButton from "components/payment-button";
import { format } from 'date-fns';
import Pdf from "components/pdf";
import { User } from "lib/types"

type AdminPageProps = {
  users: User[];
  preview: any;
};

type DateStamp = string;

export default function AdminPage({ preview, users }: AdminPageProps) {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [productPrices, setProductPrices] = useState<{ [key: string]: number }>(
    users.reduce((acc, user) => {
      acc[user.user_id] = user.product.price;
      return acc;
    }, {} as { [key: string]: number })
  );

  const handlePriceUpdate = (userId: string, newPrice: number) => {
    setProductPrices((prevPrices) => ({
      ...prevPrices,
      [userId]: newPrice,
    }));
  };

  useEffect(() => {
    /* @ts-ignore */
    if (session?.user?.role === 'ADMIN') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session]);

  function formatDates(dateStamps: DateStamp[]): string[] {
    return dateStamps?.map((dateStamp) => {
        return format(new Date(dateStamp), 'MM-dd-yyyy HH:mm');
      })
      .reverse();
  }

  return (
    <Layout preview={preview} fullPage >
      <Head>
        <title>Beyond Health</title>
      </Head>
      <Container>
        {users.length !== 0 && isAdmin ?
          <div>
            <h3 className="mt-12 mb-7">Pending Payments</h3>
            <table className="text-left">
              <tbody>
                <tr>
                  <th className="p-4">Download</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Submit</th>
                  <th className="p-4">Payments History</th>
                </tr>
                
                {users?.map((user, index) => {
                  const dates = formatDates(user?.payments_history)
                  return (
                    <tr key={`user-${index}`}>
                      <td className="p-4">
                        <Pdf user={user}/>
                      </td>
                      <td className="p-4">{`${user.first_name} ${user.last_name}`}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4 max-w-sm">{user.product.name}</td>
                      <PriceColumn
                        product={user.product}
                        userId={user.user_id}
                        onPriceUpdate={handlePriceUpdate}
                      />
                      <td className="p-4">
                        <PaymentButton
                          setupId={user.stripe_setup_id}
                          price={productPrices[user.user_id]}
                          userId={user.user_id}
                          product={user.product}
                        />
                      </td>
                      <td className="p-4">
                        {dates && dates.map((payment, i) => {
                          return (
                            <p className="text-xs" key={`payment-${i}`}>{payment}</p>
                          )
                        })}
                      </td>
                    </tr>
                  )}
                )}
              </tbody>
            </table>
          </div>
          : users.length === 0 && isAdmin ?
            <p>There are no current pending payments to show</p>
          : !isAdmin ? 
            <p>Not authorized</p>
          : null
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
    }
  }
}
