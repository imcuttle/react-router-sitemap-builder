
import router from './router'

import siteMapBuilder, {getSites} from '../index'

console.log(getSites(router));
siteMapBuilder(router, 'http://example.com', __dirname + '/sitemap.txt')