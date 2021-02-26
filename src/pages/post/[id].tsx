import { Box, Heading } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react'
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons';
import { Layout } from '../../components/Layout';
import { usePostQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlCLient';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';
import { withApollo } from '../../utils/withApollo';


export const Post = ({ }) => {
    const { data, error, loading } = useGetPostFromUrl();

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

    if (!data?.post) {
        return (
            <Layout>
                <Box>could not find post</Box>
            </Layout>
        )
    }

    return (
        <Layout>
            <Heading mb={4}>{data.post.title}</Heading>
            <Box mb={4}>
                {data.post.text}
            </Box>
            <EditDeletePostButtons id={data.post.id} creatorId={data.post.creatorId} />
        </Layout>
    );
}

export default withApollo({ srr: true })(Post);