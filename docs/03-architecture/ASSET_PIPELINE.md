# 2D Asset Pipeline and Runtime Integration

## Pipeline stages
1. Brief: gameplay purpose, emotional tone, target scale, variants and constraints.
2. Research: references, originality check, cultural review and licence review.
3. Concept: thumbnails, silhouette, palette and composition approval.
4. Production: layered illustration or animation source with editable files.
5. Export: sprite sheets, atlases, compressed backgrounds and metadata.
6. Integration: Phaser loader keys, origins, hitboxes, animation definitions and scene placement.
7. Validation: gameplay-scale review, desktop/mobile crop, frame-time and memory profiling.
8. Release: provenance record, versioned source, reviewer and approval status.

## Naming
Use stable, descriptive, lowercase IDs. Suggested pattern: `region_asset_variant_resolution.ext`. Animation keys should follow `character_state_direction_variant`. Do not rename runtime keys without updating references and tests.

## Sprite requirements
For each character record logical frame size, pixels-per-unit convention, pivot/origin, collision body dimensions, animation frame order, frame rate, looping, transition rules and source-file path. Keep collision geometry independent of decorative cloth/hair.

## Background requirements
Record intended viewport, world width/height, parallax factor, seamless edges, crop-safe zones, foreground overlap and compression. Avoid a single enormous uncompressed image for a scrolling region; split and stream where profiling supports it.

## Texture and memory
Use atlases where they reduce draw calls without creating oversized textures that exceed target hardware. Provide resolution variants where justified. Track decoded texture memory, not just download size. Profile on representative lower-end mobile hardware.

## Animation quality
Check foot contact, anticipation, follow-through, weapon arcs, cloth intersections, silhouette clarity and loop seams. Gameplay timing must be driven by state/timing data, not inferred from visually inconsistent frame counts.

## Asset provenance
Every shipped asset must link to the asset register in `06-commercial/ASSET_POLICY.md`. Unreviewed generated or marketplace content remains excluded from commercial release builds.
