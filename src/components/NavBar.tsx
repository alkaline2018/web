import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link"
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client';
import styles from './Navbar.module.css'


interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const router = useRouter()
    const [logout, { loading: logoutFetching }] = useLogoutMutation();
    const apolloClient = useApolloClient();
    const { data, loading } = useMeQuery({
        skip: isServer()
    });
    let body = null;

    // data is loading
    if (loading) {

        // user not logged in
    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link color="white" mr={2}>login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link color="white" >register</Link>
                </NextLink>
            </>
        )
        // user not logged in
    } else {
        body = (
            <Flex color="white" align="center">
                <NextLink href="/create-post">
                    <Button as={Link} style={{ textDecoration: 'none' }} variant="ghost" _hover={{ bg: "white", color: "#007CF7" }} mr={2}>
                        create post
                    </Button>
                </NextLink>
                <Box mr={2}>{data.me.username}</Box>
                <Button onClick={async () => {
                    await logout();
                    await apolloClient.resetStore();
                }}
                    isLoading={logoutFetching}
                    variant="link" colorScheme="white">logout</Button>
            </Flex>
        )
    }

    return (
        <Flex position="sticky" top={0} zIndex={1} p={4} bg="#007CF7">
            <Flex flex={1} m="auto" align="center" maxW={800}>
                <NextLink href="/">
                    <Link >
                        <Heading>WingSuit</Heading>
                    </Link>
                </NextLink>
                <Box ml={'auto'}>
                    {body}
                </Box>
            </Flex>
        </Flex>
    );
}