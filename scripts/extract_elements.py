"""Extract embedded image objects with alpha; preserve source coordinates.
Raster/vector diagrams are exported separately as bounded figure assets, never full slides.
"""
from pathlib import Path
import json, shutil
import pymupdf as fitz
from PIL import Image
BASE=Path('/Users/junrong/Library/CloudStorage/SynologyDrive-DS920/个人资料/作品集')
DOC=fitz.open(BASE/'陆俊荣作品集.pdf')
ROOT=Path('source-assets'); ROOT.mkdir(exist_ok=True)
IMAGES=ROOT/'images'; IMAGES.mkdir(exist_ok=True)
WEB=Path('public/assets/elements'); WEB.mkdir(parents=True,exist_ok=True)
manifest=[]; done=set()
for n,page in enumerate(DOC,1):
 masks={im[0]:im[1] for im in page.get_images(full=True)}
 for info in page.get_image_info(xrefs=True):
  x=info['xref']; r=fitz.Rect(info['bbox'])
  if not x: continue
  target=IMAGES/f'x{x}.webp'
  if x not in done:
   pix=fitz.Pixmap(DOC,x)
   if not pix.colorspace:continue
   if pix.colorspace.n!=3:pix=fitz.Pixmap(fitz.csRGB,pix)
   mask=masks.get(x,0)
   if mask:
    try: pix=fitz.Pixmap(pix,fitz.Pixmap(DOC,mask))
    except: pass
   mode='RGBA' if pix.alpha else 'RGB'
   im=Image.frombytes(mode,(pix.width,pix.height),pix.samples)
   im.save(target,'WEBP',quality=93)
   done.add(x)
  manifest.append({'page':n,'xref':x,'file':str(target),'bbox':list(r),'width':info['width'],'height':info['height'],'flattened':r.get_area()>page.rect.get_area()*.95 and len(page.get_image_info())==1})
