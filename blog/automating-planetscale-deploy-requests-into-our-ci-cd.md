---
title: "Automating Planetscale Deploy Requests into CI/CD"
date: "2020-03-16"
tags: [hola, docusaurus]
---

Before I jump into the solution, I want to put forward some context. For the past 4–5 years I have been using Postgres, and we switched one of our crucial microservices to MySQL, solely to reap the benefits of hosted database solutions. I heard about planetscale on a podcast, here is the link: https://founderstalk.fm/85

<!-- truncate -->

Coming to the problem, let me first describe the application I am dealing with:

- It's based on NodeJS (You will understand the problem even if use something like Laravel, Django, Rails)
- We use KnexJS to manage all our migrations
- So, whenever I want to make changes to my database schema, I write a migration and then run `migrate:latest`
- And our CI/CD pipeline also does the same. I push to a branch, it runs migrate command.

Even if you are using Laravel, I assume `php artisan migrate` is what you would end up doing.

This is kind of a problem when you move the world of planetscale, because, planetscale workflow is very different when you want to make changes to the schema, and this puzzled me for a while. That's the main reason for writing this blog post. Though Planetscale has documentation on this here: https://docs.planetscale.com/concepts/planetscale-workflow I still was trying to understand how to use it in my workflow.

Let's first breakdown how pscale expects to make schema changes:

- Before we jump ahead, don't think of your database as a list of migration files. I got used to it so much, I almost forgot, migrations are magic and actually, there are SQL DDL changes that are being generated in the background (I had to google DDL when I first an error in pscale)
- So, the database schema is actual DDL with Create Table, Alter Table, commands. Great.
- When you begin, you would apply this schema to a "branch" -> usually called main (your wish again).
- You take this branch and make it a "production" branch. Ooookay! That's a new concept. But, just hang on for a bit. A production branch according to pscale is something that is protected and highly scalable. I am still at a place where once I hear the word "highly scala.." I am sold.
- Once you make your main branch a production branch - you can't make any more schema changes. So, if you run migrate command, it won't work. It will complain.
- So, what you need to do? You have to create a branch from main, add your schema changes, and then a "deploy request" which essential is a merge request into main + deployment.
- It might take sometime to wrap your head around it. But, let that settle in. Explaining exactly how that should be done would take a post on its own. I am still defining the problem.

In Laravel or KnexJS world, basically, you take a branch from main and then run migrate command on that branch. Raise a deploy request, merge it and then those changes would be applied to main branch.

## **Challenges**

- I can't just add a migration file and hope to push to my codebase master branch and hope migrate will work
- At the same time I don't want to create a branch manually, run migrate command manually, make deploy request manually, etc., etc.,
- We have pscale command line tool to save us, but not entirely, not without we adding some magic
- Also, planetscale doesn't give a damn about your migrations table but that's so important for knexjs, laravel etc.,

The solution I have come up with includes a script which does all of the above and also keep migrations table in sync, so that we don't lose sanity.

Disclaimer: This script is in Javascript, and runs with nodejs. But I would keep it generalised as much as I can, so that you grab the concept and implement it on your own.

## **Repeater**

When you run any pscale command like create branch or deploy request, it takes sometime for it to actually do it. Our script has to wait till the job is done on pscale though the call is finished. So, how we achieve that is by:

First: Run the command and store the result

Second: Keep polling to see the status and confirm if it is done or not

I used "Repeater" to make the possible.

```js
const { Repeater } = require("@repeaterjs/repeater");
```

## Solution

Now, let's write the solution in points:

- Create a Branch using pscale create branch, My branch name is deploy${new Date().getTime()}
- Keep checking the branch status till it becomes true to make sure branch is created
- Once branch is created, create a password using pscale create password(So, that you can access the branch)
- When branch is created, if you opted for planetscale to copy migrations. The migrations table in your branch would be populated. But I didn't, so migrations table in branch is empty. So, I connect to main branch, copy migrations into new branch I just created
- Run migrate command on branch, which applies my migrations
- Create a deploy request using pscale deploy-request create
- Check the status of deploy request pscale deploy-request show
- Check the status till you get a response deployable: true and further check if state: no_changes If there are no changes, it means you can delete the branch right away. We will get to that.
- Let's say state is not no_changesIn that case you will create a deploy request for deployment using pscale deploy-request deploy
- Wait for deployment deploy request to return you a state: completed
- Then, finally, to keep migrations table up-to-date in main branch, truncate the migrations table on main branch, and copy migrations tables from new branch to main. (Sounds crazy? I couldn't figure out better way yet)
- Once the state is completed, you can delete the branch using pscale branch delete

So, Finally, we ran all the above steps as part of our CD pipeline, also kept our migrations table in sync, so that when we run migrate command subsequently, it won't complain that column or tables don't exist.

Helpers

I use docker, so I installed pscale command line utility using following:

```command-line
RUN wget https://github.com/planetscale/cli/releases/download/v0.89.0/pscale_0.89.0_linux_amd64.deb
RUN dpkg -i pscale_0.89.0_linux_amd64.deb; apt-get install -y -f
RUN rm pscale_0.89.0_linux_amd64.deb
RUN pscale --version
```
