# Blog-Factory

Welcome to the **Blog-Factory** repository, a powerful and automated AI-driven platform designed to streamline the process of creating, optimizing, and deploying high-quality blog content. This repository leverages cutting-edge AI technologies to generate thematic content, perform on-page SEO optimization, and deploy blogs with high Domain Rank seamlessly using Netlify.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [1. Create a New Repository](#1-create-a-new-repository)
  - [2. Deploy with Netlify](#2-deploy-with-netlify)
  - [3. Modify Configuration](#3-modify-configuration)
  - [4. Update GitHub Repository Settings](#4-update-github-repository-settings)
  - [5. Generate Content](#5-generate-content)
  - [6. Register with Google Search Console](#6-register-with-google-search-console)
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

## Getting Started

Follow these steps to set up and use the **Blog-Factory**:

### 1. Create a New Repository

- Navigate to the top of **Blog-Factory** repository.
- Click the "Use this template" button to create a new repository based on this template.

### 2. Deploy with Netlify

Deploying your blog with Netlify is a straightforward process that ensures your content is live and accessible on the web with high DR(Domain Rating). Here’s how to get your site up and running:

#### Step-by-Step Deployment Guide

1. **Start the Deployment Process**:

   - Visit [Netlify](https://app.netlify.com/start) to begin.
   - Click on the "New site from Git" button on the Netlify dashboard. This starts the process to connect your GitHub repository to Netlify.

2. **Connect to GitHub**:

   - Choose "GitHub" as the platform under the section "Let’s deploy your project with…". This allows Netlify to access your repositories.
   - You'll be prompted to authorize Netlify to access your GitHub account. Follow the prompts to allow the necessary permissions.

3. **Select Your Repository**:

   - Once connected, you’ll see a list of your GitHub repositories. Select the repository you created from the **Blog-Factory** template.

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

### 3. Modify Configuration

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

4. **Site URL**: Change the `siteUrl` to match the URL provided by Netlify after deploying your site.

   Example:

   ```javascript
   siteUrl: "https://your-custom-name.netlify.app",
   ```

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

### 4. Update GitHub Repository Settings

To ensure the smooth operation of your blog's automated content generation and deployment, updating your GitHub repository settings is crucial. Here's how to configure environment variables and adjust workflow permissions.

#### Setting Up Environment Variables

Environment variables are used to securely store API keys needed for content generation and optional debugging. Here’s how to obtain and set these up:

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

By properly setting up your environment variables and workflow permissions, you ensure that your automated blog content generation and deployment processes run smoothly and securely. This setup not only optimizes your blog's operation but also safeguards your API keys and critical operations.

### 5. Generate Content

Generating new content for your blog using the **Auto Upload Contents** GitHub Action is a key feature of the Blog-Factory. This automated process not only creates content but also uploads it directly to your blog repository. Below is a detailed guide on how to use this functionality and what happens during the process.

#### Overview of the `auto-upload-contents.yaml` Action

The `auto-upload-contents.yaml` file in your repository is configured to allow manual triggering of content generation. It includes inputs for the number of posts, the topic of content, and an option to enable LangChain tracing for detailed debugging (if needed).

#### How to Use the Action

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

#### What Happens After Triggering the Action

- **Content Creation**: The specified number of blog posts on the chosen topic will be generated using AI, with SEO considerations automatically integrated.
- **Review and Deployment**: Once the content is generated and committed, it's pushed to your repository. If your repository is linked with Netlify, any new commits will trigger a deployment, updating your blog with fresh content automatically.

#### Monitoring and Managing Outputs

- **Check the `src/posts/blog` directory**: After the action completes, navigate to this directory in your repository to see the new content.
- **Review Commit History**: You can also view the commit history to see the detailed messages and changes made by the GitHub Action.

This setup not only simplifies the management of your blog content but also ensures that your blog remains dynamic and current with minimal manual intervention.

### 6. Register with Google Search Console

Registering your blog with Google Search Console is an essential step to ensure your site is indexed properly by Google, providing insights into your site’s visibility on Google search. This process also helps in monitoring, maintaining, and troubleshooting your site's presence in Google Search results. Here’s how to get your blog registered and verified with Google Search Console.

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
  - Go to the 'Sitemaps' section under ‘Index’ in the Google Search Console.
  - Submit the URL of your sitemap, which is located at `https://your-custom-name.netlify.app/sitemap-index.xml`.

- **Monitor Performance**:

  - Use the Google Search Console dashboard to monitor how your site performs in search results. Check for indexing status, search queries, the number of times your site appears in search (impressions), click-through rates, and more.

- **Resolve Issues**:
  - Google Search Console will also notify you of any issues related to indexing, mobile usability, and other search enhancements. Address these issues as they arise to maintain the health and visibility of your blog.

#### Additional Recommendations

- **Regular Checks**:

  - Regularly check Google Search Console for alerts and suggestions. Keeping your site optimized for Google’s search engine is a continuous process that can yield significant benefits over time.

- **Utilize Tools**:
  - Take advantage of the tools provided by Google Search Console to analyze and optimize your site's performance in Google Search.

By integrating your blog with Google Search Console, you not only gain critical insights into how users are finding your site but also ensure that your new content is quickly indexed and visible to your target audience. This integration is a key step towards optimizing your online presence and enhancing your site's SEO.

## Usage

Once setup is complete, your blog is almost self-sustaining. Regularly trigger the content generation action to keep your blog updated with fresh, SEO-optimized posts. Ensure that the deployment pipeline through Netlify is active to reflect changes live on your blog.

## Contribution

Contributions to **Blog-Factory** are welcome! Whether it's feature requests, bug reports, or code contributions, please feel free to make a pull request or open an issue.

---

With **Blog-Factory**, you're on your way to creating a dynamic, optimized, and highly visible blog effortlessly. Happy blogging!
