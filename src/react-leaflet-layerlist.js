import React, { Children, Component, cloneElement, Fragment } from 'react';
var ReactDOM = require('react-dom');
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import './styles.css';

import { MapControl, withLeaflet } from 'react-leaflet';

import L from 'leaflet';



L.Control.LayerListControl = L.Control.extend({
	_layerListContainer: null,
	_isOpen: false,
	_layerlistItems: [],
	_children: [],
	_closeButton: null,
	initialize: function(element) {
		this.options.position = element.position;
		this._children = element.children;
		this._layerListItems = new Array();
	},
	onAdd: function(map) {
		this._layerListContainer = L.DomUtil.create('div', 'layer-list-button closed');

		L.DomEvent.on(this._layerListContainer, 'click', () => {
			this.open(map);
		});

		L.DomEvent.on(this._map, 'click', () => {
			if (this._isOpen) {
				this.close(map);
			}
		});

		L.DomEvent.disableClickPropagation(this._layerListContainer);
		return this._layerListContainer;
	},
	onRemove: function(map) {
		// Do nothing
	},
	open: function(map) {
		if (!this._isOpen) {
			L.DomUtil.removeClass(this._layerListContainer, 'closed');
			L.DomUtil.addClass(this._layerListContainer, 'open');
			this._showCloseButton();
			this._showLayerlistElements(map);
			this._isOpen = true;			
		}
	},
	close: function(map) {
		L.DomUtil.removeClass(this._layerListContainer, 'open');
		L.DomUtil.addClass(this._layerListContainer, 'closed');
		this._removeLayerlistElements(map);
		L.DomUtil.remove(this._closeButton);
		this._closeButton = null;
		this._isOpen = false;

	},
	_showCloseButton: function() {
		this._closeButton = L.DomUtil.create('a', 'close-button', this._layerListContainer);
		this._closeButton.innerHTML = 'Close';
		L.DomEvent.disableClickPropagation(this._closeButton);
		L.DomEvent.on(this._closeButton, 'click', (ev) => {
			L.DomEvent.stopPropagation(ev);
			this.close(this._map);
		})
	},
	_showLayerlistElements: function(map) {
		for (var index = 0; index < this._children.length; index++) {
			var item = this._children[index];
			var container = L.DomUtil.create('div', 'container', this._layerListContainer);
			this._layerListItems.push(container);
			const el = ReactDOM.createPortal(item, container);
			ReactDOM.render(el, container);
			
		}
	},
	_removeLayerlistElements: function(map) {
		for (var index = 0; index < this._layerListItems.length; index++) {
			var item = this._layerListItems[index];
			L.DomUtil.remove(item);
		}
		this._layerListItems = [];
	}
});

L.control.layerListControl = (opts) => {
    return new L.Control.LayerListControl({...opts});
}

class ReactLeafletLayerList extends MapControl {

	constructor(props) {
		super(props);
	}

	createLeafletElement(props) {
		return L.control.layerListControl({position: 'topright', ...props});
	}
}

export default withLeaflet(ReactLeafletLayerList);


ReactLeafletLayerList.propTypes = {
	position: PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft'])
};
