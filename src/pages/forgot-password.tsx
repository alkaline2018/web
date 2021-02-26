import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlCLient';
import { withApollo } from '../utils/withApollo';

const ForgotPassword: React.FC<{}> = ({ }) => {
    const [complete, setComplete] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();
    return (
        <Wrapper variant="small">
            <Formik initialValues={{ email: "" }}
                onSubmit={async (values) => {
                    const response = await forgotPassword({ variables: values });
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

export default withApollo({ srr: false })(ForgotPassword);