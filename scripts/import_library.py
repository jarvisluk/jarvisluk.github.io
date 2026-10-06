"""Publish selected independent assets; keep complete extraction in content-library."""
from pathlib import Path
import json, shutil
import pymupdf as fitz
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
LIB=ROOT/'content-library/polyu-final/projects'; OUT=ROOT/'public/assets/elements'
D=json.loads((ROOT/'src/assetDimensions.json').read_text()); manifest=[]
slugs={'geo':'mirs-bay-geopark','va':'va-catering-feedback','bike':'guangzhou-ebike-parking','bambu':'bambu-lab-flagship-store','sf':'sf-express-eating-habits','paw':'pawpals-tnr','just':'just-a-2nd'}
docs={k:fitz.open(next((LIB/v/'source').glob('*.pdf'))) for k,v in slugs.items() if k!='bike'}
def save(im,id,source):
 im.thumbnail((2400,2400));im.save(OUT/f'{id}.webp',quality=92)
 D[id]={'width':im.width,'height':im.height};manifest.append({'id':id,'source':source})
def obj(k,p,n,id=None):
 page=LIB/slugs[k]/f'pages/page-{p:03}'; data=json.loads((page/'page.json').read_text()); item=data['images'][n-1];id=id or f'{k}-{p}-{n}'
 if k!='bike':
  doc=docs[k];x=item['xref'];px=fitz.Pixmap(doc,x)
  smask=next((i[1] for i in doc[p-1].get_images() if i[0]==x),0)
  if smask:px=fitz.Pixmap(px,fitz.Pixmap(doc,smask))
  if px.colorspace and px.colorspace.n>3:px=fitz.Pixmap(fitz.csRGB,px)
  im=Image.frombytes('RGBA' if px.alpha else 'RGB',(px.width,px.height),px.samples)
 else:im=Image.open(page/item['file'])
 save(im,id,str(page/item['file']));return id
# Bounded figures preserve composition only where connectors / layered mockups form one semantic object.
def figure(k,p,box,id,vector=False):
 page=docs[k][p-1];r=fitz.Rect(box)
 # MuPDF SVG export loses several PDF soft masks; rasterize those bounded figures faithfully.
 vector=vector and id in {'geo-blueprint','sf-blueprint','va-current','va-journey'}
 if vector:
  d=fitz.open();q=d.new_page(width=r.width,height=r.height);q.show_pdf_page(q.rect,docs[k],p-1,clip=r)
  (OUT/f'{id}.svg').write_text(q.get_svg_image(text_as_path=True))
  D[id+'.svg']={'width':round(r.width),'height':round(r.height)};manifest.append({'id':id+'.svg','source':slugs[k],'page':p,'clip':box})
 else:
  px=page.get_pixmap(matrix=fitz.Matrix(min(2,2400/r.width),min(2,2400/r.width)),clip=r,alpha=False)
  save(Image.frombytes('RGB',(px.width,px.height),px.samples),id,{'project':slugs[k],'page':p,'clip':box})
# New Mirs Bay case: independent landscape, storyboard panels, composited interface objects and vector systems.
obj('geo',1,1,'geo-landscape')
for p,n in [(5,1),(5,2),(6,2)]:obj('geo',p,n)
for i,x in enumerate([831,1024,1216,1409],1):figure('geo',13,[x,269,x+211,678],f'geo-create-{i}')
for i,x in enumerate([793,1279,1569],1):figure('geo',14,[x,160,x+292,742],f'geo-share-{i}')
# Extract each storyboard illustration itself; text captions are reflowed in HTML.
for i,xref in enumerate([1409,1413,1461,1433,1489,1493,1521,1525,1429,1425,1421,1417],1):
 px=fitz.Pixmap(docs['geo'],xref);save(Image.frombytes('RGB',(px.width,px.height),px.samples),f'geo-story-{i}',{'project':'geo','page':11,'xref':xref})
for p,id,box in [(10,'geo-journey',[40,110,1880,990]),(16,'geo-stakeholders',[35,165,1885,1060]),(17,'geo-loop',[35,255,1885,1060]),(18,'geo-blueprint',[30,150,1890,1060])]:figure('geo',p,box,id,True)
figure('geo',12,[765,80,1910,1060],'geo-onboarding')
figure('geo',15,[735,20,1880,1045],'geo-rewards')
# VA source contains malformed/blank pages 10–19. Never fabricate missing interfaces.
figure('va',3,[40,215,735,905],'va-observation-1')
figure('va',3,[775,215,1455,905],'va-observation-2')
figure('va',4,[1360,20,1900,410],'va-interviews')
for p,id,box in [(6,'va-current',[35,370,1870,1035]),(22,'va-journey',[35,245,1875,1030])]:figure('va',p,box,id,True)
# E-bike originals are extracted image parts from PPTX; ignore template graphics & editorial notes.
for n in [2,5,6,7,8,9,10,11,12,13,14]:obj('bike',12,n)
for n in [3,4,5,6]:obj('bike',19,n)
obj('bike',18,2,'bike-mapping')
for n in [4,5,6]:obj('bike',17,n)
# Expand Bambu research and preserve diagrams as vector figures.
for p,id,box in [(4,'bambu-stakeholders',[610,25,1730,1040]),(5,'bambu-current-1',[30,220,1885,1030]),(6,'bambu-current-2',[30,220,1885,1030]),(18,'bambu-blueprint-1',[35,180,1880,1030]),(19,'bambu-blueprint-2',[35,180,1880,1030])]:figure('bambu',p,box,id,True)
figure('bambu',8,[1300,0,1920,1040],'bambu-interviews')
# Expand SF with research and end-to-end delivery service diagrams.
figure('sf',2,[70,430,1850,680],'sf-observations')
for p,id,box in [(10,'sf-stakeholders',[920,120,1880,1055]),(15,'sf-blueprint',[55,230,1865,1035]),(16,'sf-journey',[25,170,1900,1070]),(26,'sf-delivery',[160,150,1860,1040])]:figure('sf',p,box,id,True)
# Higher clarity source diagrams replace flattened portfolio crops.
for p,id,box in [(5,'paw-stakeholders',[70,155,1870,1030]),(7,'paw-blueprint',[50,155,1870,1010]),(8,'paw-journey',[55,155,1870,1015]),(9,'paw-information',[55,155,1850,1015])]:
 page=docs['paw'][p-1];w,h=page.rect.width,page.rect.height
 figure('paw',p,[box[0]/1920*w,box[1]/1080*h,box[2]/1920*w,box[3]/1080*h],id,False)
for n in [1,2,3]:obj('just',1,n,f'just-screen-{n}')
figure('just',1,[88,167,219,298],'just-icon',True)
for id,src in [('mirs-bay','geo-landscape'),('va-feedback','va-observation-2'),('ebike-parking','bike-12-2')]:shutil.copy2(OUT/f'{src}.webp',ROOT/f'public/assets/{id}.webp')
(ROOT/'src/assetDimensions.json').write_text(json.dumps(D,ensure_ascii=False))
(ROOT/'source-assets/library-selection.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print(f'Published {len(manifest)} assets from supplemental sources')
