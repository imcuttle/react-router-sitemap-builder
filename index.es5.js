'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSites = undefined;

var _fs = require('fs');

var getSites = exports.getSites = function getSites(router) {
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
        arr = [router.props.children];
    }

    return arrFlatten(arr, function (route) {
        return getRouteSites(route, '');
    });

    function findRouter(router) {
        if (router && router.type && router.type.displayName === 'Router') {
            return router;
        }
        if (!router || !router.props || !router.props.children) {
            return null;
        }
        var arr = router.props.children;
        if (!Array.isArray(router.props.children)) {
            arr = [router.props.children];
        }
        return arr.find(function (vdom) {
            return !!findRouter(vdom);
        });
    }

    function getRouteSites(route) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

        if (route.type && route.type.displayName.includes('Redirect')) {
            return [];
        }
        var paths = [];
        var path = route.props.path || '';
        return arrFlatten(actionPath(path).map(function (p) {
            return base + p;
        }), function (base) {
            if (!route.props.children) {
                return paths.concat(base);
            } else {
                return paths.concat(arrFlatten(route.props.children, function (route) {
                    return getRouteSites(route, base);
                }));
            }
        });
    }

    function actionPath(path) {
        var bracketsReg = /\(.*?\)/g,
            colonReg = /:[^\/]*/g;
        var paths = [];
        if (bracketsReg.test(path)) {
            paths.push(path.replace(bracketsReg, '').replace(/\/+$/, ''));
        }
        if (colonReg.test(path)) {
            paths.push(path.replace(colonReg, '*').replace(/[\(\)]/, '').replace(/\/+$/, ''));
        }
        if (!paths.length) {
            paths.push(path);
        }
        return paths;
    }

    function arrFlatten() {
        var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var getArray = arguments[1];

        return arr.reduce(function (init, a) {
            return init.concat(getArray.call(null, a));
        }, []);
    }
};

exports.default = function (router) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var file = arguments[2];

    try {
        var sites = getSites(router);
        (0, _fs.writeFileSync)(file, sites.map(function (s) {
            return prefix + s;
        }).join('\r\n'));
        return true;
    } catch (ex) {
        console.error(ex);
        return false;
    }
};
