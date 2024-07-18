/* eslint-disable unicorn/prefer-top-level-await */

import fs from "node:fs"
import path from "node:path"

import axios from "axios"

// 랜덤 로고 생성 함수
async function generateRandomLogo(seed: string, filePath: string) {
  const url = `https://robohash.org/${seed}.png`
  const response = await axios.get(url, { responseType: "arraybuffer" })
  fs.writeFileSync(filePath, response.data)
  console.log(`Logo saved to ${filePath}`)
}

// 랜덤 썸네일 생성 함수
async function generateRandomThumbnail(
  width: number,
  height: number,
  filePath: string,
) {
  const url = `https://picsum.photos/${width}/${height}`
  const response = await axios.get(url, { responseType: "arraybuffer" })
  fs.writeFileSync(filePath, response.data)
  console.log(`Thumbnail saved to ${filePath}`)
}

async function main() {
  const logoPath = path.join("src", "images", "icon.png")
  const thumbnailPath = path.join("src", "images", "og-thumbnail.png")

  // 로고 및 썸네일 생성
  await generateRandomLogo("bloglogo123", logoPath)
  await generateRandomThumbnail(1200, 800, thumbnailPath)
}

main().catch(error => console.error(error))
