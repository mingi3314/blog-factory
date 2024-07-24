import secrets
from pathlib import Path

import requests

def generate_random_logo(seed: str, file_path: Path) -> None:
    """Generate a random logo and save it to the specified path."""
    url = f"https://robohash.org/{seed}.png"
    response = requests.get(url)
    response.raise_for_status()
    
    file_path.write_bytes(response.content)
    print(f"Logo saved to {file_path}")

def generate_random_thumbnail(width: int, height: int, file_path: Path) -> None:
    """Generate a random thumbnail and save it to the specified path."""
    url = f"https://picsum.photos/{width}/{height}"
    response = requests.get(url)
    response.raise_for_status()
    
    file_path.write_bytes(response.content)
    print(f"Thumbnail saved to {file_path}")

def main():
    logo_path = Path("src") / "images" / "icon.png"
    thumbnail_path = Path("src") / "images" / "og-thumbnail.png"

    # Ensure the directory exists
    logo_path.parent.mkdir(parents=True, exist_ok=True)
    thumbnail_path.parent.mkdir(parents=True, exist_ok=True)

    random_seed = secrets.token_hex(16)
    
    # Generate logo and thumbnail
    generate_random_logo(random_seed, logo_path)
    generate_random_thumbnail(1200, 800, thumbnail_path)

if __name__ == "__main__":
    main()