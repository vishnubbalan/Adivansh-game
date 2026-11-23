# Character Sample Image Prompts — Chapter One

Purpose: generate realistic concept samples for Adivansh, Meera Devi and the Guardian before 3D production (MetaHuman → glTF → Three.js). Samples are **concept references only**; final in-game characters are built as 3D models.

Works in: ChatGPT (image), Google Gemini, Midjourney, Leonardo, Adobe Firefly. Paste one prompt per image. Generate 4 variants each, pick the best, then use that pick as the reference image for the turnaround prompt so the face stays consistent.

## Shared style anchor (already included in every prompt)

> cinematic photoreal film still, epic historical fantasy, realistic human anatomy and proportions, natural skin with pores and subsurface scattering, 85mm lens, shallow depth of field, golden-hour volumetric light, atmospheric haze, rich but natural colour grade, ultra-detailed costume fabric and metalwork

**Negative prompt** (Midjourney `--no`, Leonardo/Firefly "exclude"):
> cartoon, anime, flat illustration, painting, 2D, plastic skin, doll face, blue skin, deity iconography, halo, extra fingers, distorted hands, text, watermark, logo

Originality rule (ADR-003): characters are original heroes of a fictional realm — Ramayana-era *inspired*, not depictions of Rama, Sita, Krishna or any deity. Natural human skin tones; no blue skin, no religious symbols such as a Vaishnava tilak worn as deity marking.

---

## 1. Adivansh — playable hero

Age ~22. Son of the village's fallen protector. Lean archer-warrior build, agile not bulky. Direct, observant, restrained.

### Portrait
```
Cinematic photoreal film still, close-up portrait of Adivansh, a 22-year-old ancient Indian warrior prince, warm brown skin, strong jaw, light stubble, intense dark brown eyes, thick black hair tied in a high warrior topknot with loose strands, small vermilion mark on forehead, simple gold ear cuffs, saffron and deep-green draped angavastram over one shoulder, worn leather bow strap across the chest, faint scar on left eyebrow, determined restrained expression, misty ancient forest behind him, golden-hour volumetric light, 85mm lens, shallow depth of field, natural skin texture with pores, ultra-detailed, epic historical fantasy, realistic human proportions --ar 2:3 --style raw
```

### Full body
```
Cinematic photoreal film still, full-body shot of Adivansh, 22-year-old ancient Indian archer-warrior, lean athletic build, warm brown skin, high black topknot, saffron dhoti wrapped practical for running, deep-green angavastram, leather and bronze forearm guards, cloth wraps on shins, bare feet with leather ankle straps, composite recurve bow in left hand, quiver of fletched arrows on back, simple gold armlets, standing at the edge of a sunlit ancient forest clearing with stone shrine ruins, god rays through the canopy, light mist, realistic anatomy, ultra-detailed fabric and metal, epic historical fantasy --ar 2:3 --style raw
```

### Turnaround (use chosen portrait as reference image)
```
Character turnaround sheet of the same young Indian archer-warrior from the reference image, front view, side view, back view, neutral A-pose, plain light grey studio background, even soft lighting, photoreal, consistent face, costume and proportions across all views, for 3D modelling reference --ar 16:9 --style raw
```

---

## 2. Meera Devi — scholar and healer (secretly the queen)

Age ~28. Arrived six months ago as a healer; calm authority, treats Adivansh as an equal. Costume is humble, with **subtle** hints of royalty she hasn't fully hidden.

### Portrait
```
Cinematic photoreal film still, close-up portrait of Meera Devi, a 28-year-old ancient Indian scholar and healer with quiet royal bearing, warm golden-brown skin, intelligent dark eyes with knowing calm, long black hair in a loose side braid woven with jasmine and a few marigold petals, small gold nose stud, one delicate antique gold earring, simple ivory and muted-red handloom sari with a faded gold border, thin brass medallion with an engraved protection pattern on a cord, faint ink stain on fingertips, oil lamps glowing behind her at dusk, warm amber light, 85mm lens, shallow depth of field, natural skin texture, ultra-detailed, epic historical fantasy, realistic human proportions --ar 2:3 --style raw
```

### Full body
```
Cinematic photoreal film still, full-body shot of Meera Devi, 28-year-old ancient Indian healer with hidden royal grace, ivory and muted-red handloom sari draped in a practical style, shawl over one shoulder, cloth satchel of herbs and palm-leaf manuscripts, brass medallion necklace, simple silver anklets, standing on a raised stone festival dais in a terraced hillside village, marigold garlands, rows of oil lamps, painted kolam patterns on the ground, dusk sky, warm lamp light and cool blue shadows, realistic anatomy, ultra-detailed textiles, epic historical fantasy --ar 2:3 --style raw
```

### Turnaround
Use the Adivansh turnaround prompt, replacing "young Indian archer-warrior" with "Indian healer woman".

---

## 3. The Guardian — Chapter One boss

Protector of an old forest route, bound by an ancient oath. Imposing and readable; **not** a demon from real mythology. Read as a human warrior fused with the forest over centuries.

### Portrait
```
Cinematic photoreal film still, close-up of the Forest Guardian, an ancient oath-bound warrior, towering, weathered grey-brown skin cracked like old bark at the cheekbones, moss and tiny ferns growing in the cracks, deep-set eyes glowing faint amber, long braided silver beard bound with bronze rings, tall bronze helm overgrown with roots and shaped like a temple spire, ancient patinated bronze armour, solemn sorrowful expression, dark forest at night, firefly light, volumetric fog, ultra-detailed textures, epic historical fantasy, realistic creature design --ar 2:3 --style raw
```

### Full body
```
Cinematic photoreal film still, full-body shot of the Forest Guardian, 3-metre-tall ancient warrior bound to the forest, bark-textured grey-brown skin with moss, patinated green bronze armour with root-like growths, tattered ochre cloth sash, round bronze shield carved with a coiled serpent, heavy stone-headed mace bound with bronze bands, standing in front of a crumbling overgrown stone gateway on a forest path, amber eyes glowing, god rays and mist, low camera angle for scale, ultra-detailed, epic historical fantasy, realistic --ar 2:3 --style raw
```

### Telegraph pose (attack wind-up)
```
Same Forest Guardian from the reference image, raising the stone mace high overhead in a wind-up before a strike, amber light crackling along the mace, roots tearing from the ground at his feet, dust and leaves lifting, dramatic low angle, cinematic photoreal, motion blur on debris --ar 16:9 --style raw
```

---

## Tool notes

- **Midjourney:** keep `--style raw`; add `--cref <url>` with the chosen portrait for consistent faces across shots.
- **ChatGPT / Gemini:** delete the `--ar` / `--style` flags; instead say "portrait orientation 2:3" at the end. Upload the chosen portrait and say "same person" for follow-ups.
- **Firefly / Leonardo:** set content type "Photo", paste the negative prompt in the exclude field.
- **Licensing:** before any generated image is used beyond internal concept reference, check the tool's commercial terms and record the source in `docs/06-commercial/ASSET_POLICY.md`.

## After samples are approved

1. Pick one portrait + one full-body per character.
2. Recreate faces in MetaHuman Creator using the samples as reference (cloud GPU session).
3. Costume modelling (dhoti, sari, armour, bow) in Blender or commission.
4. Export to glTF, optimise for browser, and load into the Three.js Chapter One slice.
