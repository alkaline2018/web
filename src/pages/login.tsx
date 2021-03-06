import React from 'react'
import { Formik, Form } from 'formik'
import { Box, Button, Flex, FormControl, FormLabel, Input, Link } from '@chakra-ui/react';
import { valueScaleCorrection } from 'framer-motion/types/render/dom/layout/scale-correction';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { MeDocument, MeQuery, useLoginMutation, } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router"
import Register from './register';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlCLient';
import NextLink from "next/link"
import { withApollo } from '../utils/withApollo';


const Login: React.FC<{}> = ({ }) => {
    const router = useRouter();
    const [login] = useLoginMutation()
    return (
        <Wrapper variant="small">
            <Formik initialValues={{ usernameOrEmail: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login({
                        variables: values, update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    __typename: "Query",
                                    me: data?.login.user,
                                }
                            });
                            cache.evict({ fieldName: "posts:{}" })
                        }
                    });
                    console.log({ response })
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
                        if (typeof router.query.next === 'string') {
                            router.push(router.query.next);
                        } else {
                            // worked
                            router.push('/');
                        }
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="usernameOrEmail"
                            placeholder="username or email"
                            label="Username or Email"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Flex>
                            <NextLink href="/forgot-password">
                                <Link mt={2} ml="auto">forgot password?</Link>
                            </NextLink>
                        </Flex>
                        <Box mt={4}>
                            <Button isLoading={isSubmitting} type="submit" colorScheme="teal">login</Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withApollo({ srr: false })(Login);