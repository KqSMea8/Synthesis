'use strict';

var unpack = require('caniuse-lite').feature;

var browsersSort = function browsersSort(a, b) {
    a = a.split(' ');
    b = b.split(' ');
    if (a[0] > b[0]) {
        return 1;
    } else if (a[0] < b[0]) {
        return -1;
    } else {
        return Math.sign(parseFloat(a[1]) - parseFloat(b[1]));
    }
};

// Convert Can I Use data
function f(data, opts, callback) {
    data = unpack(data);

    if (!callback) {
        var _ref = [opts, {}];
        callback = _ref[0];
        opts = _ref[1];
    }

    var match = opts.match || /\sx($|\s)/;
    var need = [];

    for (var browser in data.stats) {
        var versions = data.stats[browser];
        for (var version in versions) {
            var support = versions[version];
            if (support.match(match)) {
                need.push(browser + ' ' + version);
            }
        }
    }

    callback(need.sort(browsersSort));
}

// Add data for all properties
var result = {};

var prefix = function prefix(names, data) {
    for (var _iterator = names, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref2 = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref2 = _i.value;
        }

        var name = _ref2;

        result[name] = Object.assign({}, data);
    }
};

var add = function add(names, data) {
    for (var _iterator2 = names, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref3 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref3 = _i2.value;
        }

        var name = _ref3;

        result[name].browsers = result[name].browsers.concat(data.browsers).sort(browsersSort);
    }
};

module.exports = result;

// Border Radius
f(require('caniuse-lite/data/features/border-radius.js'), function (browsers) {
    return prefix(['border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'], {
        mistakes: ['-khtml-', '-ms-', '-o-'],
        feature: 'border-radius',
        browsers: browsers
    });
});

// Box Shadow
f(require('caniuse-lite/data/features/css-boxshadow.js'), function (browsers) {
    return prefix(['box-shadow'], {
        mistakes: ['-khtml-'],
        feature: 'css-boxshadow',
        browsers: browsers
    });
});

// Animation
f(require('caniuse-lite/data/features/css-animation.js'), function (browsers) {
    return prefix(['animation', 'animation-name', 'animation-duration', 'animation-delay', 'animation-direction', 'animation-fill-mode', 'animation-iteration-count', 'animation-play-state', 'animation-timing-function', '@keyframes'], {
        mistakes: ['-khtml-', '-ms-'],
        feature: 'css-animation',
        browsers: browsers
    });
});

// Transition
f(require('caniuse-lite/data/features/css-transitions.js'), function (browsers) {
    return prefix(['transition', 'transition-property', 'transition-duration', 'transition-delay', 'transition-timing-function'], {
        mistakes: ['-khtml-', '-ms-'],
        browsers: browsers,
        feature: 'css-transitions'
    });
});

// Transform 2D
f(require('caniuse-lite/data/features/transforms2d.js'), function (browsers) {
    return prefix(['transform', 'transform-origin'], {
        feature: 'transforms2d',
        browsers: browsers
    });
});

// Transform 3D
var transforms3d = require('caniuse-lite/data/features/transforms3d.js');

f(transforms3d, function (browsers) {
    prefix(['perspective', 'perspective-origin'], {
        feature: 'transforms3d',
        browsers: browsers
    });
    return prefix(['transform-style'], {
        mistakes: ['-ms-', '-o-'],
        browsers: browsers,
        feature: 'transforms3d'
    });
});

f(transforms3d, { match: /y\sx|y\s#2/ }, function (browsers) {
    return prefix(['backface-visibility'], {
        mistakes: ['-ms-', '-o-'],
        feature: 'transforms3d',
        browsers: browsers
    });
});

// Gradients
var gradients = require('caniuse-lite/data/features/css-gradients.js');

f(gradients, { match: /y\sx/ }, function (browsers) {
    return prefix(['linear-gradient', 'repeating-linear-gradient', 'radial-gradient', 'repeating-radial-gradient'], {
        props: ['background', 'background-image', 'border-image', 'mask', 'list-style', 'list-style-image', 'content', 'mask-image'],
        mistakes: ['-ms-'],
        feature: 'css-gradients',
        browsers: browsers
    });
});

