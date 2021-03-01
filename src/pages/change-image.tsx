import React, { useState } from 'react'
import { useRouter } from "next/router"
import Image from 'next/image'
import { withApollo } from '../utils/withApollo';
import { Layout } from '../components/Layout';
import { useGetCookieImageListQuery } from '../generated/graphql';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { App } from '../../static/js/image-text/app';
import { CONTENT_URL_HOST } from '../constants';
import { InputField } from '../components/InputField';
import { Formik, Form } from 'formik';
import { toErrorMap } from '../utils/toErrorMap';
import login from './login';
import { UseGetCookieImageListQueryComponent } from '../components/image-components/UseGetCookieImageListQueryComponent';
import { DownloadImage } from '../components/image-components/downloadImage';
import { downloadURI } from '../utils/downloadURI';

interface registerProps { }

const ChangeImage: React.FC<registerProps> = ({ }) => {

    const router = useRouter();

    let app: App;

    return (
        <Layout>
            <Formik initialValues={{ text: "" }}
                onSubmit={async (values, { setErrors }) => {
                    if (app) {

                        app.setText(values.text)
                    } else {
                        app = new App(values.text);
                    }
                    app.resize();
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="text"
                            placeholder="글자를 입력 후 change-text를 클릭해주세요"
                        // label="text"
                        />
                        <Box mt={4}>
                            <Button mr={2} isLoading={isSubmitting} type="submit" colorScheme="blue">change-text</Button>
                            <DownloadImage />
                            <UseGetCookieImageListQueryComponent />
                        </Box>
                    </Form>

                )}
            </Formik>


        </Layout>

    );
}

export default withApollo({ ssrMode: false })(ChangeImage);