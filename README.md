# React-Router Sitemap Builder

Because of Server Side Render based on react react-router, We need SEO.

then **Sitemap Builder** Build `sitemap.txt` for SEO.

## Usage

```bash
npm install --save react-router-sitemap-builder
```

- router.js
```javascript
// router.js
import { Router, Route, IndexRoute, Redirect, IndexRedirect } from 'react-router'
import React from 'react';

export default (
    <Router>
        <Route path="/">
            <IndexRoute/>
            <Route path="test" />
            <Route path="posts(/:page)" />
            <Route path="article/:hrefTitle" />
            <Route path="tags/:tagName" />
            <Route path="tags/pages/(:page)" />
            <Route path="archive(/:searchKey)" />
            <Redirect path="*" to="/" />
        </Route>
    </Router>
)
```

- sitemap-builder.js
```javascript
import router from './router'
import siteMapBuilder, {getSites} from 'react-router-sitemap-builder'


getSites(router);
/*
 [ '/',
  '/test',
  '/posts',
  '/posts/*',
  '/article/*',
  '/tags/*',
  '/tags/pages',
  '/tags/pages/*',
  '/archive',
  '/archive/*' ]
 */
/* router, prefix, save_to_where */
sitemapBuilder(router, 'http://example.com', __dirname+'/sitemap.txt');
/* return true of false */
```

- sitemap.txt
```text
http://example.com/
http://example.com/test
http://example.com/posts
http://example.com/posts/*
http://example.com/article/*
http://example.com/tags/*
http://example.com/tags/pages
http://example.com/tags/pages/*
http://example.com/archive
http://example.com/archive/*
```

## Updates

[Updates](Updates.md)

## Development

**After `git clone`**

```
npm install babel-node babel
npm install && npm test
npm run dev # running babel
```


