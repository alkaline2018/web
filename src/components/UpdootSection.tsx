import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Box, Heading } from '@chakra-ui/react'
import { PostSnippetFragment, PostsQuery, useVoteMutation } from '../generated/graphql'
import React, { useState } from 'react'

interface UpdootSectionProps {
    post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    const [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>('not-loading');
    const [vote] = useVoteMutation();
    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            mr={4}
        >
            {/* TODO: 동일 voteStatus 시 취소 */}
            <IconButton
                colorScheme={post.voteStatus === 1 ? "blue" : undefined}
                onClick={async () => {
                    // if (post.voteStatus === 1) {                    
                    //     return;
                    // }
                    setLoadingState('updoot-loading')
                    await vote({
                        variables: {
                            postId: post.id,
                            value: 1,
                        }
                    })
                    setLoadingState('not-loading')
                }}
                isLoading={loadingState === 'updoot-loading'}
                aria-label="updoot post"
                icon={<ChevronUpIcon />}
            />
            {post.points}
            <IconButton
                colorScheme={post.voteStatus === -1 ? "red" : undefined}
                onClick={async () => {
                    // if (post.voteStatus === -1) {
                    //     return;
                    // }
                    setLoadingState('downdoot-loading')
                    await vote({
                        variables: {
                            postId: post.id,
                            value: -1,
                        }
                    })
                    setLoadingState('not-loading')
                }}
                isLoading={loadingState === 'downdoot-loading'}
                aria-label="downdoot post"
                icon={<ChevronDownIcon />}
            />
        </Flex>
    );
}