import { gql } from "@apollo/client";

export const GET_REGIONS = gql`
    query {
        regions {
            region_name
        }
    }`