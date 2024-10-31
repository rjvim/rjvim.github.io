---
title: "HTTP APIs Routing Naming Conventions & Response Structures"
date: "2020-06-03"
---

[Phil](https://apisyouwonthate.com/books/build-apis-you-wont-hate) says:

> Everyone and their dog wants an API, so you should probably learn how to build them.

<!-- truncate -->

One of key aspects of API development is "naming routes" for endpoints like:

```js
GET /all-photos
GET /get-photo/:uuid
```

It works in our favour if we develop a strategy around and keep it consistent. Most of our APIs are nothing but an interface to communicate with our database. The usual structure looks like: Frontend -> Logic -> Database

Logic part is usually NodeJS, PHP, Java or something else, we call Logic + Database part as "Backend". Frontend communicates with Backend via "HTTP APIs."

## Naming Routes

Let's say there are photos, usually you would provide APIs for following functionalities:

- Fetch all photos
- Fetch a particular photo
- Create a photo
- Update a photo
- Delete a photo

And this pattern repeats across most of the resources if not all. What we can learn is a strategy or a habit to write endpoints for these with our muscle memory, and not thinking everytime. Let's see how we can write endpoint for above:

| Functionality            | Endpoint             |
| ------------------------ | -------------------- |
| Fetch all photos         | GET /photos          |
| Fetch a particular photo | GET /photos/:uuid    |
| Create a photo           | POST /photos         |
| Update a photo           | PUT /photos/:uuid    |
| Delete a photo           | DELETE /photos/:uuid |

Let's say you have comment features, you can use nested routes and extend the same:

| Functionality                  | Endpoint                                  |
| ------------------------------ | ----------------------------------------- |
| Fetch all comments for a photo | GET /photos/:photo_uuid/comments          |
| Fetch a particular comment     | GET /photos/:photo_uuid/comments/:uuid    |
| Create a comment               | POST /photos/:photo_uuid/comments         |
| Update a comment               | PUT /photos/:photo_uuid/comments/:uuid    |
| Delete a comment               | DELETE /photos/:photo_uuid/comments/:uuid |

## Response Structures

When APIs respond with data, we encounter two kinds of data:

1. Single Resource (Ex: Single Photo)
2. List of Resources (Ex: All Photos)

### Single Resource

This is usually a json object, so it's simple:

```json
{
  "id": "2",
  "title": "Company Logo",
  "created_at": "2021-05-06"
}
```

Let's say we want to include comments also with this photo:

```json
{
  "id": "2",
  "title": "Company Logo",
  "created_at": "2021-05-06",
  "top_comments": [
    { "comment": "Very Intuitive", "author": "Bob" },
    { "comment": "Nice colors", "author": "Alice" }
  ]
}
```

### List of Resources

This is usually a json array, collection of json objects

```json
[
  {
    "id": "2",
    "title": "Company Logo",
    "created_at": "2021-05-06"
  },
  {
    "id": "3",
    "title": "Company Logo 2",
    "created_at": "2021-05-06"
  }
]
```

Though the above structure works well, it doesn't scale well because sooner or later we endup with need of Paginating, so it's better to do with:

```json
{
  "data": [
    {
      "id": "2",
      "title": "Company Logo",
      "created_at": "2021-05-06"
    },
    {
      "id": "3",
      "title": "Company Logo 2",
      "created_at": "2021-05-06"
    }
  ],
  "meta": {
    "per_page": 10,
    "page": 1,
    "total": 300
  }
}
```

## Outliers

You might face scenarios where above structure doesn't work, let's say you want respond with the top ten photos, you might end up writing something like:

```
GET /photos/top-ten
```

Though above would work, it would create confusion as it also maps the pattern of: `/photos/:uuid`

All those scenarios are actually "subjective", so what we need a strategy to handle those scenarios. If you zoom out and notice, the above APIs are about accessing resources - either single or a list. But the "top ten" scenario is not about that.

The first question to ask yourself is what is it? You can develop your own category list:

1. CRUD (Above APIs)
2. Reporting
3. Summaries
4. Aggregations
5. Analytics
6. Dashboard

This way, you can write such APIs under that prefix, so in case of above "Top Ten", may be we are trying to summarize Top Ten photos posted by an user, so our API would also be same:

```
GET /summaries/photos/top-ten
```

So, there is clear distinction that top-ten API is not about receiving resources, but a summary. It's a different module and story.

You might have many such scenarios like those, let's try another example, you have a Dashboard, where you show lot of data for the logged in user:

```
GET /dashboard/summary
```

And the response can be (cached):

```json
{
  "summaries": [
    {
      "key": "total_amount_of_orders_placed",
      "value": "15000000",
      "currency": "INR"
    },
    {
      "key": "number_of_followers",
      "value": "123"
    }
  ],
  "blog_suggestions": [
    {
      "title": "Learn React in 5 minutes",
      "image": "/funnny-image.jpg",
      "url": "http://quick.com/react-in-5-mins"
    },
    {
      "title": "Learn NextJS in 5 months",
      "image": "/funnny-image.jpg",
      "url": "http://quick.com/nextjs-in-5-months"
    }
  ]
}
```
