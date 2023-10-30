import Link from "next/link";
// import * as prismic from "@prismicio/client";
// import { PrismicNextLink } from "@prismicio/next";
// import { PrismicText, SliceZone } from "@prismicio/react";
// import { components } from "slices";

import { createClient } from "lib/prismic";
// import Layout from "components/layout";


// const dateFormatter = new Intl.DateTimeFormat("en-US", {
//   month: "short",
//   day: "numeric",
//   year: "numeric",
// });

// // function LatestArticle({ post }) {
// //   const date = prismic.asDate(
// //     post.data.publishDate || post.first_publication_date,
// //   );

// //   return (
// //     <li>
// //       <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
// //         <PrismicNextLink document={post}>
// //           <PrismicText field={post.data.title} />
// //         </PrismicNextLink>
// //       </h1>
// //       <p className="font-serif italic tracking-tighter text-slate-500">
// //         {/* {dateFormatter.format(date)} */}
// //       </p>
// //     </li>
// //   );
// // }

// export async function generateMetadata({ params }) {
//   const client = createClient();
//   const settings = await client.getSingle("settings");
//   const article = await client
//     .getByUID("post", params.uid)
//     .catch(() => notFound());

//   return {
//     title: `${prismic.asText(article.data.title)} | ${prismic.asText(
//       settings.data.name,
//     )}`,
//     description: article.data.meta_description,
//     openGraph: {
//       title: article.data.meta_title,
//       images: [
//         {
//           url: article.data.meta_image.url,
//         },
//       ],
//     },
//   };
// }

// export default async function Page({ params }) {
//   const client = createClient();

//   const article = await client
//     .getByUID("post", params.uid)
//     .catch(() => notFound());
//   // const latestArticles = await client.getAllByType("post", {
//   //   limit: 3,
//   //   orderings: [
//   //     { field: "my.article.publishDate", direction: "desc" },
//   //     { field: "document.first_publication_date", direction: "desc" },
//   //   ],
//   // });

//   const date = prismic.asDate(
//     article.data.publishDate || article.first_publication_date,
//   );

//   return (
//     <Layout>
 
//       <article>
      
//         {/* <SliceZone slices={article.data.slices} components={components} /> */}
//       </article>
//       {/* {latestArticles.length > 0 && (
//         <div>kjajasj</div>
//       )} */}
//     </Layout>
//   );
// }

// export async function generateStaticParams() {
//   const client = createClient();

//   const posts = await client.getAllByType("post");

//   return posts.map((post) => {
//     return { uid: post.uid };
//   });
// }



function BlogHome({ posts }) {
  console.log("p", posts)
  return (
    <div>
      {posts.map((post) => (
        <div key={post.uid}>
          <h2>{post.data.title}</h2>
          <p>{post.data.description}</p>
          <Link href={`/blog/${post.uid}`}>
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {

  const client = createClient();

  const posts = await client.getAllByType("post");
  return {
    props: {
      posts,
    },
  };
}

export default BlogHome;
