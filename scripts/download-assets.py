import json
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

BASE_URL = "https://hoanganweb.id.vn"
ROOT = Path(r"D:\Dev\Projects\Github\shop-minh-anh")
RAW_DIR = ROOT / "docs" / "research" / "raw_assets"
PUBLIC_DIR = ROOT / "public"

def collect_urls():
    urls = set()
    pattern = re.compile(r"/men-design/assets/[^\s\"')<>]+")
    html = (ROOT / "docs" / "research" / "source.html").read_text(encoding="utf-8", errors="ignore")
    urls.update(pattern.findall(html))

    for cf in ["5ca178d57c6f-css2.css", "app.css", "banners.css"]:
        p = RAW_DIR / cf
        if p.exists():
            urls.update(pattern.findall(p.read_text(encoding="utf-8", errors="ignore")))

    cat = json.loads((RAW_DIR / "catalog.json").read_text(encoding="utf-8"))
    for prod in cat.get("products", []):
        for img in prod.get("images", []):
            src = img.get("src", "")
            if src.startswith("/men-design/assets/"):
                urls.add(src)
        for v in prod.get("variants", []):
            src = v.get("image", "")
            if src.startswith("/men-design/assets/"):
                urls.add(src)

    clean = sorted({u.split("?")[0] for u in urls if not u.endswith((".css", ".js"))})
    return clean

def download_one(path_str: str):
    rel = path_str.replace("/men-design/", "")
    dest = PUBLIC_DIR / rel
    if dest.exists() and dest.stat().st_size > 0:
        return (path_str, "cached")
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(BASE_URL + path_str, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        dest.write_bytes(resp.read())
    return (path_str, "downloaded")

def main():
    urls = collect_urls()
    print(f"Found {len(urls)} assets.")
    ok = 0
    failed = []
    with ThreadPoolExecutor(max_workers=8) as ex:
        futs = {ex.submit(download_one, u): u for u in urls}
        for fut in as_completed(futs):
            u = futs[fut]
            try:
                _, status = fut.result()
                ok += 1
            except Exception as e:
                failed.append((u, str(e)))
    print(f"Done: {ok}/{len(urls)} ok, {len(failed)} failed.")
    for u, err in failed[:10]:
        print("FAILED:", u, err)

if __name__ == "__main__":
    main()
