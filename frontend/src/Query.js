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

export const ADD_CSV_ROW = gql`
    mutation AddCSVRow (
        $zone_name: String!,
        $region_name: String!,
        $sub_region: String!,
        $year: String!,
        $crop_name: String!,
        $area_hectares: Float!,
        $value_tonnes: Float!,
        $disease_group: String!,
        $disease_name: String!,
        $disease_presence_status: String!,
        $dis_inc_year_percent: Float!,
        $dis_inc_area_percent: Float!,
        $dis_severity_without_control_percent: Float,
        $dis_severity_with_control_percent: Float,
        $dis_severity_control_genetic_cont_percent: Float,
        $dis_severity_control_cultural_cont_percent: Float,
        $dis_severity_control_pesticide_cont_percent: Float,
        $avg_commodity_price: Float!,
        $fungicide_resistance_risk: String!
    ){
        addCSVRow(
            zone_name: $zone_name
            region_name: $region_name
            sub_region: $sub_region
            year: $year
            crop_name: $crop_name
            area_hectares: $area_hectares
            value_tonnes: $value_tonnes
            disease_group: $disease_group
            disease_name: $disease_name
            disease_presence_status: $disease_presence_status
            disease_incidence_year_percentage: $dis_inc_year_percent
            disease_incidence_area_percentage: $dis_inc_area_percent
            disease_severity_without_control_percentage: $dis_severity_without_control_percent
            disease_severity_with_control_percentage: $dis_severity_with_control_percent
            disease_severity_control_genetic_contribution_percentage: $dis_severity_control_genetic_cont_percent
            disease_severity_control_cultural_contribution_percentage: $dis_severity_control_cultural_cont_percent
            disease_severity_control_pesticide_contribution_percentage: $dis_severity_control_pesticide_cont_percent
            average_commodity_price: $avg_commodity_price
            fungicide_resistance_risk: $fungicide_resistance_risk
	    )
        {
		    zone_name,
            region_name,
            sub_region,
            year,
            crop_name,
            area_hectares,
            value_tonnes,
            disease_group,
            disease_name,
            disease_presence_status,
            disease_incidence_year_percentage,
            disease_incidence_area_percentage,
            disease_severity_without_control_percentage,
            disease_severity_with_control_percentage,
            disease_severity_control_genetic_contribution_percentage,
            disease_severity_control_cultural_contribution_percentage,
            disease_severity_control_pesticide_contribution_percentage,
            fungicide_resistance_risk,
	    }
    }
`