import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'domkit/appendVendorPrefix';
import insertKeyframesRule from 'domkit/insertKeyframesRule';

/**
 * @type {Object}
 */
const keyframes = {
    '0%': {
        transform: 'rotate(0deg)'
    },
    '50%': {
        transform: 'rotate(180deg)'
    },
    '100%': {
        transform: 'rotate(360deg)'
    }
};

/**
 * @type {String}
 */
const animationName = insertKeyframesRule(keyframes);

const propTypes = {
	loading: PropTypes.bool,
	color: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const ptKeys = Object.keys(propTypes);

export default class RotateLoader extends Component {
    /**
     * @type {Object}
     */
    propTypes = propTypes;

    static defaultProps = {
        loading: true,
        color: '#ffffff',
        size: '15px',
        margin: '2px'
    }

    /**
     * @return {Object}
     */
    getBallStyle = () => ({
        backgroundColor: this.props.color,
        width: this.props.size,
        height: this.props.size,
        margin: this.props.margin,
        borderRadius: '100%',
        verticalAlign: this.props.verticalAlign
    })

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle = i => {
        const animation = [animationName, '1s', '0s', 'infinite', 'cubic-bezier(.7,-.13,.22,.86)'].join(' ');
        const animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode,
        };
    }

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle = i => {
        if (i) {
            return assign(
                this.getBallStyle(i),
                {
                    opacity: '0.8',
                    position: 'absolute',
                    top: 0,
                    left: i%2 ? -28 : 25,
					border: '0px solid transparent' // fix firefox/chrome/opera rendering
                }
            );
        }

        return assign(
            this.getBallStyle(i),
            this.getAnimationStyle(i),
            {
                display: 'inline-block',
                position: 'relative',
				border: '0px solid transparent' // fix firefox/chrome/opera rendering
            }
        );
    }

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader = loading => {
        if (loading) {
			const props = Object.assign({}, this.props);

			if (propTypes && ptKeys) {
				const klen = ptKeys.length;
				for (let i = 0; i < klen; i++) {
					delete props[ptKeys[i]];
				}
			}

            return (
				<div {...props}>
                    <div style={this.getStyle()}>
                        <div style={this.getStyle(1)}></div>
                        <div style={this.getStyle(2)}></div>
                    </div>
                </div>
            );
        }

        return null;
    }

    render() {
        return this.renderLoader(this.props.loading);
    }
}
