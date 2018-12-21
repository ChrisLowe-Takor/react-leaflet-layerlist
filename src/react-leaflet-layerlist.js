import React, { Children, Component, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import { MapControl, withLeaflet } from 'react-leaflet';

import L from 'leaflet';


class LayerListItem {
	element;
	tagName;
	className;
	container;
	style;
	onAdd;
	onRemove;
	onClick;
}

L.Control.LayerListControl = L.Control.extend({
	_layerListContainer: null,
	_isOpen: false,
	_layerlistItems: [],
	initialize: function(element) {
		this.options.position = element.position;
		console.log(element.children);
	},
	onAdd: function(map) {
		this._layerListContainer = L.DomUtil.create('div', 'layer-list-button closed');

		L.DomEvent.on(this._layerListContainer, 'mouseenter', () => {
			this.open(map);
		});

		L.DomEvent.on(this._layerListContainer, 'mouseleave', () => {
			this.close(map);
		});

		L.DomEvent.disableClickPropagation(this._layerListContainer);

		var soarLogo = new LayerListItem();
		soarLogo.tagName = 'a';
		soarLogo.className = 'soar-logo-img';
		soarLogo.container = this._layerListContainer;	
		
		soarLogo.onAdd = function() {
			this.element.src="#";
			this.element.innerHTML = 'test';
		}

		soarLogo.onClick = function() {
			console.log("Clicked: ");
			console.log(this);
		}
	
		this._layerlistItems.push(soarLogo);
		return this._layerListContainer;
	},
	onRemove: function(map) {
		// Do nothing
	},
	open: function(map) {
		if (!this._isOpen) {
			L.DomUtil.removeClass(this._layerListContainer, 'closed');
			L.DomUtil.addClass(this._layerListContainer, 'open');
			this._showLayerlistElements(map);
			this._isOpen = true;
		}
	},
	close: function(map) {
		if (this._isOpen) {
			L.DomUtil.removeClass(this._layerListContainer, 'open');
			L.DomUtil.addClass(this._layerListContainer, 'closed');
			this._removeLayerlistElements(map);
			this._isOpen = false;
		}
	},
	_showLayerlistElements: function(map) {
		this._layerlistItems.map(function(item) {
			item.element = L.DomUtil.create(item.tagName, item.className, item.container);
			item.element.style = item.style;
			if (typeof item.onAdd === 'function') {
				item.onAdd();
			}

			if (typeof item.onClick === 'function') {
				L.DomEvent.on(item.element, 'click', () => {
					item.onClick();
				});
			}

			
		});
	},
	_removeLayerlistElements: function(map) {
		this._layerlistItems.map(function(item) {
			L.DomUtil.remove(item.element);
			if (typeof item.onRemove === 'function') {
				item.onRemove();
			}
		});
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
		console.log(props.children);
		return L.control.layerListControl({position: 'topleft', ...props});
		
	}
}

export default withLeaflet(ReactLeafletLayerList);


ReactLeafletLayerList.propTypes = {
	position: PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft'])
};
