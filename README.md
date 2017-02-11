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

## License

MIT License

Copyright (c) 2017 CongYu <moyuyc95@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
