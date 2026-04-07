import { userDataQueryOption } from "@/queryOptions/userQueryOptions"
import { useQuery } from "@tanstack/react-query"

export const useUserData = () =>{
    return useQuery(userDataQueryOption());
}