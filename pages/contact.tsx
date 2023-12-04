import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import { createClient } from "../lib/prismic";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from 'next/image';
import PageBody from "components/page-body";

type IndexProps = InferGetStaticPropsType<typeof getStaticProps>

export default function ContactPage({ preview, page}: IndexProps) {

  return (
    <>
      <Layout preview={preview} >
        <Head>
          <title>Beyond Health</title>
        </Head>
        <div className="bg-gray-000 min-h-screen sm:py-10">
          <Container>
            <div className="max-w-[1120px] mx-auto">
              <div className="flex flex-shrink-0 items-center max-w-[100%]">
                  <Image
                    src="/images/portrait-handsome-thinking-young-man-isolated-gray-wall 2.png"
                    alt="Contact Page Header"
                    width={1120}
                    height={621}
                    //style={{ width: '100%' }} // optional
                  />
              </div>
              <p>Contact Us</p>
              <p>Do you have questions about anything? Please let us know and we'll get back to you as soon as possible. For anything urgent, please call us.</p>
            </div>
            <div>
              <div>
                <Image
                  src="/images/LocationGreen.png"
                  alt="Icon Location Green"
                  width={128}
                  height={128}
                  //style={{ width: '100%' }} // optional
                />
                <p>Beyond Health Abbotsford</p>
                <div>
                  <Image
                    src="/images/location.svg"
                    alt="Location Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>#150 - 1575 McCallum Rd Abbotsford, BC V2S 0K2</p>
                </div>
                <div>
                  <Image
                    src="/images/phoneIcon.svg"
                    alt="Phone Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>1-604-529-7600</p>
                </div>
                <div>
                  <Image
                    src="/images/fax.svg"
                    alt="Fax Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>1-604-529-7603</p>
                </div>
                <div>
                  <Image
                    src="/images/mail-icon.svg"
                    alt="Mail Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>abby@beyondpharmacy.com</p>
                </div>
              </div>
              <div>
                <Image
                  src="/images/LocationBlue.png"
                  alt="Icon Location Green"
                  width={128}
                  height={128}
                  //style={{ width: '100%' }} // optional
                />
                <p>Beyond Health Abbotsford</p>
                <div>
                  <Image
                    src="/images/location.svg"
                    alt="Location Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>#150 - 1575 McCallum Rd Abbotsford, BC V2S 0K2</p>
                </div>
                <div>
                  <Image
                    src="/images/phoneIcon.svg"
                    alt="Phone Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>1-604-529-7600</p>
                </div>
                <div>
                  <Image
                    src="/images/fax.svg"
                    alt="Fax Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>1-604-529-7603</p>
                </div>
                <div>
                  <Image
                    src="/images/mail-icon.svg"
                    alt="Mail Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>abby@beyondpharmacy.com</p>
                </div>
              </div>
            </div>
            <div>
              <div>
                <Image
                  src="/images/LocationGreen.png"
                  alt="Icon Location Green"
                  width={128}
                  height={128}
                  //style={{ width: '100%' }} // optional
                />
                <p>Beyond Health Abbotsford</p>
                <div>
                  <Image
                    src="/images/location.svg"
                    alt="Location Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>#150 - 1575 McCallum Rd Abbotsford, BC V2S 0K2</p>
                </div>
                <div>
                  <Image
                    src="/images/phoneIcon.svg"
                    alt="Phone Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>1-604-529-7600</p>
                </div>
                <div>
                  <Image
                    src="/images/fax.svg"
                    alt="Fax Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>1-604-529-7603</p>
                </div>
                <div>
                  <Image
                    src="/images/mail-icon.svg"
                    alt="Mail Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>abby@beyondpharmacy.com</p>
                </div>
              </div>
              <div>
                <Image
                  src="/images/LocationBlue.png"
                  alt="Icon Location Green"
                  width={128}
                  height={128}
                  //style={{ width: '100%' }} // optional
                />
                <p>Beyond Health Abbotsford</p>
                <div>
                  <Image
                    src="/images/location.svg"
                    alt="Location Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>#150 - 1575 McCallum Rd Abbotsford, BC V2S 0K2</p>
                </div>
                <div>
                  <Image
                    src="/images/phoneIcon.svg"
                    alt="Phone Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>1-604-529-7600</p>
                </div>
                <div>
                  <Image
                    src="/images/fax.svg"
                    alt="Fax Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>1-604-529-7603</p>
                </div>
                <div>
                  <Image
                    src="/images/mail-icon.svg"
                    alt="Mail Icon"
                    width={15}
                    height={15}
                    //style={{ width: '100%' }} // optional
                  />
                  <p>abby@beyondpharmacy.com</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({
  preview = false,
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData });
  /* @ts-ignore */
  const page = await client.getSingle("terms_of_service");

  return {
    props: { preview, page },
  };
}
