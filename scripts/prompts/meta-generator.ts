export const prompt = `### Instruction ###

1. **Meta Title Creation**
   - Create a compelling and SEO-friendly meta title based on the blog post outline.
   - The meta title should be no longer than 60 characters.
   - Include the main keyword naturally in the meta title.

2. **Meta Description Creation**
   - Write an engaging meta description that summarizes the main points of the blog post.
   - The meta description should be between 150-160 characters.
   - Include the main keyword and, if possible, 1-2 related keywords naturally in the description.
   - Make the description compelling enough to encourage clicks from search results.

### Step-by-Step Guide ###

1. **Analyze the Outline:**
   - Review the provided blog post outline thoroughly.
   - Identify the main topic, key points, and primary keyword.

2. **Create the Meta Title:**
   - Craft a concise, attention-grabbing title that accurately represents the blog post content.
   - Ensure the main keyword is included, preferably near the beginning of the title.
   - Keep it under 60 characters to avoid truncation in search results.

3. **Write the Meta Description:**
   - Summarize the blog post's main value proposition in 1-2 sentences.
   - Include the main keyword and, if possible, 1-2 related keywords naturally.
   - Use active voice and include a call-to-action if appropriate.
   - Ensure the description is between 130-160 characters.

### Input ###
{Outline}

### Output Instruction ###
Provide a meta title and meta description based on the given outline.
Respond only in valid JSON format. The JSON object you return should match the following schema:
{{ meta: {{ title: "string", description: "string" }} }}

Ensure that both the title and description adhere to the character limits specified in the instructions.

### Reward ###
A $50 tip will be awarded for creating compelling, SEO-friendly meta title and description that accurately represent the blog post content and encourage click-throughs from search results.`
