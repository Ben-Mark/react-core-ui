import React, {Component} from 'react'
import faker from "faker";
import {connect} from "react-redux";
import env from '../env.json'

class WebSocket extends Component {
    state = {
        username: faker.internet.userName(),
        eventToSend: this.props.sendEvent,
        roomId: env.ROOM_ID,
        clientId: ''
    }

    /**
     * this.props.dispatch.outboundEvent.send({event})
     * @param data
     */
    send = (data) => {

        //the redux outbound state contains state:{ songsList: [event], song1: [event] }
        //on each
        Object.values(data).forEach(payload => {

            const event = {
                ...{
                    clientId: this.props.inboundData.clientId,
                    roomId: this.state.roomId
                },
                ...payload
            }
            this.state.ws.send(JSON.stringify(event))
        })

    }

    componentDidUpdate(preProps) {
        if (preProps.outboundEvent !== this.props.outboundEvent) {

            Object.keys(preProps.outboundEvent).forEach(prevKey =>{
                delete this.props.outboundEvent[prevKey]
            })

            this.send(this.props.outboundEvent)
        }
    }

    componentDidMount() {
        this.reconnect = !!this.props.reconnect
        this._handleWebSocketSetup()
    }

    componentWillUnmount() {
        this.reconnect = false
        this.state.ws.close()
    }

    _handleWebSocketSetup = () => {
        //ws://${this.socketURL}?roomId=${roomId}
        const serverUrl = `ws://${env.CRCA_SERVER_URL}/ws?roomId=${this.state.roomId}`;
        const ws = new WebSocket(serverUrl, "json")
        ws.onopen = () => {
            this.props.onOpen && this.props.onOpen()
        }
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            //organizes models.inboundData fields for the in memory state from the socket.
            data[data.key] = data.payload
            this.props.dispatch.inboundData.update(data);

            // if(data.type === 'download-song-progress'){
            //     console.log(this.props.inboundData);
            // }
        }
        ws.onerror = (error) => {
            this.props.onError && this.props.onError(error)
        }
        ws.onclose = () => {
            this.reconnect ? this._handleWebSocketSetup() : (this.props.onClose && this.props.onClose())
        }
        this.setState({ws})
    }

    render() {
        return null
    }

}


export default connect(
    state => {
        return state;
    },
    dispatch => {
        return {
            dispatch: dispatch
        }
    }
)(WebSocket);
