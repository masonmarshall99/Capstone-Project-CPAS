from ariadne import QueryType, make_executable_schema, load_schema_from_path, MutationType
from ariadne_jwt import resolve_verify, resolve_refresh, resolve_token_auth, jwt_schema, GenericScalar
import CPAS_Main.resolvers

type_defs = [
    load_schema_from_path("CPAS/schema.graphql"),
    load_schema_from_path("CPAS_Main/schema.graphql"),
    jwt_schema
]

query = QueryType()
query.set_field("zones", CPAS_Main.resolvers.list_zones)
query.set_field("regions", CPAS_Main.resolvers.list_regions)
query.set_field("locations", CPAS_Main.resolvers.list_locations)
query.set_field("seasons", CPAS_Main.resolvers.list_seasons)
query.set_field("crops", CPAS_Main.resolvers.list_crops)
query.set_field("cropAreas", CPAS_Main.resolvers.list_crop_areas)
query.set_field("producedIns", CPAS_Main.resolvers.list_produced_in)
query.set_field("diseases", CPAS_Main.resolvers.list_diseases)
query.set_field("diseasePresences", CPAS_Main.resolvers.list_disease_presence)

mutation = MutationType()
mutation.set_field("createZone", CPAS_Main.resolvers.create_zone)
mutation.set_field("createRegion", CPAS_Main.resolvers.create_region)
mutation.set_field("createLocation", CPAS_Main.resolvers.create_location)
mutation.set_field("createSeason", CPAS_Main.resolvers.create_season)
mutation.set_field("createCrop", CPAS_Main.resolvers.create_crop)
mutation.set_field("createCropArea", CPAS_Main.resolvers.create_crop_area)
mutation.set_field("createProducedIn", CPAS_Main.resolvers.create_produced_in)
mutation.set_field("createDisease", CPAS_Main.resolvers.create_disease)
mutation.set_field("createDiseasePresence", CPAS_Main.resolvers.create_disease_presence)
mutation.set_field("addCSVRow", CPAS_Main.resolvers.addCSVRow)

mutation.set_field('verifyToken', resolve_verify)
mutation.set_field('refreshToken', resolve_refresh)
mutation.set_field('tokenAuth', resolve_token_auth)

schema = make_executable_schema(type_defs, [query, mutation], GenericScalar)