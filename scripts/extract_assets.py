from pathlib import Path
import pymupdf as fitz
from PIL import Image
import shutil
source=Path('/Users/junrong/Library/CloudStorage/SynologyDrive-DS920/个人资料/作品集/陆俊荣作品集.pdf')
doc=fitz.open(source)
out=Path('public/assets')
def render(page, target, width=1600, rect=None):
 p=doc[page-1]; r=fitz.Rect(rect) if rect else p.rect
 pix=p.get_pixmap(matrix=fitz.Matrix(width/r.width,width/r.width),clip=r,alpha=False)
 Image.frombytes('RGB',(pix.width,pix.height),pix.samples).save(out/target,'WEBP',quality=88)
for page,name,rect in [(20,'soundbricks',(0,0,1020,900)),(51,'pawpals',(32,200,1250,890)),(3,'sf-eats',(925,72,1882,1008)),(11,'bambu',(614,133,1382,644)),(28,'flexbench',(0,0,1125,900)),(36,'matrix',(0,0,1160,900)),(19,'just-a-2nd',(640,125,1900,925))]: render(page,name+'.webp',1600,rect)
shutil.copy2(source,out/'jarvis-luk-portfolio.pdf')
print('Rendered 7 homepage covers and copied the original PDF.')
