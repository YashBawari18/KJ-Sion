import math
import os
from PIL import Image, ImageDraw, ImageFont

def create_face_heavy_sample(output_path: str):
    # 1280x720 Thumbnail: High contrast, dramatic face silhouette/avatar on left, vibrant gradient, simple text
    img = Image.new("RGB", (1280, 720), color=(18, 12, 38))
    draw = ImageDraw.Draw(img)

    # Background gradient / lighting effect
    for y in range(720):
        r = int(25 + (y / 720) * 40)
        g = int(15 + (y / 720) * 20)
        b = int(55 + (y / 720) * 80)
        draw.line([(0, y), (1280, y)], fill=(r, g, b))

    # Glow orb behind face
    for rad in range(320, 0, -10):
        alpha = int(40 * (1 - rad / 320))
        draw.ellipse([(150 - rad, 360 - rad), (150 + rad, 360 + rad)], fill=(120 + alpha, 40 + alpha, 220 + alpha))

    # Face silhouette / stylized avatar (Head, eyes, open mouth shocked expression)
    # Head contour
    draw.ellipse([(120, 140), (480, 560)], fill=(245, 200, 160), outline=(255, 255, 255), width=6)
    # Hair
    draw.pieslice([(100, 100), (500, 420)], 180, 360, fill=(40, 20, 15))
    # Eyes (Shocked wide eyes)
    draw.ellipse([(200, 290), (270, 370)], fill=(255, 255, 255), outline=(30, 30, 30), width=4)
    draw.ellipse([(225, 315), (255, 345)], fill=(20, 20, 20))
    draw.ellipse([(330, 290), (400, 370)], fill=(255, 255, 255), outline=(30, 30, 30), width=4)
    draw.ellipse([(345, 315), (375, 345)], fill=(20, 20, 20))
    # Eyebrows raised
    draw.arc([(190, 250), (280, 285)], 190, 350, fill=(30, 30, 30), width=7)
    draw.arc([(320, 250), (410, 285)], 190, 350, fill=(30, 30, 30), width=7)
    # Open shocked mouth (O shape)
    draw.ellipse([(260, 420), (340, 510)], fill=(160, 30, 30), outline=(255, 255, 255), width=4)

    # Right side text banner
    draw.rectangle([(560, 200), (1200, 330)], fill=(245, 197, 24))
    draw.text((600, 230), "I TRIED THIS FOR 30 DAYS...", fill=(10, 10, 10))
    
    draw.rectangle([(560, 370), (1160, 510)], fill=(230, 40, 50))
    draw.text((600, 410), "IT ACTUALLY WORKED!", fill=(255, 255, 255))

    img.save(output_path, "JPEG", quality=95)
    print(f"Generated face sample: {output_path}")

def create_text_heavy_sample(output_path: str):
    # 1280x720 Thumbnail: Dominated by massive typography, high contrast blocks, checklist
    img = Image.new("RGB", (1280, 720), color=(10, 14, 26))
    draw = ImageDraw.Draw(img)

    # High-contrast geometric grid background
    for x in range(0, 1280, 80):
        draw.line([(x, 0), (x, 720)], fill=(20, 30, 50), width=1)
    for y in range(0, 720, 80):
        draw.line([(0, y), (1280, y)], fill=(20, 30, 50), width=1)

    # Giant badge
    draw.rectangle([(80, 60), (440, 140)], fill=(59, 130, 246))
    draw.text((110, 85), "CRITICAL MASTERCLASS", fill=(255, 255, 255))

    # Massive Headline Block 1
    draw.rectangle([(80, 180), (1200, 330)], fill=(255, 255, 255))
    draw.text((120, 215), "STOP WASTING TIME", fill=(10, 15, 30))

    # Massive Headline Block 2
    draw.rectangle([(80, 360), (1100, 510)], fill=(249, 115, 22))
    draw.text((120, 395), "BUILD 10X FASTER", fill=(255, 255, 255))

    # Sub-bullet badges at bottom
    badges = ["01. AI PIPELINE", "02. SYSTEM DESIGN", "03. DEPLOY IN 1-CLICK"]
    for i, b in enumerate(badges):
        bx = 80 + i * 380
        draw.rounded_rectangle([(bx, 560), (bx + 350, 640)], radius=12, fill=(30, 41, 59), outline=(96, 165, 250), width=2)
        draw.text((bx + 30, 588), b, fill=(240, 240, 255))

    img.save(output_path, "JPEG", quality=95)
    print(f"Generated text sample: {output_path}")

