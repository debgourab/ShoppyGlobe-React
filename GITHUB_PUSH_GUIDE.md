# GitHub Push Guide

## 1. Create the repository

Create a new empty GitHub repository for the ShoppyGlobe project. Do not add a README, license, or `.gitignore` from GitHub because this project already contains those files.

## 2. Verify the assignment history

Run:

```bash
git rev-list --count HEAD
git log --oneline --reverse
```

The supplied project already contains more than 25 relevant commits.

## 3. Connect the local repository

Replace the placeholder URL with your own GitHub repository URL:

```bash
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git branch -M main
git push -u origin main
```

## 4. Verify on GitHub

Open the repository's **Commits** page and confirm that the commit history contains the individual project milestones. Avoid squashing the commits into one commit before submission.
