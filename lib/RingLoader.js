'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _appendVendorPrefix = require('domkit/appendVendorPrefix');

var _appendVendorPrefix2 = _interopRequireDefault(_appendVendorPrefix);

var _insertKeyframesRule = require('domkit/insertKeyframesRule');

var _insertKeyframesRule2 = _interopRequireDefault(_insertKeyframesRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @type {Object}
 */
var rightRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'

    },
    '100%': {
        transform: 'rotateX(180deg) rotateY(360deg) rotateZ(360deg)'
    }
};

/**
 * @type {Object}
 */
var leftRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
    },
    '100%': {
        transform: 'rotateX(360deg) rotateY(180deg) rotateZ(360deg)'
    }
};

/**
 * @type {String}
 */
var rightRotateAnimationName = (0, _insertKeyframesRule2.default)(rightRotateKeyframes);

/**
 * @type {String}
 */
var leftRotateAnimationName = (0, _insertKeyframesRule2.default)(leftRotateKeyframes);

var propTypes = {
    loading: _propTypes2.default.bool,
    color: _propTypes2.default.string,
    size: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    margin: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};

var ptKeys = Object.keys(propTypes);

var RingLoader = function (_Component) {
    _inherits(RingLoader, _Component);

    function RingLoader() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RingLoader);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RingLoader.__proto__ || Object.getPrototypeOf(RingLoader)).call.apply(_ref, [this].concat(args))), _this), _this.getCircleStyle = function (size) {
            return {
                width: size,
                height: size,
                border: size / 10 + 'px solid ' + _this.props.color,
                opacity: 0.4,
                borderRadius: '100%',
                verticalAlign: _this.props.verticalAlign
            };
        }, _this.getAnimationStyle = function (i) {
            var animation = [i == 1 ? rightRotateAnimationName : leftRotateAnimationName, '2s', '0s', 'infinite', 'linear'].join(' ');
            var animationFillMode = 'forwards';
            var perspective = '800px';

            return {
                perspective: perspective,
                animation: animation,
                animationFillMode: animationFillMode
            };
        }, _this.getStyle = function (i) {
            var size = parseInt(_this.props.size);

            if (i) {
                return (0, _appendVendorPrefix2.default)({
                    border: '0px solid transparent' // fix firefox/chrome/opera rendering
                }, _this.getCircleStyle(size), _this.getAnimationStyle(i), {
                    position: 'absolute',
                    top: 0,
                    left: 0
                });
            }

            return {
                width: size,
                height: size,
                position: 'relative',
                border: '0px solid transparent' // fix firefox/chrome/opera rendering
            };
        }, _this.renderLoader = function (loading) {
            if (loading) {
                var props = Object.assign({}, _this.props);

                if (propTypes && ptKeys) {
                    var klen = ptKeys.length;
                    for (var i = 0; i < klen; i++) {
                        delete props[ptKeys[i]];
                    }
                }

                return _react2.default.createElement(
                    'div',
                    props,
                    _react2.default.createElement(
                        'div',
                        { style: _this.getStyle(0) },
                        _react2.default.createElement('div', { style: _this.getStyle(1) }),
                        _react2.default.createElement('div', { style: _this.getStyle(2) })
                    )
                );
            }

            return null;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /**
     * @type {Object}
     */


    /**
     * @param {String} size
     * @return {Object}
     */


    /**
     * @param  {Number} i
     * @return {Object}
     */


    /**
     * @param  {Number} i
     * @return {Object}
     */


    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */


    _createClass(RingLoader, [{
        key: 'render',
        value: function render() {
            return this.renderLoader(this.props.loading);
        }
    }]);

    return RingLoader;
}(_react.Component);

RingLoader.propTypes = propTypes;
RingLoader.defaultProps = {
    loading: true,
    color: '#ffffff',
    size: '60px' };
exports.default = RingLoader;
module.exports = exports['default'];
//# sourceMappingURL=RingLoader.js.map