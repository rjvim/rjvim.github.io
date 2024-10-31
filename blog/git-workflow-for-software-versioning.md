---
title: "Git Workflow for Versioning & Releases"
date: "2020-06-03"
---

## About

Developers regularly use Git, but also run into the general use-case of how to maintain versioning of their codebase and how to deploy.

<!-- truncate -->

You might have come across the Feature Branch Workflow, which is what the flow I am going to talk about is based on. However, the feature branch workflow didn't entirely solve my problem, so I am writing it down again for reference. This is not just for teams, but also solo developers.

## Versioning

The typical way to version software is using x.y.z (SemVer), and we will continue using the same. But "version" is too broad a word to oversimplify. Are we strictly referring to codebase version? When we publish a mobile app to Android or iOS, it insists on a version - are we discussing that version? We will discuss both - otherwise, the problem is not solved much.

The core problem is actually created by Git itself. The way it works is, you change any file, you need to make a commit. Once you commit, the code has moved ahead. Git gives a way to tag the codebase with a version - and because of that, we end up with various scenarios which we didn't predict.

You might have run your software development without even using versions - and it does have its effect. You just are not able to talk in terms of releases anymore! You need some convention to talk about a release. When what you actually release is a codebase, why not use the same SemVer! We will do the same.

## Concepts

I want to guide this process with an example to make it much more efficient.

### Concept 1

Once you create a Git repo, you are usually blessed with a `main` branch. Fixate that you will never push code directly to `main`

### Concept 2

You need to take a `develop` branch from `main`, and this is the branch where you develop.

There are two types of branches you should use:

- `feature` branch: This is where you develop a feature, big or small, it has an impact on the product.
- `hotfix` branch: This is where you fix bugs or do some tweaking.

### Concept 3

When you deploy code to customers, you and your customer both should be able to determine easily which version of code/software they are using. This customer might be external, internal like QA.

## Developing a Feature(s)

Let's assume your current software version is 1.2.0, and now you want to make a release: 1.3.0. What are you going to release in 1.3.0? A few features! It's not essential that you develop a single feature in every release. Now, as that confusion is out of the way, your team has a great way to align: what is the team working on? "Release 1.3.0" - What goes into it? A, B, C, D!

### Step 1: Make a feature branch

For each feature, you would be taking out a feature branch. Let's say the feature is "Change Signup Page".

```bash
// Create a new branch from develop
git checkout -b feature/change-signup-page develop
```

### Step 2: Merge feature branch to develop

What? Merge? Obviously, you have done whatever development you need to for the feature, and now you are ready to merge.

Usually, to merge, you would be raising a PR and going through the entire code reviewing process with +2 upvotes minimum, but generally you will end up merging the feature branch to the develop branch.

```bash
git checkout develop
git merge feature/change-signup-page
```

### Step 3: Create a Release Branch & Version it

Creating a release branch before developing all features or even before starting any development is entirely feasible. However, whether it's a good idea or not depends on your specific circumstances and preferences. Irrespective of when you create release branch, you need to either merge develop branch whenever it's updated, or make PRs directly to release branch.

```bash
// Create a release branch from the develop branch
git checkout -b release/1.3.0 develop
```

Now, I always had my doubts: when do I actually increment the version in the package.json or pom.xml file? It happens now! Once you create a release, you are basically "preparing" (not completing) the code for release, and you are clearly marking it with the version you intend to release. In package.json, put 1.3.0 (You can just run some command too!)

```
// Increment in package.json
"version": "0.1.0"
```

### Step 4: Stabilize Release Branch

Depending on the approach you took, you might have created the release after all features or some features. Eventually, note that somehow all the code relevant for release reached the branch, now all you can do is:

- Make any last-minute bug fixes in the release branch.
- Update documentation, run tests, and finalize the release.

You might merge things back to the release branch using other release stabilization branches; this is not very important to the whole structure, you can just call them `stabilize-move-button-to-left`, or if you are a single developer, you might directly push to the release. All is cool!

### Step 5: Release!

This is where I got confused previously, but I got it much later. Release is basically releasing the code and not an environment. Let's come to releasing for testing, and releasing to the environment a little later - and in fact, it is a different topic.

```bash
git checkout main
git merge release/1.3.0
```

You merged the release branch to main, and that's awesome! But right now, Git itself is not tagged with 1.3.0 version, 1.3.0 is only in package.json and that's not enough. That's why I called it "preparing," now let's complete it.

