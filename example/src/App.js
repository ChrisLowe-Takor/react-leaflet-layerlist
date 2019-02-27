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
							<div>
								<h2>Elements in a div</h2>
								<p>With nested stuff</p>
							</div>
						</LayerListItem>

						<LayerListItem>
							<h2>Element in a div</h2>
						</LayerListItem>

						<LayerListItem>
							Bare string in a div
						</LayerListItem>

						<LayerListItem>
							<ul>
								<li>List</li>
								<li>List</li>
								<li>List</li>
								<li>List</li>
								<li>List</li>
								<li>List</li>
							</ul>
						</LayerListItem>

						<LayerListItem>
							<div>
								<h2>Image in a div</h2>
								<img src="https://i.imgur.com/BSBVtHJ.jpg" width={200} />
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
