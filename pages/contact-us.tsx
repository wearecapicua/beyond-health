import React from "react";
import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import { createClient } from "../lib/prismic";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from 'next/image';

type IndexProps = InferGetStaticPropsType<typeof getStaticProps>

export default function ContactUsPage({ preview, page}: IndexProps) {
  const imageLocationStyle = "mx-auto relative top-[-64px]";
  const titleStyle = "text-2xl font-bold text-center mb-[2%]";
  const textAreaStyle = "mx-auto relative top-[-34px] text-center mb-[2%] text-[16px]";
  const textInfoStyle = "text-center mb-[2%] text-[16px] flex justify-center";
  const iconStyle = "mr-[15px]";

  return (
    <>
      <Layout preview={preview} >
        <Head>
          <title>Beyond Health</title>
        </Head>
        <div className="bg-gray-000 min-h-screen" 
          style={{ 
            backgroundImage: "url('/images/portrait-handsome-thinking-young-man-isolated-gray-wall 2.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
        }}>
          <Container>
            <div className="2xl:h-[621px] 2xl:mb-[17%] xl:h-[521px] xl:mb-[10%] lg:h-[425px] lg:mb-[15%] md:h-[360px] md:mb-[10%] h-[300px] mb-[10%] max-[640px]:h-[250px] max-[640px]:h-[200px] flex">
              <div className="w-[45%] my-auto ml-[30px]">
                <p className="xl:text-6xl lg:text-6xl mb:text-4xl text-2xl font-bold text-left mb-[2%]">Contact Us</p>
                <p className="lg:text-xl md:text-base text-sm text-left mb-[2%]">Do you have questions about anything? Please let us know and we'll get back to you as soon as possible. For anything urgent, please call us.</p>
              </div>
            </div>
            <div className="flex text-white justify-between mb-[6%] mt-[5%] max-[860px]:flex-col">
              <div className="bg-[#8DC63E] w-[49%] max-[860px]:w-[100%] max-[860px]:mb-[10%]">
                <Image
                  src="/images/LocationGreen.png"
                  alt="Icon Location Green"
                  width={128}
                  height={128}
                  className={imageLocationStyle}
                />
                <div className={textAreaStyle}>
                  <p className={titleStyle}>Beyond Health Abbotsford</p>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/location.svg"
                      alt="Location Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>#150 - 1575 McCallum Rd Abbotsford, BC V2S 0K2</p>
                  </div>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/phoneIcon.svg"
                      alt="Phone Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>1-604-529-7600</p>
                  </div>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/fax.svg"
                      alt="Fax Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>1-604-529-7603</p>
                  </div>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/mail-icon.svg"
                      alt="Mail Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>abby@beyondpharmacy.com</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#143E6F] w-[49%] max-[860px]:w-[100%] max-[860px]:mb-[10%] max-[860px]:mt-[5%]">
                <Image
                  src="/images/LocationBlue.png"
                  alt="Icon Location Green"
                  width={128}
                  height={128}
                  className={imageLocationStyle}
                />
                <div className={textAreaStyle}>
                  <p className={titleStyle}>Beyond Health Surrey</p>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/location.svg"
                      alt="Location Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>#101 - 19211 Fraser Hwy Surrey, BC V3S 7C9</p>
                  </div>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/phoneIcon.svg"
                      alt="Phone Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>1-604-245-6069</p>
                  </div>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/fax.svg"
                      alt="Fax Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>1-604-245-6102</p>
                  </div>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/mail-icon.svg"
                      alt="Mail Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>info@beyondpharmacy.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex text-white justify-between mb-[10%] max-[860px]:flex-col">
              <div className="bg-[#8DC63E] w-[49%] max-[860px]:w-[100%] max-[860px]:mb-[10%]">
                <Image
                  src="/images/LocationGreen.png"
                  alt="Icon Location Green"
                  width={128}
                  height={128}
                  className={imageLocationStyle}
                />
                <div className={textAreaStyle}>
                  <p className={titleStyle}>Beyond Health Abbotsford <br/>(Cannon Clinic)</p>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/location.svg"
                      alt="Location Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>#140 - 1575 McCallum Rd Abbotsford BC V2S 0K2</p>
                  </div>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/phoneIcon.svg"
                      alt="Phone Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>604-853-3311</p>
                  </div>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/fax.svg"
                      alt="Fax Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>604-853-2171</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#143E6F] w-[49%] max-[860px]:w-[100%] max-[860px]:mb-[10%] max-[860px]:mt-[5%]">
                <Image
                  src="/images/LocationBlue.png"
                  alt="Icon Location Green"
                  width={128}
                  height={128}
                  className={imageLocationStyle}
                />
                <div className={textAreaStyle}>
                  <p className={titleStyle}>Beyond Health Surrey</p>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/location.svg"
                      alt="Location Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>#101 - 19211 Fraser Hwy Surrey, BC V3S 7C9</p>
                  </div>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/phoneIcon.svg"
                      alt="Phone Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>604-245-5797</p>
                  </div>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/fax.svg"
                      alt="Fax Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>778-571-5604</p>
                  </div>
                  <div className={textInfoStyle}>
                    <Image
                      src="/images/mail-icon.svg"
                      alt="Mail Icon"
                      width={15}
                      height={15}
                      className={iconStyle}
                    />
                    <p>info@beyondhealth.ca</p>
                  </div>
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
