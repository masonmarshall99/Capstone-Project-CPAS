from ariadne import QueryType, make_executable_schema, load_schema_from_path, MutationType
import CPAS_Main.resolvers

type_defs = [
    load_schema_from_path("CPAS/schema.graphql"),
    load_schema_from_path("CPAS_Main/schema.graphql"),
]

query = QueryType()
query.set_field("zones", CPAS_Main.resolvers.list_zones)
query.set_field("locations", CPAS_Main.resolvers.list_locations)
query.set_field("seasons", CPAS_Main.resolvers.list_seasons)
query.set_field("crops", CPAS_Main.resolvers.list_crops)
query.set_field("cropAreas", CPAS_Main.resolvers.list_crop_areas)
query.set_field("producedIns", CPAS_Main.resolvers.list_produced_in)
query.set_field("diseases", CPAS_Main.resolvers.list_diseases)
query.set_field("diseasePresences", CPAS_Main.resolvers.list_disease_presence)
query.set_field("users", CPAS_Main.resolvers.list_users)

mutation = MutationType()
mutation.set_field("createZone", CPAS_Main.resolvers.create_zone)
mutation.set_field("createLocation", CPAS_Main.resolvers.create_location)

schema = make_executable_schema(type_defs, query, mutation)