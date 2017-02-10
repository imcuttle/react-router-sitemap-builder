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