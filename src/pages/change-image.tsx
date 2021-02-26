import React, { useState } from 'react'
import { useRouter } from "next/router"
import Image from 'next/image'
import { withApollo } from '../utils/withApollo';
import { Layout } from '../components/Layout';
import { useGetCookieImageListQuery } from '../generated/graphql';
import { Box } from '@chakra-ui/react';

interface registerProps { }

const myLoader = ({ src, width, quality }) => {
    return `http://image.s-wingsuit.com:3003/${src}?w=${width}&q=${quality || 75}`
}


const ChangeImage: React.FC<registerProps> = ({ }) => {
    const router = useRouter();
    const [files, setFiles] = useState([])
    const { data, error, loading } = useGetCookieImageListQuery();
    console.log("data:", data?.getCookieImageList)

    if (loading) {
        return (
            <Layout>
                <div>loading...</div>
            </Layout>
        )
    }
    if (error) {
        console.error(error);
    }

    if (!data) {
        return (
            <Layout>
                <Box>could not image</Box>
            </Layout>
        )
    }

    const imageSet = new Set(data?.getCookieImageList)
    // console.log("imageSet:", imageSet)
    const uniqueArr = Array.from(imageSet)
    // console.log("uniqueArr:", uniqueArr)

    return (
        <Layout>
            {uniqueArr.map((image) => !image ? null :
                (
                    <img
                        // loader={myLoader}
                        src={'http://image.s-wingsuit.com:3003/' + image}
                        alt="Picture of the author"
                        width={100}
                        height={100}
                    />
                )
            )
            }
        </Layout>
    );
}

export default withApollo({ ssr: false })(ChangeImage);