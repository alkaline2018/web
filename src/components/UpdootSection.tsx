import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Box, Heading } from '@chakra-ui/react'
import { Post, PostSnippetFragment, PostsQuery, useVoteMutation, VoteMutation } from '../generated/graphql'
import React, { useState } from 'react'
import { gql } from '@urql/core';
import { ApolloCache } from '@apollo/client';

interface UpdootSectionProps {
    post: PostSnippetFragment;
}

const updateAfterVote = (value: number, postId: number, cache: ApolloCache<VoteMutation>) => {

    const data = cache.readFragment<{
        id: number;
        points: number;
        voteStatus: number | null;
    }>({
        id: "Post:" + postId,
        fragment: gql`
                fragment _ on Post {
                    id
                    points
                    voteStatus
                }
            `,
    });

    if (data) {
        if (data.voteStatus === value) {
            return;
        }
        const newPoints = (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
        cache.writeFragment({
            id: "Post:" + postId,
            fragment: gql`
                fragment __ on Post {
                  points
                  voteStatus
                }
              `,
            data: { points: newPoints, voteStatus: value },
        });
    }
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
                        },
                        update: (cache) => updateAfterVote(1, post.id, cache)
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
                        },
                        update: (cache) => updateAfterVote(-1, post.id, cache)

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