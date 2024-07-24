# Logging setup
import logging
import random
from datetime import datetime
from pathlib import Path
from typing import TypedDict

import requests
import typer
from langchain.prompts import PromptTemplate
from langchain_core.language_models import BaseChatModel
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from langchain_mistralai import ChatMistralAI

# Constants moved to a separate config.py file
from scripts.config import (
    BACKGROUND_COLORS,
    TEXT_COLOR,
    THUMBNAIL_HEIGHT,
    THUMBNAIL_WIDTH,
)
from scripts.prompts.content_creator import prompt as content_creator_prompt
from scripts.prompts.meta_generator import prompt as meta_generator_prompt
from scripts.prompts.outline_builder import prompt as outline_builder_prompt

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


class MetaItem(TypedDict):
    title: str
    description: str


# Type definitions
class Meta(TypedDict):
    meta: MetaItem


app = typer.Typer()


def generate_outline(model: BaseChatModel, topic: str) -> str:
    logger.info("Generating outline...")

    prompt = PromptTemplate.from_template(outline_builder_prompt)
    output_parser = StrOutputParser()

    chain = prompt | model | output_parser

    try:
        outline = chain.invoke(input={"Topic": topic})
        logger.info("Outline generated successfully.")
        return outline
    except Exception as e:
        logger.error(f"Error generating outline: {e}")
        raise


def generate_content(model: BaseChatModel, outline: str) -> str:
    logger.info("Generating content based on the outline...")

    prompt = PromptTemplate.from_template(content_creator_prompt)
    output_parser = StrOutputParser()
    chain = prompt | model | output_parser

    try:
        content = chain.invoke(input={"Outline": outline})
        logger.info("Content generated successfully.")
        return content
    except Exception as e:
        logger.error(f"Error generating content: {e}")
        raise


def generate_meta(model: BaseChatModel, outline: str) -> Meta:
    logger.info("Generating meta data based on the outline...")

    prompt = PromptTemplate.from_template(meta_generator_prompt)
    output_parser = JsonOutputParser()
    chain = prompt | model | output_parser

    try:
        meta = chain.invoke(input={"Outline": outline})
        logger.info("Meta data generated successfully.")
        return meta
    except Exception as e:
        logger.error(f"Error generating meta data: {e}")
        raise


def generate_placeholder_thumbnail(file_name: str) -> Path:
    text = file_name.replace("-", " ")
    background_color = random.choice(BACKGROUND_COLORS)
    url = f"https://dummyimage.com/{THUMBNAIL_WIDTH}x{THUMBNAIL_HEIGHT}/{background_color}/{TEXT_COLOR}.png&text={text}"

    try:
        response = requests.get(url)
        response.raise_for_status()
        content = response.content
    except requests.RequestException as e:
        logger.error(f"Error fetching thumbnail: {e}")
        raise

    thumbnail_path = Path("src") / "posts" / "blog" / "images" / f"{file_name}.png"
    thumbnail_path.parent.mkdir(parents=True, exist_ok=True)

    try:
        thumbnail_path.write_bytes(content)
        logger.info(f"Thumbnail generated: {thumbnail_path}")
        return thumbnail_path
    except OSError as e:
        logger.error(f"Error writing thumbnail file: {e}")
        raise


def create_markdown_file(content: str, meta: Meta) -> None:
    current_date = datetime.now().strftime("%Y-%m-%d %H:%M")
    file_name = meta["meta"]["title"].replace(" ", "-").replace(":", "-").lower()

    try:
        thumbnail_path = generate_placeholder_thumbnail(file_name)
        relative_thumbnail_path = thumbnail_path.relative_to(
            Path("src") / "posts" / "blog"
        ).as_posix()

        file_path = Path("src") / "posts" / "blog" / f"{file_name}.md"

        markdown_content = f"""---
title: {meta["meta"]["title"].replace(":", "-")}
category: "constant"
date: {current_date} +09:00
desc: {meta["meta"]["description"].replace(":", "-")}
thumbnail: "./{relative_thumbnail_path}"
alt: "Thumbnail for {meta["meta"]["title"]}"
---

{content}"""

        file_path.parent.mkdir(parents=True, exist_ok=True)
        file_path.write_text(markdown_content, encoding="utf-8")

        logger.info(f"Markdown file created: {file_path}")
    except Exception as e:
        logger.error(f"Error creating markdown file: {e}")
        raise


def generate_single_content(model: BaseChatModel, topic: str) -> None:
    try:
        outline = generate_outline(model, topic)
        content = generate_content(model, outline)
        meta = generate_meta(model, outline)
        create_markdown_file(content, meta)
    except Exception as e:
        logger.error(f"Error in content generation pipeline: {e}")


@app.command()
def main(
    n_content: int = typer.Option(
        1, "--n-content", "-n", help="Number of content pieces to generate"
    ),
    topic: str = typer.Option(
        "stock-trading", "--topic", "-t", help="Topic for content generation"
    ),
) -> None:
    model = ChatMistralAI(model_name="open-mixtral-8x7b", temperature=0.8)

    for i in range(n_content):
        logger.info(f"Generating content {i + 1} of {n_content}...")
        generate_single_content(model, topic)

    logger.info("Content generation complete.")


if __name__ == "__main__":
    app()
