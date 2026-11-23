"""Generate editable, proportion-led Chapter One character blockouts in Blender.

Run from Blender's Scripting workspace (Blender 3.6+):
    blender --background --python tools/blender/create_chapter_one_blockouts.py

This creates primitive blockout proxies only. It is not a sculpt, retopology,
production rig, final costume simulation, or game-ready character asset.
Axes: +Z up, character faces -Y, X is character left/right.
"""
import bpy
from mathutils import Vector

# Clean only previously generated blockout collections.
for collection_name in ("BLOCKOUT_ADIVANSH", "BLOCKOUT_MEERA"):
    collection = bpy.data.collections.get(collection_name)
    if collection:
        for obj in list(collection.objects):
            bpy.data.objects.remove(obj, do_unlink=True)
        bpy.data.collections.remove(collection)

def make_collection(name):
    collection = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(collection)
    return collection

def move_to_collection(obj, collection):
    for owner in list(obj.users_collection):
        owner.objects.unlink(obj)
    collection.objects.link(obj)
    return obj

def sphere(name, location, scale, collection):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=12, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return move_to_collection(obj, collection)

def cylinder_between(name, start, end, radius, collection, radius_end=None):
    start, end = Vector(start), Vector(end)
    direction = end - start
    bpy.ops.mesh.primitive_cone_add(
        vertices=12, radius1=radius, radius2=radius if radius_end is None else radius_end,
        depth=direction.length, location=(start + end) / 2
    )
    obj = bpy.context.object
    obj.name = name
    obj.rotation_mode = "QUATERNION"
    obj.rotation_quaternion = direction.to_track_quat("Z", "Y")
    return move_to_collection(obj, collection)

def build_character(code, height, collection_name, female=False):
    c = make_collection(collection_name)
    # Landmark heights are ratios of total standing height; same proportion
    # system drives all views and can be replaced by a unified sculpt mesh.
    z = lambda ratio: height * ratio
    shoulder = 0.225 * height
    hip = 0.125 * height
    waist = 0.145 * height
    neck = 0.045 * height

    # Feet and legs: separate pieces intentionally expose joint landmarks.
    for side, x in (("L", -0.105 * height), ("R", 0.105 * height)):
        sphere(f"{code}_foot_{side}", (x, -0.035 * height, z(.035)), (.075*height, .14*height, .035*height), c)
        cylinder_between(f"{code}_shin_{side}", (x, 0, z(.08)), (x, 0, z(.265)), .045*height, c, .055*height)
        sphere(f"{code}_knee_{side}", (x, 0, z(.27)), (.052*height, .052*height, .052*height), c)
        cylinder_between(f"{code}_thigh_{side}", (x, 0, z(.30)), (x*0.94, 0, z(.49)), .065*height, c, .085*height)

    sphere(f"{code}_pelvis_blockout", (0, 0, z(.505)), (hip, .095*height, .095*height), c)
    sphere(f"{code}_torso_blockout", (0, 0, z(.665)), (shoulder, .105*height, .16*height), c)
    sphere(f"{code}_chest_blockout", (0, -.004*height, z(.735)), (.205*height, .10*height, .085*height), c)
    cylinder_between(f"{code}_neck", (0, 0, z(.79)), (0, 0, z(.845)), neck, c, neck*.88)
    sphere(f"{code}_head_blockout", (0, 0, z(.895)), (.078*height, .085*height, .105*height), c)

    # Arms in a relaxed A-pose; shoulder/elbow/wrist/hand remain distinct.
    for side, sign in (("L", -1), ("R", 1)):
        sh = (sign*.205*height, 0, z(.755))
        el = (sign*.315*height, -.005*height, z(.635))
        wr = (sign*.405*height, -.018*height, z(.535))
        hand = (sign*.425*height, -.03*height, z(.49))
        sphere(f"{code}_shoulder_{side}", sh, (.067*height, .067*height, .067*height), c)
        cylinder_between(f"{code}_upper_arm_{side}", sh, el, .048*height, c, .038*height)
        sphere(f"{code}_elbow_{side}", el, (.04*height, .04*height, .04*height), c)
        cylinder_between(f"{code}_forearm_{side}", el, wr, .036*height, c, .026*height)
        sphere(f"{code}_hand_{side}", hand, (.027*height, .022*height, .045*height), c)

    # Costume silhouette proxies: kept separate from the body for later cloth work.
    sphere(f"{code}_inner_tunic_proxy", (0, .008*height, z(.69)), (.225*height, .112*height, .135*height), c)
    if female:
        sphere(f"{code}_sari_skirt_proxy", (0, .012*height, z(.42)), (.205*height, .13*height, .22*height), c)
        cylinder_between(f"{code}_pallu_proxy", (sign*.15*height, .02*height, z(.79)), (-.12*height, .04*height, z(.53)), .035*height, c, .055*height)
        sphere(f"{code}_braid_proxy", (.085*height, .035*height, z(.72)), (.028*height, .035*height, .20*height), c)
    else:
        sphere(f"{code}_dhoti_proxy", (0, .012*height, z(.405)), (.19*height, .13*height, .19*height), c)
        cylinder_between(f"{code}_scarf_proxy", (-.20*height, -.015*height, z(.79)), (.18*height, -.02*height, z(.69)), .035*height, c, .035*height)
        sphere(f"{code}_belt_proxy", (0, -.006*height, z(.535)), (.155*height, .115*height, .028*height), c)

    # Set origin-friendly object transforms and viewport display.
    for obj in c.objects:
        obj.display_type = "SOLID"
        obj["asset_stage"] = "blockout_proxy"
        obj["character_height_m"] = height
    return c

scene = bpy.context.scene
scene.unit_settings.system = "METRIC"
scene.unit_settings.scale_length = 1.0
build_character("CHR_ADIVANSH", 1.78, "BLOCKOUT_ADIVANSH", female=False)
build_character("CHR_MEERA", 1.66, "BLOCKOUT_MEERA", female=True)

# Place the two blockouts side-by-side without changing their local origins.
for obj in bpy.data.collections["BLOCKOUT_MEERA"].objects:
    obj.location.x += 1.15

# Simple ground plane and named reference cameras for subsequent orthographic work.
bpy.ops.mesh.primitive_plane_add(size=5, location=(.55, 0, 0))
ground = bpy.context.object
ground.name = "BLOCKOUT_GROUND"
ground["asset_stage"] = "reference_only"

print("Chapter One blockout proxies created. Review proportions and replace primitives with unified meshes.")
