import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { MeDocument, MeQuery, useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlCLient';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from "next/link"
import { withApollo } from '../../utils/withApollo';


const ChangePassword: NextPage = () => {
    const router = useRouter();
    const [changePassword] = useChangePasswordMutation()
    const [tokenError, setTokenError] = useState('');
    return (<Wrapper variant="small">
        <Formik initialValues={{ newPassword: "" }}
            onSubmit={async (values, { setErrors }) => {
                const response = await changePassword({
                    variables: {
                        token: typeof router.query.token === 'string' ? router.query.token : '',
                        newPassword: values.newPassword
                    }, update: (cache, { data }) => {
                        cache.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: {
                                __typename: "Query",
                                me: data?.changePassword.user,
                            }
                        })
                    }
                });
                if (response.data?.changePassword.errors) {
                    const errorMap = toErrorMap(response.data.changePassword.errors)
                    if ('token' in errorMap) {
                        setTokenError(errorMap.token);
                    }
                    setErrors(errorMap)
                } else if (response.data?.changePassword.user) {
                    // worked
                    router.push('/');
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Box mt={4}>
                        <InputField
                            name="newPassword"
                            placeholder="new password"
                            label="new password"
                            type="password"
                        />
                    </Box>
                    <Flex>
                        {tokenError
                            ? (
                                <>
                                    <Box mr={2} style={{ color: "red" }}>{tokenError}</Box>
                                    <NextLink href="/forgot-password">
                                        <Link>click her to get a new one</Link>
                                    </NextLink>
                                </>
                            )
                            : null}

                    </Flex>
                    <Box mt={4}>
                        <Button isLoading={isSubmitting} type="submit" colorScheme="teal">change password</Button>
                    </Box>
                </Form>
            )}
        </Formik>
    </Wrapper>);
}

export default withApollo({ srr: false })(ChangePassword);