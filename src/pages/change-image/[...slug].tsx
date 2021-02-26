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


export const ChangeImage = ({ }) => {
    const router = useRouter();
    const slug = router.query.slug || []

    return (
        <Layout>
            <div>Slug: {slug}</div>
        </Layout>
    );
}

export default withApollo({ srr: false })(ChangeImage);