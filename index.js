import {writeFileSync} from 'fs'

export const getSites = (router) => {
    if (!router) {
        console.error('[ERROR] router is NULL');
        return null;
    }
    router = findRouter(router);
    if (!router) {
        console.error('[ERROR] router is not found');
        return null;
    }
    if (!router.props || !router.props.children) {
        console.error('[ERROR] router don\'t hava children', router);
        return null;
    }

    var arr = router.props.children;
    if (!Array.isArray(router.props.children)) {
        arr = [router.props.children]
    }

    return arrFlatten(arr, route => getRouteSites(route, ''))

    function findRouter (router) {
        if ( router && router.type && router.type.displayName === 'Router' ) {
            return router;
        }
        if (!router || !router.props || !router.props.children ) {
            return null;
        }
        var arr = router.props.children;
        if (!Array.isArray(router.props.children)) {
            arr = [router.props.children]
        }
        return arr.find((vdom) => !!findRouter(vdom))
    }

    function getRouteSites (route, base='/') {
        if (route && route.type && route.type.displayName.includes('Redirect') ) {
            return [];
        }
        var paths=[];
        var path = route.props.path || '';
        return arrFlatten(actionPath(path).map(p => base+p), (base) => {
            if ( !route.props.children ) {
                return paths.concat(base);
            } else {
                return paths.concat(
                    arrFlatten(route.props.children, (route) => getRouteSites(route, base))
                )
            }
        })
    }

    function actionPath (path) {
        var bracketsReg = /\(.*?\)/g, colonReg = /:[^\/]*/g
        var paths = []
        if (bracketsReg.test(path)) {
            paths.push(path.replace(bracketsReg, '').replace(/\/+$/, ''))
        }
        if (colonReg.test(path)) {
            paths.push(path.replace(colonReg, '*').replace(/[\(\)]/, '').replace(/\/+$/, ''))
        }
        if (!paths.length) {
            paths.push(path)
        }
        return paths
    }

    function arrFlatten (arr=[], getArray) {
        return arr.reduce(
            (init, a) => {
                return init.concat(getArray.call(null, a))
            }, []
        )
    }
}

export default (router, prefix='', file) => {
    try {
        const sites = getSites(router);
        writeFileSync(file, sites.map(s=>prefix+s).join('\r\n'));
        return true;
    } catch (ex) {
        console.error(ex);
        return false;
    }
}