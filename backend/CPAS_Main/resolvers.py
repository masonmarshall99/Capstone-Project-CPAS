from .models import Zone

def list_zones(*_):
    return [
        {"zone_name": zone.zone_name}
        for zone in Zone.objects.all()
    ]

def get_zone(_,zone_name: str):
    return Zone.objects.get(zone_name=zone_name)