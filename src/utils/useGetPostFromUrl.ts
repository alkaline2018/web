import { useRouter } from "next/router";
import { usePostQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetPostFromUrl = () => {
    const intId = useGetIntId();
    return usePostQuery({
        // 해당 내용은 만약 값이 -1 이 들어왔을 땐 정지하라는 내용 같음 원래는 pause 였으나 skip으로 변경
        skip: intId === -1,
        variables: {
            id: intId
        }
    })
}