(ROOT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
# Keep every image in the source library; publish only content-bearing objects.
selected=[81,155,256,264,276,345,381,441,451,460,488,496,509,518,564,619,625,680,682,686,689,708,718,765,
862,870,891,899,905,913,989,1029,1032,1040,1123,1143,1155,1188,1229,1260,1267,1271,1275,1290,1293,1296,1302,1345,1361,1368,1375,1379,1445,1448,
1484,1515,1525,1535,1546,1551,1566,1571,1581,1587,1597,1615,1638,1640,1647,1653,1655,1662,1664,1667,1688,1699,1706,1715,1719,1728,1734,1737,1742,1749,1762,1765,1768,1771,1774,1777,1780,1783,1803,1818,1833,1843,1858,1866,1876,1886,1895,1901,1907,1913,1919,1925,1931,1937,1943,1949,1955,1960,1967,1973,1980,2000,2014,
2022,2046,2077,2080,2083,2085,2091,2094,2103,2144,2201,2207,2210,2217,2220,2226,2232,2238,2244,2249,2255,2262,2268,2274,2280,2284,2287,2290,2293,2295,2299,2301,2304,2311,2318,2347,2360,2364,2370,2379,2385,2393,2401,2419,2431,2437,2461,2497,2516,2557,2576,2582,2593,2599,2611,2617,2632,2642,2651,2660,2666,2672,2678,2684,2690,2693,2696,2699,2702,2705,2708,2711,2717,2720,2723,2726,2729,2732,2735,2738,2741,2745,2748,2751,2754,2757,2760,2763,2766,2769,2772,2790,2792,2795,2798,2801,2804,2808,2810,2813,2816,2819,
2823,2838,2843,2849,2863,2868,2873,2878,2883,2889,2909,2931,2938,2944,2947,2950,2952,2959,2965,2971,2977,2980,2983]
for x in selected:
 if (IMAGES/f'x{x}.webp').exists():shutil.copy2(IMAGES/f'x{x}.webp',WEB/f'x{x}.webp')
# Bounds in PDF coordinates. These are individual figures, not page reproductions.
clips={
 'sf-order-flow':(8,(670,30,1390,320)),
 'bambu-floorplan':(14,(100,135,1800,970)),
 'sound-ssp':(21,(665,535,1235,883)),
 'sound-abc':(21,(673,206,1230,530)),
 'sound-circuit':(23,(662,165,945,420)),
 'matrix-layers':(38,(25,220,665,860)),
 'matrix-relations':(38,(1225,170,1780,850)),
 'sound-flow':(24,(25,418,720,875)),
 'sound-system':(23,(28,115,1270,740)),
 'flex-workflow':(30,(890,72,1770,830)),
 'flex-blueprint':(32,(55,130,1740,855)),
 'flex-structure':(33,(910,100,1760,840)),
 'matrix-theory':(37,(595,60,1775,870)),
 'matrix-emergence':(38,(720,60,1775,850)),
 'matrix-concept':(39,(20,80,550,880)),
 'matrix-structure':(39,(575,70,1785,890)),
}
# PawPals is flattened in both supplied PDFs: retain original pixels, extract local regions.
clips.update({
 'paw-context':(44,(780,405,1170,975)),
 'paw-intervention':(45,(30,190,1390,980)),
 'paw-blueprint':(46,(35,180,1880,1020)),
 'paw-stakeholders':(47,(670,185,1800,890)),
 'paw-journey':(49,(32,240,1890,940)),
 'paw-information':(50,(30,220,1260,910)),
 'paw-incentives':(50,(1290,210,1880,930)),
 'paw-desktop':(51,(34,202,1248,890)),
 'paw-map-phone':(51,(1390,133,1598,535)),
 'paw-growth-phone':(51,(1614,133,1820,535)),
 'paw-community-phone':(51,(1390,548,1598,952)),
 'paw-station-phone':(51,(1614,548,1820,952)),
 'paw-gps-test':(53,(865,667,1878,985)),
 'paw-tracking-photo':(53,(610,218,823,505)),
 'paw-code':(53,(40,540,960,990)),
 'paw-hardware':(54,(105,497,805,990)),
 'paw-algorithm':(54,(1445,225,1850,935)),
 'paw-wearable':(55,(105,277,479,775)),
 'paw-collar':(55,(532,277,907,775)),
 'paw-user-research':(55,(984,275,1830,817)),
 'paw-proto-1':(56,(38,180,610,490)),
 'paw-proto-2':(56,(665,180,1213,490)),
 'paw-proto-3':(56,(1270,180,1830,490)),
 'paw-field-1':(56,(38,515,610,950)),
 'paw-field-2':(56,(665,515,1213,950)),
 'paw-field-3':(56,(1270,515,1830,950)),
 'paw-behaviour':(58,(35,220,1230,930)),
 'paw-station':(59,(26,154,1075,744)),
 'paw-esp-now':(59,(1126,155,1885,663)),
 'paw-station-model':(59,(1126,740,1885,994)),
 'paw-exhibition':(60,(38,220,995,900)),
 'paw-wearable-display':(60,(1015,220,1445,900)),
 'paw-print':(60,(1458,220,1880,900)),
})
clip_manifest=[]
for name,(n,bounds) in clips.items():
 p=DOC[n-1];r=fitz.Rect(bounds)&p.rect
 scale=min(2,2200/r.width)
 if n>=42:scale=1.25 # Source pixels limit detail; don't imply regained vectors.
 pix=p.get_pixmap(matrix=fitz.Matrix(scale,scale),clip=r,alpha=False)
 Image.frombytes('RGB',(pix.width,pix.height),pix.samples).save(WEB/f'{name}.webp','WEBP',quality=94)
 clip_manifest.append({'name':name,'page':n,'bbox':list(r),'method':'flattened-region' if n>=42 else 'composed-figure'})
(ROOT/'figures.json').write_text(json.dumps(clip_manifest,ensure_ascii=False,indent=2))
print(f'{len(done)} unique image objects archived; {len(selected)} selected objects + {len(clips)} figures exported.')

# Intrinsic image dimensions keep lazy-loaded media stable in the browser.
dimensions={}
for path in WEB.glob("*.webp"):
 im=Image.open(path);dimensions[path.stem]={"width":im.width,"height":im.height}
Path("src/assetDimensions.json").write_text(json.dumps(dimensions,separators=(",",":")))
