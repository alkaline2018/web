import React from 'react'
import { Formik, Form } from 'formik'
import { Box, Button, Flex, FormControl, FormLabel, Input, Link } from '@chakra-ui/react';
import { valueScaleCorrection } from 'framer-motion/types/render/dom/layout/scale-correction';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useLoginMutation, } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router"
import Register from './register';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlCLient';
import NextLink from "next/link"


const Login: React.FC<{}> = ({ }) => {
    const router = useRouter();
    const [, login] = useLoginMutation()
    return (
        <Wrapper variant="small">
            <Formik initialValues={{ usernameOrEmail: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login(values);
                    console.log({ response })
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
                        // worked
                        router.push('/');
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

export default withUrqlClient(createUrqlClient)(Login);