def create_product_heavy_sample(output_path: str):
    # 1280x720 Thumbnail: High-tech gadget / product center stage with sleek pedestal & glow
    img = Image.new("RGB", (1280, 720), color=(6, 8, 15))
    draw = ImageDraw.Draw(img)

    # Spotlight beam from top center
    draw.polygon([(640, 0), (200, 720), (1080, 720)], fill=(18, 26, 45))

    # Glowing pedestal
    draw.ellipse([(360, 540), (920, 680)], fill=(30, 45, 80), outline=(56, 189, 248), width=3)
    draw.ellipse([(440, 570), (840, 650)], fill=(14, 165, 233))

    # Product / Camera & Lens rendering in center
    # Main camera body
    draw.rounded_rectangle([(440, 250), (840, 520)], radius=30, fill=(28, 32, 42), outline=(100, 116, 139), width=5)
    # Camera top grip / dials
    draw.rounded_rectangle([(470, 210), (580, 255)], radius=10, fill=(45, 52, 68))
    draw.rounded_rectangle([(710, 220), (800, 255)], radius=8, fill=(45, 52, 68))
    # Red dot logo
    draw.ellipse([(470, 275), (505, 310)], fill=(225, 29, 72))
    
    # Large Camera Lens (concentric circles with reflection)
    draw.ellipse([(520, 280), (760, 520)], fill=(15, 23, 42), outline=(148, 163, 184), width=8)
    draw.ellipse([(550, 310), (730, 490)], fill=(2, 6, 23), outline=(56, 189, 248), width=6)
    draw.ellipse([(590, 350), (690, 450)], fill=(12, 74, 110), outline=(224, 242, 254), width=3)
    # Lens flare
    draw.arc([(560, 320), (720, 480)], 45, 120, fill=(255, 255, 255), width=5)

    # Top title banner
    draw.text((120, 100), "THE ULTIMATE CAMERA?", fill=(255, 255, 255))
    draw.rectangle([(120, 140), (480, 146)], fill=(56, 189, 248))

    # Feature tags
    draw.rounded_rectangle([(930, 260), (1200, 330)], radius=15, fill=(15, 23, 42), outline=(34, 197, 94), width=3)
    draw.text((955, 285), "8K RAW SENSOR", fill=(74, 222, 128))

    draw.rounded_rectangle([(930, 370), (1200, 440)], radius=15, fill=(15, 23, 42), outline=(234, 179, 8), width=3)
    draw.text((955, 395), "$1,499 FLAGSHIP", fill=(250, 204, 21))

    img.save(output_path, "JPEG", quality=95)
    print(f"Generated product sample: {output_path}")

if __name__ == "__main__":
    out_dirs = [
        "/Users/yashsunderbawari/.gemini/antigravity-ide/scratch/thumbnail-iq/backend/app/static/samples",
        "/Users/yashsunderbawari/.gemini/antigravity-ide/scratch/thumbnail-iq/frontend/public/samples"
    ]
    for d in out_dirs:
        os.makedirs(d, exist_ok=True)
        create_face_heavy_sample(os.path.join(d, "sample_face.jpg"))
        create_text_heavy_sample(os.path.join(d, "sample_text.jpg"))
        create_product_heavy_sample(os.path.join(d, "sample_product.jpg"))
