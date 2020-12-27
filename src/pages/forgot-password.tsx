import { Box, Flex, Link, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import router from 'next/dist/next-server/lib/router/router';
import React, { useState } from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlCLient';
import { toErrorMap } from '../utils/toErrorMap';
import NextLink from "next/link"
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({ }) => {
    const [complete, setComplete] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();
    return (
        <Wrapper variant="small">
            <Formik initialValues={{ email: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await forgotPassword(values);
                    setComplete(true);
                }}
            >
                {({ isSubmitting }) =>
                    complete ? (
                        <Box>
                            if an account with that email exists, we sent you can email
                        </Box>
                    ) : (
                            <Form>
                                <InputField
                                    name="email"
                                    placeholder="Email"
                                    label="Email"
                                />
                                <Box mt={4}>
                                    <Button isLoading={isSubmitting} type="submit" colorScheme="teal">forgot password</Button>
                                </Box>
                            </Form>
                        )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)