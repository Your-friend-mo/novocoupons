import os
import re
import json

BASE_DIR = r"c:\Users\m\Documents\novocoupons"
PRODUCTS_DIR = os.path.join(BASE_DIR, "products")

with open(os.path.join(BASE_DIR, "assets_mirror", "coupons_data.json"), "r", encoding="utf-8") as f:
    coupons = json.load(f)

checks = [
    ("index.html", "novocoupons"),
    ("novocoupons.com.html", "novocoupons.com"),
    ("novocoupons.con.html", "novocoupons.con"),
    ("novocoupon.html", "novocoupon"),
    ("novocoupons-com.html", "novocoupons com"),
    ("https-novocoupons-com.html", "https novocoupons com"),
    ("novocoupon-com.html", "novocoupon com"),
    ("novocoupon.com.html", "novocoupon.com"),
]

passed = 0
failed = 0

print("=== VERIFYING LANDING PAGES ===")
for fn, kw in checks:
    fp = os.path.join(BASE_DIR, fn)
    if not os.path.exists(fp):
        print(f"[FAIL] Missing {fn}")
        failed += 1
        continue
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
    pattern = re.compile(re.escape(kw), re.IGNORECASE)
    cnt = len(pattern.findall(content))
    if cnt == 30:
        print(f"[PASS] {fn}: '{kw}' found {cnt}/30 times")
        passed += 1
    else:
        print(f"[FAIL] {fn}: '{kw}' found {cnt}/30 times (Expected 30)")
        failed += 1

print(f"\n=== VERIFYING {len(coupons)} PRODUCT PAGES ===")
for cid, c in coupons.items():
    title = c.get('coupon_title', '').strip()
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', title.lower()).strip('-') + '-coupon.html'
    fp = os.path.join(PRODUCTS_DIR, slug)
    if not os.path.exists(fp):
        print(f"[FAIL] Missing product file: {slug}")
        failed += 1
        continue
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
    pattern = re.compile(re.escape(title), re.IGNORECASE)
    cnt = len(pattern.findall(content))
    if cnt == 30:
        passed += 1
    else:
        print(f"[FAIL] {slug}: '{title}' found {cnt}/30 times (Expected 30)")
        failed += 1

print(f"\n==========================================")
print(f"Verification Results: {passed} PASSED, {failed} FAILED.")
print(f"==========================================")
assert failed == 0, f"{failed} files failed verification!"
print("ALL 68 PAGES 100% VERIFIED WITH EXACTLY 30 KEYWORD OCCURRENCES!")
