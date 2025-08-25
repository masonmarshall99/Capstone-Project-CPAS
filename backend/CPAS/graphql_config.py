from ariadne import QueryType, make_executable_schema, load_schema_from_path, MutationType
import CPAS_Main.resolvers

type_defs = [
    load_schema_from_path("CPAS/schema.graphql"),
    load_schema_from_path("CPAS_Main/schema.graphql"),
]

query = QueryType()
query.set_field("zones", CPAS_Main.resolvers.list_zones)

mutation = MutationType()
mutation.set_field("createZone", CPAS_Main.resolvers.create_zone)

schema = make_executable_schema(type_defs, query, mutation)