import { Box } from "@chakra-ui/react";
import React from "react";
import { CONTENT_URL_HOST } from "../../constants";
import { useGetCookieImageListQuery } from "../../generated/graphql";
import { Layout } from "../Layout";

interface UseGetCookieImageListQueryComponentProps {
}

export const UseGetCookieImageListQueryComponent: React.FC<UseGetCookieImageListQueryComponentProps> = ({ }) => {

    const { data, error, loading } = useGetCookieImageListQuery();

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
    const uniqueArr = Array.from(imageSet)

    return (
        <ul className="upload-image" id="upload-image" >
            {uniqueArr.map((image) => !image ? null :
                (
                    <li key={image}>
                        <img
                            src={CONTENT_URL_HOST + image}
                            alt="Picture of the author"
                        />
                    </li>
                )
            )
            }
        </ul>
    )
}