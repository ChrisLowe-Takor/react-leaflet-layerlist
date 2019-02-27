import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import { ReactLeafletLayerList, LayerListItem } from 'react-leaflet-styled-layerlist'

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

						<LayerListItem>
							<div className="test-div">
								<h2>Some title</h2>
								<p>With nested stuff</p>
							</div>
						</LayerListItem>

						<LayerListItem>
							<div>
								<h2>My Fancy Title</h2>
							</div>
						</LayerListItem>
							

						<LayerListItem>
							<p>My thing</p>
						</LayerListItem>
					
					</ReactLeafletLayerList>
		
				</Map>
			</div>
		)
	}
}