f(gradients, { match: /a\sx/ }, function (browsers) {
    browsers = browsers.map(function (i) {
        if (/op/.test(i)) {
            return i;
        } else {
            return i + ' old';
        }
    });
    return add(['linear-gradient', 'repeating-linear-gradient', 'radial-gradient', 'repeating-radial-gradient'], {
        feature: 'css-gradients',
        browsers: browsers
    });
});

// Box sizing
f(require('caniuse-lite/data/features/css3-boxsizing.js'), function (browsers) {
    return prefix(['box-sizing'], {
        feature: 'css3-boxsizing',
        browsers: browsers
    });
});

// Filter Effects
f(require('caniuse-lite/data/features/css-filters.js'), function (browsers) {
    return prefix(['filter'], {
        feature: 'css-filters',
        browsers: browsers
    });
});

// filter() function
f(require('caniuse-lite/data/features/css-filter-function.js'), function (browsers) {
    return prefix(['filter-function'], {
        props: ['background', 'background-image', 'border-image', 'mask', 'list-style', 'list-style-image', 'content', 'mask-image'],
        feature: 'css-filter-function',
        browsers: browsers
    });
});

// Backdrop-filter
f(require('caniuse-lite/data/features/css-backdrop-filter.js'), function (browsers) {
    return prefix(['backdrop-filter'], {
        feature: 'css-backdrop-filter',
        browsers: browsers
    });
});

// element() function
f(require('caniuse-lite/data/features/css-element-function.js'), function (browsers) {
    return prefix(['element'], {
        props: ['background', 'background-image', 'border-image', 'mask', 'list-style', 'list-style-image', 'content', 'mask-image'],
        feature: 'css-element-function',
        browsers: browsers
    });
});

// Multicolumns
f(require('caniuse-lite/data/features/multicolumn.js'), function (browsers) {
    prefix(['columns', 'column-width', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-width'], {
        feature: 'multicolumn',
        browsers: browsers
    });

    prefix(['column-count', 'column-rule-style', 'column-span', 'column-fill', 'break-before', 'break-after', 'break-inside'], {
        feature: 'multicolumn',
        browsers: browsers
    });
});

// User select
f(require('caniuse-lite/data/features/user-select-none.js'), function (browsers) {
    return prefix(['user-select'], {
        mistakes: ['-khtml-'],
        feature: 'user-select-none',
        browsers: browsers
    });
});

// Flexible Box Layout
var flexbox = require('caniuse-lite/data/features/flexbox.js');
f(flexbox, { match: /a\sx/ }, function (browsers) {
    browsers = browsers.map(function (i) {
        if (/ie|firefox/.test(i)) {
            return i;
        } else {
            return i + ' 2009';
        }
    });
    prefix(['display-flex', 'inline-flex'], {
        props: ['display'],
        feature: 'flexbox',
        browsers: browsers
    });
    prefix(['flex', 'flex-grow', 'flex-shrink', 'flex-basis'], {
        feature: 'flexbox',
        browsers: browsers
    });
    prefix(['flex-direction', 'flex-wrap', 'flex-flow', 'justify-content', 'order', 'align-items', 'align-self', 'align-content'], {
        feature: 'flexbox',
        browsers: browsers
    });
});

f(flexbox, { match: /y\sx/ }, function (browsers) {
    add(['display-flex', 'inline-flex'], {
        feature: 'flexbox',
        browsers: browsers
    });
    add(['flex', 'flex-grow', 'flex-shrink', 'flex-basis'], {
        feature: 'flexbox',
        browsers: browsers
    });
    add(['flex-direction', 'flex-wrap', 'flex-flow', 'justify-content', 'order', 'align-items', 'align-self', 'align-content'], {
        feature: 'flexbox',
        browsers: browsers
    });
});

// calc() unit
f(require('caniuse-lite/data/features/calc.js'), function (browsers) {
    return prefix(['calc'], {
        props: ['*'],
        feature: 'calc',
        browsers: browsers
    });
});

// Background options
f(require('caniuse-lite/data/features/background-img-opts.js'), function (browsers) {
    return prefix(['background-clip', 'background-origin', 'background-size'], {
        feature: 'background-img-opts',
        browsers: browsers
    });
});

