
import router from './router'

import SitemapBuilder from '../index'

SitemapBuilder(router, 'http://example.com', '/xss/sitemap.txt')