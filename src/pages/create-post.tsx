import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlCLient';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';

const CreatePost: React.FC<{}> = ({ }) => {
    const router = useRouter();
    useIsAuth();
    const [createPost] = useCreatePostMutation()
    return (
        <Layout variant="small">
            <Formik initialValues={{ title: '', text: '' }}
                onSubmit={async (values) => {
                    const { errors } = await createPost({ variables: { input: values } });
                    if (!errors) {
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="title"
                            placeholder="title"
                            label="Title"
                        />
                        <Box mt={4}>
                            <InputField
                                textarea
                                name="text"
                                placeholder="text..."
                                label="Body"
                            />
                        </Box>
                        <Box mt={4}>
                            <Button isLoading={isSubmitting} type="submit" colorScheme="teal">create-post</Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Layout>);
}

export default withApollo({ srr: false })(CreatePost);