```bash
git tag -a v1.3.0 -m "Release version 1.3.0"
```

All you did is tagged Git commit with a tag number, and still you called it a "release." This is code release.

To close the loop, merge the changes from the release back to develop, so that any stabilization done in the release branch comes back to the develop branch.

```bash
git checkout develop
git merge release/1.3.0
```

That's done. You have developed a feature and released it to main. Now, what about deployment? Let's come to it after hotfixes!

## Developing a Hotfix

You found a bug - where did it happen? It might be in UAT or Production - That's the reason this topic was kept out. Because, the step where we mentioned "stabilize the release" - if we keep finding bugs, we will keep merging code to the release branch just with PRs, we won't increment version every time.

### Step 1: Create a hotfix branch

Create a hotfix branch from main (yes main) - assuming the current codebase of main is actually at 1.3.0

```bash
git checkout -b hotfix/1.3.1 main
```

### Step 2: Bump the version

Fix the bug, bump the version to `1.3.1` in the package.json file.

### Step 3: Merge to main and Tag

- Merge the hotfix branch into both `main` and `develop`.
- Tag `main` with `v1.3.1`.

### Step 4: Push tags to main

Push all the branches and tags to the remote repository.

```bash
git push origin main develop
git push --tags
```

## Deployment

Deployment is as unique as your team, project, or organization. If you're a solo developer working on your own personal project, you might not bother with a staging environment. However, if you're part of a larger organization, you might have a sophisticated setup like dev -> staging -> pre-prod -> prod. But remember, the number of environments doesn't dictate how you manage your codebase versioning.

### Environments

When it's time to deploy, you've got two big questions:

- What's getting deployed?
- Where's it going?

The "where" refers to your environment, each with its own set of variables. The "what" is about simplifying which "git commit" you want to deploy at the end of the day! Since that's not very flexible, you often resort to using branch names or tags.

Let's paint a picture with an example. Say you've got these environments:

- **staging** (Maybe where QA tests happen)
- **pre-prod** (Maybe where the final QA happens)
- **prod** (Well, you should know better!)

Once you've got a release branch ready, you'd want to make it available for testing. Here's how you could do it:

- Hook up automated CI/CD to deploy `release/1.3.0` to staging every time you push.
- Once you're satisfied with the release branch, then promote the release to main. At this point, main has a tag called v1.3.0.
- Release the v1.3.0 tag to the pre-prod environment.
- Oops, stumbled upon a bug. Time for a `hotfix/1.3.1` branch!
- Merge `hotfix/1.3.1` to main and tag it as v1.3.1.
- Release the v1.3.1 tag to the pre-prod environment.

### Alternatives

- Maybe you'd like to connect `main` directly to pre-prod if that makes things smoother.
- If you've got multiple releases lined up:
  - You might consider setting up a new "release environment" (else why would you need CaaS!)
  - Create the release environment and tear it down after the release.
- Call it a "release" environment instead of "staging", so you can deploy the upcoming release to it.
- Some folks even call it preview environments, where each release branch has a deployment of its own.

### Mobile Apps Versioning

Android and iOS versioning have their own quirks. Every time you need to upload to these stores, you've got to increment versions in a few files specific to Android and iOS. But the issue is, when we touch these files, they mess with Git history, essentially nudging the main branch.

For such cases, keep it simple:

- Stick to the same process as hotfixes, just call it `storefix/1.3.2`.

## Summary

> _Time to use some Generative AI to add some wit_

Let's ponder why this process actually works:

- The code that finds its way to users is like a VIP, chilling in a tagged commit on the `main` branch.
- In your team/org, you all gather around and chant, "We're working on 1.3.0, folks!"
- Your lingo is all about it:
  - "Is 1.3.0 sunbathing in staging?"
  - "Did QA give 1.3.0 the nod?"
  - "What's the scoop with 1.3.0?"
  - "Hey, while we're jazzed about 1.3.0, can we sneak in plans for 1.4.0?"
- `develop` is the lively hub where main and release branches dance together.
- `feature` branches are the birthplaces of new wonders.
- `release` branches are where the magic happens before the grand unveiling.
- `hotfix` branches are the emergency exits when things go haywire.
- Every significant release gets its own red carpet moment with a fancy Git tag.
- Fancy tools read your version from `package.json` and proudly display it like "Software Version: 1.3.1."
- Your bug trackers and analytics tools high-five the version, making issue hunting a piece of cake.
