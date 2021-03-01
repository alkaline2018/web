import { Button } from '@chakra-ui/react';
import React from 'react'
import { downloadURI } from '../../utils/downloadURI';

interface DownloadImageProps {

}

export const DownloadImage: React.FC<DownloadImageProps> = ({ }) => {
    return (
        <Button mr={2} onClick={() => {
            const c = document.getElementsByTagName("canvas")[0]
            const uri = c.toDataURL("image/png");

            downloadURI({ uri, name: "wingsuit-image" });

        }} colorScheme="blue">save-image</Button>
    );
}