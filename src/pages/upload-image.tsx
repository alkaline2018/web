import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Box, Button, FormControl, FormLabel, Input, } from '@chakra-ui/react';
import { valueScaleCorrection } from 'framer-motion/types/render/dom/layout/scale-correction';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { GetCookieImageListDocument, GetCookieImageListQuery, useRegisterMutation, useSetCookieImageListMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router"
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlCLient';
import { withApollo } from '../utils/withApollo';
import { Layout } from '../components/Layout';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

// Import the plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

import { CONTENT_URL_HOST } from '../constants';

interface registerProps { }

const UploadImage: React.FC<registerProps> = ({ }) => {
    const router = useRouter();
    const [files, setFiles] = useState([])
    const [setCookieImageList] = useSetCookieImageListMutation();
    let fileNames: string[] = []
    let pond: any;
    return (
        <Layout>
            <Formik initialValues={{ fileNames: fileNames }}
                onSubmit={async (values, { setErrors }) => {
                    console.log("fileNames2", fileNames)

                    const setResult = await setCookieImageList({
                        variables: { imageList: fileNames },
                        update: (cache, { data }) => {
                            cache.writeQuery<GetCookieImageListQuery>({
                                query: GetCookieImageListDocument,
                                data: {
                                    __typename: "Query",
                                    getCookieImageList: fileNames
                                }
                            })
                        }
                    })
                    console.log("setResult: ", setResult)
                    router.push({
                        pathname: '/change-image',
                    });
                }}
            >

                {({ isSubmitting }) => {

                    console.log("helloworld")
                    console.log("isSubmitting: ", isSubmitting)
                    if (pond && isSubmitting) {
                        pond.getFiles().forEach((element: any) => {
                            const fileName = JSON.parse(element.serverId).filename
                            console.log("helloworld2")

                            fileNames.push(fileName)
                        });
                    }

                    return (
                        <Form>
                            <FilePond
                                files={files}
                                // onupdatefiles={(fileItems) => {
                                //     setFiles
                                // }
                                // }
                                onupdatefiles={setFiles}
                                className="filepond-root"
                                ref={ref => pond = ref}
                                allowMultiple={true}
                                maxFiles={3}
                                server="http://image.s-wingsuit.com:3003/upload"
                                name="file"
                                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                            />
                            {/* <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box> */}
                            <Button
                                width="100%"
                                // isLoading
                                _hover={{ bg: "#007CF7", color: "white" }}
                                type="submit"
                                isLoading={isSubmitting}
                            >
                                Image Change
                            </Button>
                        </Form>
                    )
                }
                }
            </Formik>



        </Layout>
    );
}

export default withApollo({ ssr: false })(UploadImage);