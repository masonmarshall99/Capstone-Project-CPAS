import { gql } from "@apollo/client";

export const GET_REGIONS = gql`
    query {
        regions {
            region_name
        }
    }
`

export const GET_SUBREGIONS = gql`
    query {
        locations{
  	        region {
                region_name
            }
            sub_region
        }
    }
`

export const GET_CROPS = gql`
    query {
        crops {
            crop_name
        }
    }
`

export const GET_SEASONS = gql`
    query {
        seasons {
            year
        }
    }
`

export const GET_DISEASES = gql`
    query {
        diseases {
            disease_name
        }
    }
`

export const GET_CROP_AREAS = gql`
    query {
        cropAreas {
            crop {
                crop_name
            }
            location {
                zone {zone_name}
                region {region_name}
                sub_region
            }
            season {year}
            area_hectares
            value_tonnes
        }
    }
`