from PIL import Image, ImageFilter

src = r'C:\Users\troys\.gemini\antigravity\brain\7c869827-0e91-4d55-99ac-c6a1fffcdf5a\media__1778193060405.png'
img = Image.open(src).convert('RGB')
w, h = img.size
print(f"Image size: {w}x{h}")

# The notification box occupies roughly the center region.
box_x1 = int(w * 0.15)
box_y1 = int(h * 0.06)
box_x2 = int(w * 0.85)
box_y2 = int(h * 0.94)
print(f"Masking box: ({box_x1},{box_y1}) -> ({box_x2},{box_y2})")

# Heavily blur the whole image to get smooth background fill colors
blurred = img.filter(ImageFilter.GaussianBlur(radius=40))

# Paste the blurred center over the box region to erase UI elements
result = img.copy()
# Crop just the box area from the blurred version
box_patch = blurred.crop((box_x1, box_y1, box_x2, box_y2))
result.paste(box_patch, (box_x1, box_y1))

# Gentle final blur to feather any seam
result = result.filter(ImageFilter.GaussianBlur(radius=3))

out = r'd:\Arise\app\bg_texture.png'
result.save(out)
print(f"Saved to {out}")