// Font feature settings
f(require('caniuse-lite/data/features/font-feature.js'), function (browsers) {
    return prefix(['font-feature-settings', 'font-variant-ligatures', 'font-language-override'], {
        feature: 'font-feature',
        browsers: browsers
    });
});

// CSS font-kerning property
f(require('caniuse-lite/data/features/font-kerning.js'), function (browsers) {
    return prefix(['font-kerning'], {
        feature: 'font-kerning',
        browsers: browsers
    });
});

// Border image
f(require('caniuse-lite/data/features/border-image.js'), function (browsers) {
    return prefix(['border-image'], {
        feature: 'border-image',
        browsers: browsers
    });
});

// Selection selector
f(require('caniuse-lite/data/features/css-selection.js'), function (browsers) {
    return prefix(['::selection'], {
        selector: true,
        feature: 'css-selection',
        browsers: browsers
    });
});

// Placeholder selector
f(require('caniuse-lite/data/features/css-placeholder.js'), function (browsers) {
    browsers = browsers.map(function (i) {
        var _i$split = i.split(' '),
            name = _i$split[0],
            version = _i$split[1];

        if (name === 'firefox' && parseFloat(version) <= 18) {
            return i + ' old';
        } else if (name === 'ie') {
            return i + ' old';
        } else {
            return i;
        }
    });

    prefix(['::placeholder'], {
        selector: true,
        feature: 'css-placeholder',
        browsers: browsers
    });
});

// Hyphenation
f(require('caniuse-lite/data/features/css-hyphens.js'), function (browsers) {
    return prefix(['hyphens'], {
        feature: 'css-hyphens',
        browsers: browsers
    });
});

// Fullscreen selector
var fullscreen = require('caniuse-lite/data/features/fullscreen.js');

f(fullscreen, function (browsers) {
    return prefix([':fullscreen'], {
        selector: true,
        feature: 'fullscreen',
        browsers: browsers
    });
});

