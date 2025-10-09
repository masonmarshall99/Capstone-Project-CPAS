import { gql } from "@apollo/client";

export const GET_REGIONS = gql`
    query {
        regions {
            region_name
        }
    }`

export const GET_SUBREGIONS = gql`
    query {
        locations{
  	        region {
                region_name
            }
            sub_region
        }
    }`

export const GET_CROPS = gql`
    query {
        crops {
            crop_name
        }
    }`

export const GET_SEASONS = gql`
    query {
        seasons {
            year
        }
    }
`