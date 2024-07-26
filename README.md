# Blog-Factory

Welcome to the **Blog-Factory** repository, a powerful and automated AI-driven platform designed to streamline the process of creating, optimizing, and deploying high-quality blog content. This repository leverages cutting-edge AI technologies to generate thematic content, perform on-page SEO optimization, and deploy blogs with high Domain Rank seamlessly using Netlify.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [1. Create a New Repository](#1-create-a-new-repository)
  - [2. Modify Configuration](#2-modify-configuration)
  - [3. Update GitHub Repository Settings](#3-update-github-repository-settings)
  - [4. Initialize Images](#4-initialize-images)
  - [5. Generate Content](#5-generate-content)
  - [6. Deploy with Netlify](#6-deploy-with-netlify)
  - [7. Register with Google Search Console](#7-register-with-google-search-console)
- [Usage](#usage)
- [Contribution](#contribution)

## Features

**Blog-Factory** offers a comprehensive suite of features to enhance your blogging experience:

- **Automated Content Creation**: Specify the theme and desired number of articles, and let AI handle the generation of engaging content.
- **On-page SEO Optimization**:
  - AI-driven identification of high-volume, low-competition topics.
  - Automatic SEO optimization for article structures and outlines.
  - Generation of SEO-optimized meta titles and descriptions.
  - Creation of rich, optimized JsonLd Schema for better indexing.
  - Automatic thumbnail creation for each article.
  - Automatic sitemap generation.
- **Easy Deployment**: Utilizes Netlify for deploying blogs with high Domain Rank, ensuring better visibility and reach.
- **Automated Image Generation**: Capability to generate a logo and thumbnails for your blog automatically.
- **Scheduled Posting**: Option to enable automatic, scheduled content generation and posting.

## Getting Started

Follow these steps to set up and use the **Blog-Factory**:

### 1. Create a New Repository

- Navigate to the top of **Blog-Factory** repository.
- Click the "Use this template" button to create a new repository based on this template.

### 2. Modify Configuration

Configuring your site correctly is essential to ensure it reflects your brand and functions as expected. This step involves updating the `gatsby-meta-config.js` file in your repository to tailor the metadata for your blog. Follow these detailed instructions to update your configuration effectively:

#### Configuration File Location

- The `gatsby-meta-config.js` file is located in the root of your repository. Open this file to begin making the necessary changes to the `metaConfig` object.

#### Original Configuration

The default configuration in the `gatsby-meta-config.js` file looks like this:

```javascript
...

const metaConfig = {
  //TODO: Change the values below according to your project
  title: "blog-stream",
  description: "Blog that uploads useful contents.",
  author: "mingi3314",
  siteUrl: "https://blog-stream.netlify.app",
  lang: "en-US",
  utterances: "",
  links: {},
  favicon: "src/images/icon.png",
}

...
```

#### Step-by-Step Modification Guide

1. **Title**: Change the `title` property to the name of your blog. This title will appear in web browser tabs and when shared on social media.

   Example:

   ```javascript
   title: "Your Blog Title",
   ```

2. **Description**: Update the `description` with a brief summary of what your blog offers. This description helps with SEO and user understanding when your site appears in search results.

   Example:

   ```javascript
   description: "Insightful articles on AI, technology, and more.",
   ```

3. **Author**: Replace `author` with your or your organization's name. This information may appear in various places across your site.

   Example:

   ```javascript
   author: "Your Name or Organization",
   ```

4. **Site URL**: Set the siteUrl to your intended domain name. This should be the URL you plan to use on Netlify.

   Example:

   ```javascript
   siteUrl: "https://your-custom-name.netlify.app",
   ```

   **Important Notes**:

   - Before finalizing this URL, check if it's available on Netlify by attempting to access it in your browser. If it's already in use, you'll need to choose a different URL.
   - Make sure to use the same URL when deploying your site on Netlify later. This ensures consistency between your configuration and the actual deployed site.
   - If you need to change this URL later, remember to update it both in this configuration file and on Netlify to keep everything synchronized.

5. **Language**: Adjust the `lang` attribute if necessary, to specify the primary language of your site's content.

   Example:

   ```javascript
   lang: "en-US",
   ```

6. **Favicon**(Optional): If you have a custom favicon, replace the path to point to your new icon file.

   Example:

   ```javascript
   favicon: "src/images/your-icon.png",
   ```

#### Saving Changes

- After making these changes, save the file and commit it to your repository. This ensures that the next build of your site reflects these new settings.

By carefully updating these settings, you'll enhance your blog's identity and ensure it operates smoothly with accurate metadata. This step is crucial for establishing a professional presence and optimizing your site's performance across search engines and social platforms.

### 3. Update GitHub Repository Settings

To ensure the smooth operation of your blog's automated content generation and deployment, updating your GitHub repository settings is crucial. Here's how to configure environment variables, adjust workflow permissions, and set up scheduled posting.

#### Setting Up Environment Variables

Environment variables are used to securely store API keys needed for content generation and optional debugging. Here's how to obtain and set these up:

1. **MISTRAL_API_KEY**
   - **Purpose**: Used for generating content using the `open-mistral-8x7b` model via Langchain.
   - **Obtaining the API Key**:
     - Visit [Mistral API Keys](https://console.mistral.ai/api-keys/).
     - Click on `Create new key` to generate a new API key.
     - New users receive $5 in credits, which can be used to test and deploy your blog.
2. **LANGCHAIN_API_KEY** (Optional)
   - **Purpose**: Enables the LangChain debugging feature via Langsmith, useful for tracking and debugging LangChain operations.
   - **Obtaining the API Key**:
     - Visit [Langsmith](https://smith.langchain.com) for more details and to get your API key if you choose to enable this feature.

#### Adding Environment Variables to Your Repository

- **Accessing Repository Settings**:
  - Navigate to your repository on GitHub.
  - Go to `Settings` > `Secrets and variables` > `Actions`.
- **Adding New Secrets**:
  - Click `New repository secret`.
  - Name your secret `MISTRAL_API_KEY` and enter the API key you obtained from Mistral.
  - Repeat the process for `LANGCHAIN_API_KEY` if you are using Langsmith.
- **Save Changes**:
  - After entering the keys, save the changes to securely store these secrets for use in GitHub Actions.

#### Modifying Workflow Permissions

To commit generated content back to the main branch, the GitHub Actions workflows need appropriate permissions.

- **Accessing Workflow Permissions**:
  - In your repository settings, navigate to `Actions` > `General`.
- **Adjusting Permissions**:
  - Scroll to `Workflow permissions`.
  - Change from `Read repository contents permission` to `Read and write permissions`.
- **Confirm Changes**:
  - Save your changes to ensure that GitHub Actions can commit changes to your repository.

#### Setting Up Scheduled Posting

To enable automatic, scheduled content generation and posting, you need to configure additional repository variables:

1. **ENABLE_SCHEDULED_POSTING**
   - Set this to `true` to enable scheduled posting.
2. **SCHEDULED_POST_COUNT**
   - Specify the number of posts to generate in each scheduled run.
3. **SCHEDULED_POST_TOPIC**
   - Define the topic or theme for the scheduled posts.

To set these variables:

- Go to `Settings` > `Secrets and variables` > `Actions`.
- Click on `New repository variable` for each of the above.
- Enter the variable name and its value, then save.

By properly setting up your environment variables, workflow permissions, and scheduled posting configuration, you ensure that your automated blog content generation and deployment processes run smoothly and securely. This setup not only optimizes your blog's operation but also safeguards your API keys and critical operations while allowing for regular, automated content updates.

### 4. Initialize Images

Blog-Factory provides an automated way to generate a logo and thumbnails for your blog. This feature can be accessed through the GitHub Actions workflow.

To initialize images for your blog:

1. Navigate to the "Actions" tab in your GitHub repository.
2. Find the "Initialize images" workflow.
3. Click on "Run workflow".
4. Confirm the action to start the image generation process.

Once complete, the workflow will have generated and committed:

- A logo for your blog
- Default thumbnails for your blog posts

These images will be automatically used in your blog's design and for new posts. You can always replace these with custom images later if desired.

### 5. Generate Content

Blog-Factory offers two methods for generating content: manual triggering and automated scheduled posting. Both methods utilize the power of AI to create SEO-optimized blog posts on your specified topics.

#### Manual Content Generation

You can manually trigger content generation using the **Auto Upload Contents** GitHub Action. Here's how to use this functionality:

1. **Navigate to the Actions Tab**:

   - Go to the "Actions" tab in your GitHub repository.

2. **Manual Trigger**:

   - Find the **Auto Upload Contents** workflow.
   - Click on "Run workflow".
   - Fill in the parameters:
     - `Number of posts to generate and upload` (e.g., 5).
     - `Topic for content generation` (e.g., Technology).
     - `Enable LangChain tracing` (true or false, depending on your debugging needs).

3. **Start the Generation**:
   - Click the "Run workflow" button to start the content generation process.

#### Automated Scheduled Posting

If you've enabled automated scheduled posting in your repository settings, Blog-Factory will automatically generate and post content on a regular basis. Here's how it works:

1. **Scheduling**: The system uses the GitHub Actions scheduler to run the content generation process at predetermined intervals (e.g., daily, weekly).

2. **Content Generation**: During each scheduled run, the system will:

   - Generate the number of posts specified in the `SCHEDULED_POST_COUNT` variable.
   - Use the topic defined in the `SCHEDULED_POST_TOPIC` variable for content creation.

3. **Posting**: The generated content is automatically committed to your repository and, if Netlify is set up, deployed to your live blog.

#### What Happens After Content Generation

Regardless of whether content is generated manually or through scheduled posting:

- **Content Creation**: The specified number of blog posts on the chosen topic will be generated using AI, with SEO considerations automatically integrated.
- **Review and Deployment**: Once the content is generated and committed, it's pushed to your repository. If your repository is linked with Netlify, any new commits will trigger a deployment, updating your blog with fresh content automatically.

#### Monitoring and Managing Outputs

- **Check the `src/posts/blog` directory**: After the action completes, navigate to this directory in your repository to see the new content.
- **Review Commit History**: You can also view the commit history to see the detailed messages and changes made by the GitHub Action.
- **Quality Control**: While the AI-generated content is designed to be high-quality and SEO-optimized, it's a good practice to review and potentially edit the posts before they go live, especially for the scheduled posts.

This setup not only simplifies the management of your blog content but also ensures that your blog remains dynamic and current with minimal manual intervention. The combination of manual and automated posting gives you flexibility in managing your content strategy while maintaining a consistent publishing schedule.

### 6. Deploy with Netlify

Deploying your blog with Netlify is a straightforward process that ensures your content is live and accessible on the web with high DR(Domain Rating). Here's how to get your site up and running:

#### Step-by-Step Deployment Guide

1. **Start the Deployment Process**:

   - Visit [Netlify](https://app.netlify.com/start) to begin.
   - Click on the "New site from Git" button on the Netlify dashboard. This starts the process to connect your GitHub repository to Netlify.

2. **Connect to GitHub**:

   - Choose "GitHub" as the platform under the section "Let's deploy your project with…". This allows Netlify to access your repositories.
   - You'll be prompted to authorize Netlify to access your GitHub account. Follow the prompts to allow the necessary permissions.

3. **Select Your Repository**:

   - Once connected, you'll see a list of your GitHub repositories. Select the repository you created from the **Blog-Factory** template.

4. **Configure Your Site**:
   - **Site Name**: Assign a custom name to your site under the "Site settings" option. This name will be part of your blog's URL (e.g., your-custom-name.netlify.app).
   - **Build Settings**: Netlify automatically detects the necessary build settings from your repository.
5. **Deploy Your Site**:
   - Click the "Deploy site" button. Netlify will begin the process of building and deploying your site.
   - This process might take a few minutes. Once done, Netlify will provide you with a URL where your deployed site is accessible.

#### Monitoring Deployment

- **Netlify Dashboard**: After deployment, you can monitor the status and manage your site directly from the Netlify dashboard.
- **Continuous Deployment**: Any future changes pushed to your GitHub repository will automatically trigger a new build and deployment, ensuring your blog is always up-to-date.

By following these steps, your blog will be live and accessible through Netlify, benefiting from its robust CDN, automatic SSL, and more, ensuring a smooth and secure user experience.

### 7. Register with Google Search Console

Registering your blog with Google Search Console is an essential step to ensure your site is indexed properly by Google, providing insights into your site's visibility on Google search. This process also helps in monitoring, maintaining, and troubleshooting your site's presence in Google Search results. Here's how to get your blog registered and verified with Google Search Console.

#### Steps to Register Your Blog

1. **Access Google Search Console**:

   - Visit [Google Search Console](https://search.google.com/search-console/about) and sign in with your Google account.

2. **Add a Property**:

   - Click on 'Add Property' in the Search Console home page.
   - Choose 'URL prefix' as the method to add your blog because it allows for easier verification.
   - Enter the complete URL of your blog as it appears in the browser (e.g., `https://your-custom-name.netlify.app`).

3. **Verify Ownership**:

   - Google provides several methods to verify ownership of a website. The recommended method for Netlify-hosted sites is the HTML file upload:
     - Download the HTML verification file provided by Google.
     - Place this file in the `static` folder of your Gatsby project. This folder directly maps to your site's root directory on deployment.
     - Commit and push this change to your repository. Netlify will automatically deploy this update.

4. **Confirm Verification**:
   - Go back to Google Search Console and click 'Verify' next to your uploaded HTML file method.
   - If everything is configured correctly, Google will confirm that you are now verified.

#### Post-Verification Steps

- **Sitemap Submission**:

  - Submitting a sitemap is crucial for helping Google understand the structure of your site, which enhances the indexing of your pages. Since your blog automatically generates a sitemap upon deployment, you'll need to submit this to Google.
  - Go to the 'Sitemaps' section under 'Index' in the Google Search Console.
  - Submit the URL of your sitemap, which is located at `https://your-custom-name.netlify.app/sitemap-index.xml`.

- **Monitor Performance**:

  - Use the Google Search Console dashboard to monitor how your site performs in search results. Check for indexing status, search queries, the number of times your site appears in search (impressions), click-through rates, and more.

- **Resolve Issues**:
  - Google Search Console will also notify you of any issues related to indexing, mobile usability, and other search enhancements. Address these issues as they arise to maintain the health and visibility of your blog.

#### Additional Recommendations

- **Regular Checks**:

  - Regularly check Google Search Console for alerts and suggestions. Keeping your site optimized for Google's search engine is a continuous process that can yield significant benefits over time.

- **Utilize Tools**:
  - Take advantage of the tools provided by Google Search Console to analyze and optimize your site's performance in Google Search.

By integrating your blog with Google Search Console, you not only gain critical insights into how users are finding your site but also ensure that your new content is quickly indexed and visible to your target audience. This integration is a key step towards optimizing your online presence and enhancing your site's SEO.

## Usage

Once setup is complete, your blog is almost self-sustaining. You can:

1. Regularly trigger the content generation action to keep your blog updated with fresh, SEO-optimized posts.
2. Use the scheduled posting feature for automatic, regular updates.
3. Monitor your blog's performance through Google Search Console.
4. Make manual edits or additions to your content as needed.

Ensure that the deployment pipeline through Netlify is active to reflect changes live on your blog.

## Contribution

Contributions to **Blog-Factory** are welcome! Whether it's feature requests, bug reports, or code contributions, please feel free to make a pull request or open an issue.

---

With **Blog-Factory**, you're on your way to creating a dynamic, optimized, and highly visible blog effortlessly. Happy blogging!
