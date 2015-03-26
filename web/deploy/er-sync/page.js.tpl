/**
 * @file {#ersync}
 * @author {#author}
 * @date {#date}
 * {#copyright}
 */
mf.{#page} = {};

er.config.TEMPLATE_LIST = [
    'asset/{#site}-{#page}.html'
];
// er.config.DEFAULT_INDEX = "/{#page}/account";
// mf.authority = mf.m.authority('{#site}', '{#page}');
// mf.cookieKeyMap = mf.COOKIE_KEY_MAP.{#site}.{#page};

$(function () {
    if ('{#page}' === mf.getErPage()) {//generate tab
        // mf.updateNav1();
    }
});