f(fullscreen, { match: /x(\s#2|$)/ }, function (browsers) {
    return prefix(['::backdrop'], {
        selector: true,
        feature: 'fullscreen',
        browsers: browsers
    });
});

// Tab size
f(require('caniuse-lite/data/features/css3-tabsize.js'), function (browsers) {
    return prefix(['tab-size'], {
        feature: 'css3-tabsize',
        browsers: browsers
    });
});

// Intrinsic & extrinsic sizing
f(require('caniuse-lite/data/features/intrinsic-width.js'), function (browsers) {
    return prefix(['max-content', 'min-content', 'fit-content', 'fill', 'fill-available', 'stretch'], {
        props: ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height', 'inline-size', 'min-inline-size', 'max-inline-size', 'block-size', 'min-block-size', 'max-block-size', 'grid', 'grid-template', 'grid-template-rows', 'grid-template-columns', 'grid-auto-columns', 'grid-auto-rows'],
        feature: 'intrinsic-width',
        browsers: browsers
    });
});

// Zoom cursors
f(require('caniuse-lite/data/features/css3-cursors-newer.js'), function (browsers) {
    return prefix(['zoom-in', 'zoom-out'], {
        props: ['cursor'],
        feature: 'css3-cursors-newer',
        browsers: browsers
    });
});

// Grab cursors
f(require('caniuse-lite/data/features/css3-cursors-grab.js'), function (browsers) {
    return prefix(['grab', 'grabbing'], {
        props: ['cursor'],
        feature: 'css3-cursors-grab',
        browsers: browsers
    });
});

// Sticky position
f(require('caniuse-lite/data/features/css-sticky.js'), function (browsers) {
    return prefix(['sticky'], {
        props: ['position'],
        feature: 'css-sticky',
        browsers: browsers
    });
});

// Pointer Events
f(require('caniuse-lite/data/features/pointer.js'), function (browsers) {
    return prefix(['touch-action'], {
        feature: 'pointer',
        browsers: browsers
    });
});

// Text decoration
var decoration = require('caniuse-lite/data/features/text-decoration.js');

f(decoration, function (browsers) {
    return prefix(['text-decoration-style', 'text-decoration-color', 'text-decoration-line', 'text-decoration'], {
        feature: 'text-decoration',
        browsers: browsers
    });
});

f(decoration, { match: /x.*#[23]/ }, function (browsers) {
    return prefix(['text-decoration-skip'], {
        feature: 'text-decoration',
        browsers: browsers
    });
});

// Text Size Adjust
f(require('caniuse-lite/data/features/text-size-adjust.js'), function (browsers) {
    return prefix(['text-size-adjust'], {
        feature: 'text-size-adjust',
        browsers: browsers
    });
});

// CSS Masks
f(require('caniuse-lite/data/features/css-masks.js'), function (browsers) {
    prefix(['mask-clip', 'mask-composite', 'mask-image', 'mask-origin', 'mask-repeat', 'mask-border-repeat', 'mask-border-source'], {
        feature: 'css-masks',
        browsers: browsers
    });
    prefix(['mask', 'mask-position', 'mask-size', 'mask-border', 'mask-border-outset', 'mask-border-width', 'mask-border-slice'], {
        feature: 'css-masks',
        browsers: browsers
    });
});

// CSS clip-path property
f(require('caniuse-lite/data/features/css-clip-path.js'), function (browsers) {
    return prefix(['clip-path'], {
        feature: 'css-clip-path',
        browsers: browsers
    });
});

// Fragmented Borders and Backgrounds
f(require('caniuse-lite/data/features/css-boxdecorationbreak.js'), function (browsers) {
    return prefix(['box-decoration-break'], {
        feature: 'css-boxdecorationbreak',
        browsers: browsers
    });
});

// CSS3 object-fit/object-position
f(require('caniuse-lite/data/features/object-fit.js'), function (browsers) {
    return prefix(['object-fit', 'object-position'], {
        feature: 'object-fit',
        browsers: browsers
    });
});

// CSS Shapes
f(require('caniuse-lite/data/features/css-shapes.js'), function (browsers) {
    return prefix(['shape-margin', 'shape-outside', 'shape-image-threshold'], {
        feature: 'css-shapes',
        browsers: browsers
    });
});

// CSS3 text-overflow
f(require('caniuse-lite/data/features/text-overflow.js'), function (browsers) {
    return prefix(['text-overflow'], {
        feature: 'text-overflow',
        browsers: browsers
    });
});

// Viewport at-rule
f(require('caniuse-lite/data/features/css-deviceadaptation.js'), function (browsers) {
    return prefix(['@viewport'], {
        feature: 'css-deviceadaptation',
        browsers: browsers
    });
});

// Resolution Media Queries
var resolut = require('caniuse-lite/data/features/css-media-resolution.js');
f(resolut, { match: /( x($| )|a #3)/ }, function (browsers) {
    return prefix(['@resolution'], {
        feature: 'css-media-resolution',
        browsers: browsers
    });
});

// CSS text-align-last
f(require('caniuse-lite/data/features/css-text-align-last.js'), function (browsers) {
    return prefix(['text-align-last'], {
        feature: 'css-text-align-last',
        browsers: browsers
    });
});

// Crisp Edges Image Rendering Algorithm
var crispedges = require('caniuse-lite/data/features/css-crisp-edges.js');

f(crispedges, { match: /y x|a x #1/ }, function (browsers) {
    return prefix(['pixelated'], {
        props: ['image-rendering'],
        feature: 'css-crisp-edges',
        browsers: browsers
    });
});

f(crispedges, { match: /a x #2/ }, function (browsers) {
    return prefix(['image-rendering'], {
        feature: 'css-crisp-edges',
        browsers: browsers
    });
});

// Logical Properties
var logicalProps = require('caniuse-lite/data/features/css-logical-props.js');

f(logicalProps, function (browsers) {
    return prefix(['border-inline-start', 'border-inline-end', 'margin-inline-start', 'margin-inline-end', 'padding-inline-start', 'padding-inline-end'], {
        feature: 'css-logical-props',
        browsers: browsers
    });
});

f(logicalProps, { match: /x\s#2/ }, function (browsers) {
    return prefix(['border-block-start', 'border-block-end', 'margin-block-start', 'margin-block-end', 'padding-block-start', 'padding-block-end'], {
        feature: 'css-logical-props',
        browsers: browsers
    });
});

// CSS appearance
var appearance = require('caniuse-lite/data/features/css-appearance.js');
f(appearance, { match: /#2|x/ }, function (browsers) {
    return prefix(['appearance'], {
        feature: 'css-appearance',
        browsers: browsers
    });
});

// CSS Scroll snap points
f(require('caniuse-lite/data/features/css-snappoints.js'), function (browsers) {
    return prefix(['scroll-snap-type', 'scroll-snap-coordinate', 'scroll-snap-destination', 'scroll-snap-points-x', 'scroll-snap-points-y'], {
        feature: 'css-snappoints',
        browsers: browsers
    });
});

// CSS Regions
f(require('caniuse-lite/data/features/css-regions.js'), function (browsers) {
    return prefix(['flow-into', 'flow-from', 'region-fragment'], {
        feature: 'css-regions',
        browsers: browsers
    });
});

// CSS image-set
f(require('caniuse-lite/data/features/css-image-set.js'), function (browsers) {
    return prefix(['image-set'], {
        props: ['background', 'background-image', 'border-image', 'cursor', 'mask', 'mask-image', 'list-style', 'list-style-image', 'content'],
        feature: 'css-image-set',
        browsers: browsers
    });
});

// Writing Mode
var writingMode = require('caniuse-lite/data/features/css-writing-mode.js');
f(writingMode, { match: /a|x/ }, function (browsers) {
    return prefix(['writing-mode'], {
        feature: 'css-writing-mode',
        browsers: browsers
    });
});

// Cross-Fade Function
f(require('caniuse-lite/data/features/css-cross-fade.js'), function (browsers) {
    return prefix(['cross-fade'], {
        props: ['background', 'background-image', 'border-image', 'mask', 'list-style', 'list-style-image', 'content', 'mask-image'],
        feature: 'css-cross-fade',
        browsers: browsers
    });
});

// Read Only selector
f(require('caniuse-lite/data/features/css-read-only-write.js'), function (browsers) {
    return prefix([':read-only', ':read-write'], {
        selector: true,
        feature: 'css-read-only-write',
        browsers: browsers
    });
});

// Text Emphasize
f(require('caniuse-lite/data/features/text-emphasis.js'), function (browsers) {
    return prefix(['text-emphasis', 'text-emphasis-position', 'text-emphasis-style', 'text-emphasis-color'], {
        feature: 'text-emphasis',
        browsers: browsers
    });
});

// CSS Grid Layout
var grid = require('caniuse-lite/data/features/css-grid.js');

f(grid, function (browsers) {
    prefix(['display-grid', 'inline-grid'], {
        props: ['display'],
        feature: 'css-grid',
        browsers: browsers
    });
    prefix(['grid-template-columns', 'grid-template-rows', 'grid-row-start', 'grid-column-start', 'grid-row-end', 'grid-column-end', 'grid-row', 'grid-column'], {
        feature: 'css-grid',
        browsers: browsers
    });
});

f(grid, { match: /a x/ }, function (browsers) {
    return prefix(['grid-column-align', 'grid-row-align'], {
        feature: 'css-grid',
        browsers: browsers
    });
});

// CSS text-spacing
f(require('caniuse-lite/data/features/css-text-spacing.js'), function (browsers) {
    return prefix(['text-spacing'], {
        feature: 'css-text-spacing',
        browsers: browsers
    });
});

// :any-link selector
f(require('caniuse-lite/data/features/css-any-link.js'), function (browsers) {
    return prefix([':any-link'], {
        selector: true,
        feature: 'css-any-link',
        browsers: browsers
    });
});

// unicode-bidi
var bidi = require('caniuse-lite/data/features/css-unicode-bidi.js');

f(bidi, function (browsers) {
    return prefix(['isolate'], {
        props: ['unicode-bidi'],
        feature: 'css-unicode-bidi',
        browsers: browsers
    });
});

f(bidi, { match: /y x|a x #2/ }, function (browsers) {
    return prefix(['plaintext'], {
        props: ['unicode-bidi'],
        feature: 'css-unicode-bidi',
        browsers: browsers
    });
});

f(bidi, { match: /y x/ }, function (browsers) {
    return prefix(['isolate-override'], {
        props: ['unicode-bidi'],
        feature: 'css-unicode-bidi',
        browsers: browsers
    });
});