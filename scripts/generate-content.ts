/* eslint-disable unicorn/prefer-top-level-await */
import fs from "node:fs"
import path from "node:path"

import type { BaseChatModel } from "@langchain/core/language_models/chat_models"
import {
  JsonOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers"
import { PromptTemplate } from "@langchain/core/prompts"
import { RunnableSequence } from "@langchain/core/runnables"
import { ChatMistralAI } from "@langchain/mistralai"
import axios from "axios"
import dotenv from "dotenv"
import yargs from "yargs"

import { prompt as contentCreatorPrompt } from "./prompts/content-creator"
import { prompt as metaGeneratorPrompt } from "./prompts/meta-generator"
import { prompt as outlineBuilderPrompt } from "./prompts/outline-builder"

dotenv.config()

const argv = yargs(process.argv.slice(2))
  .option("n-content", {
    alias: "n",
    describe: "Number of content pieces to generate",
    type: "number",
    default: 1,
  })
  .option("topic", {
    alias: "t",
    describe: "Topic for content generation",
    type: "string",
    default: "stock-trading", // TODO: Change the default topic
  })
  .parseSync()

const BACKGROUND_COLORS = [
  "3498db",
  "2ecc71",
  "e74c3c",
  "f39c12",
  "9b59b6",
  "1abc9c",
  "d35400",
  "c0392b",
  "16a085",
  "2980b9",
  "8e44ad",
  "2c3e50",
]

const THUMBNAIL_WIDTH = 1200
const THUMBNAIL_HEIGHT = 630
const TEXT_COLOR = "ffffff"

type Meta = {
  meta: {
    title: string
    description: string
  }
}

async function main() {
  const count = argv["n-content"]
  const topic = argv["topic"]

  const model = new ChatMistralAI({
    model: "open-mixtral-8x7b",
    temperature: 0.8,
  })

  for (let i = 0; i < count; i++) {
    try {
      console.log(`Generating content ${i + 1} of ${count}...`)

      const outline = await generateOutline(model, topic)
      const content = await generateContent(model, outline)
      const meta = await generateMeta(model, outline)

      await createMarkdownFile(content, meta)
    } catch (error) {
      console.error("An error occurred:", error)
      console.error("Skipping to the next content generation...")
    }

    console.log("Content generation complete. Moving to the next content...")
  }
}

// Helper functions with improved error handling and typing
async function generateOutline(
  model: BaseChatModel,
  topic: string,
): Promise<string> {
  console.log("Generating outline...")
  const outlineBuildChain = RunnableSequence.from([
    PromptTemplate.fromTemplate(outlineBuilderPrompt),
    model,
    new StringOutputParser(),
  ])
  const outline = await outlineBuildChain.invoke({ Topic: topic })
  console.log("Outline generated.")
  return outline
}

async function generateContent(
  model: BaseChatModel,
  outline: string,
): Promise<string> {
  console.log("Generating content based on the outline...")
  const contentCreateChain = RunnableSequence.from([
    PromptTemplate.fromTemplate(contentCreatorPrompt),
    model,
    new StringOutputParser(),
  ])
  const content = await contentCreateChain.invoke({ Outline: outline })
  console.log("Content generated.")
  return content
}

async function generateMeta(
  model: BaseChatModel,
  outline: string,
): Promise<Meta> {
  console.log("Generating meta data based on the outline...")
  const metaGenerateChain = RunnableSequence.from([
    PromptTemplate.fromTemplate(metaGeneratorPrompt),
    model,
    new JsonOutputParser(),
  ])

  const meta = await metaGenerateChain.invoke({ Outline: outline })
  console.log("Meta data generated.")
  return meta as Meta
}

async function generatePlaceholderThumbnail(fileName: string): Promise<string> {
  const text = fileName.replaceAll("-", " ")
  const backgroundColor =
    BACKGROUND_COLORS[Math.floor(Math.random() * BACKGROUND_COLORS.length)]

  const url = `https://dummyimage.com/${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}/${backgroundColor}/${TEXT_COLOR}.png&text=${encodeURIComponent(text)}`

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  })

  const thumbnailPath = path.join(
    "src",
    "posts",
    "blog",
    "images",
    `${fileName}.png`,
  )
  const writer = fs.createWriteStream(thumbnailPath)

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(thumbnailPath))
    writer.on("error", reject)
  })
}

async function createMarkdownFile(content: string, meta: Meta): Promise<void> {
  const currentDate = new Date()
    .toLocaleString("en-US", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/(\d+)\/(\d+)\/(\d+),/, "$3-$1-$2")

  const fileName = meta.meta.title
    .replaceAll(/\s+/g, "-")
    .replaceAll(":", "-")
    .toLowerCase()

  const thumbnailPath = await generatePlaceholderThumbnail(fileName)
  const relativeThumbnailPath = path
    .relative(path.join("src", "posts", "blog"), thumbnailPath)
    .replaceAll("\\", "/")

  const filePath = path.join("src", "posts", "blog", `${fileName}.md`)

  const markdownContent = `---
title: ${meta.meta.title.replaceAll(":", "-")}
category: "constant"
date: ${currentDate} +09:00
desc: ${meta.meta.description.replaceAll(":", "-")}
thumbnail: "./${relativeThumbnailPath}"
alt: "Thumbnail for ${meta.meta.title}"
---

${content}`

  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, markdownContent)

  console.log(`Markdown file created: ${filePath}`)
}

main().catch(error => console.error("An error occurred:", error))
