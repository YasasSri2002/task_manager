
import { UserResponseDto } from "@/dto/user";
import { getUserById } from "@/services/user/getByid";
import {UseQueryOptions } from "@tanstack/react-query";

export function userDataQueryOption(): UseQueryOptions<UserResponseDto, Error>{
    return {
        queryKey: ['user'],
        queryFn: ()=> getUserById(),
        staleTime: 1000 * 60 * 10,
        retry: 1
    }
}