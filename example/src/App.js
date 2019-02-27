import React, { Component } from 'react'
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import { ReactLeafletLayerList, GenericLayerListItem, LayerListHeader } from 'react-leaflet-styled-layerlist'

export default class App extends Component {

	render () {
		return (
			<div className="map">
				<Map
					ref={(ref) => this.ref}
					center={[44.635, 22.653]}
					zoom={12}
					zoomControl={false} >

					<TileLayer
							attribution=""
							url="https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"/>
				
					<ZoomControl />


					<ReactLeafletLayerList>

						<LayerListHeader>
							<div>
								<h2>Some title</h2>
							</div>
						</LayerListHeader>

						<LayerListHeader className="my-header">
							<div>
								<h2>My Fancy Title</h2>
							</div>
						</LayerListHeader>
							

						<LayerListHeader>
							<p>My thing</p>
						</LayerListHeader>
					
					</ReactLeafletLayerList>
		
				</Map>
			</div>
		)
	}
}
