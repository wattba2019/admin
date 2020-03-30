// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) =>
//     <div>
//         <img alt="BackGroundImage" src={require('../assets/Path27909.png')}
//             style={{ width: 30, height: 40, }}
//         />
//     </div>
//     ;

// class SimpleMap extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             center: [54.992218402853496, -2.7072125843446315],
//             zoom: 7,
//             draggable: true,
//             lat: 54.992218402853496,
//             lng: -2.7072125843446315
//         }
//     }


//     onCircleInteraction(childKey, childProps, mouse) {
//         // function is just a stub to test callbacks
//         // this.setState({
//         //     lat: mouse.lat,
//         //     lng: mouse.lng
//         // });
//         console.log('onCircleInteraction called with', childKey, childProps, mouse);
//     }
//     onCircleInteraction3(childKey, childProps, mouse) {
//         this.setState({ draggable: true });
//         // function is just a stub to test callbacks  
//         console.log('onCircleInteraction called with', childKey, childProps, mouse);

//     }
//     _onChange = ({ center, zoom }) => {
//         this.setState({
//             center: center,
//             zoom: zoom,
//         });
//     }
//     _drag = ({ center, zoom, sdf }) => {
//         console.log(center, zoom, sdf, "ONDRAG")
//     }

//     render() {
//         return (
//             // Important! Always set the container height explicitly
//             <div style={{ height: '100vh', width: '100%' }}>
//                 <GoogleMapReact draggable={this.state.draggable}
//                     bootstrapURLKeys={{ key: "AIzaSyBQHKZTwhPJX_9IevM5jKC8kmz0NzqAaBk" }}
//                     defaultCenter={this.state.center}
//                     defaultZoom={this.state.zoom}
//                     onChange={this._onChange}
//                     onDragEnd={this._drag}
//                 // onChildMouseDown={this.onCircleInteraction}
//                 // onChildMouseUp={this.onCircleInteraction3}
//                 // onChildMouseMove={this.onCircleInteraction}
//                 >

//                     <AnyReactComponent
//                         lat={this.state.lat}
//                         lng={this.state.lng}
//                         text="My Marker"
//                     />

//                 </GoogleMapReact>
//             </div>
//         );
//     }
// }

// export default SimpleMap;


import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class SimpleMap extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        return (
            <Map google={this.props.google}
                style={{ width: '100%', height: '100%', position: 'relative' }}
                onClick={this.onMapClicked}>
                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                {/* <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow> */}
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBQHKZTwhPJX_9IevM5jKC8kmz0NzqAaBk")
})(SimpleMap)