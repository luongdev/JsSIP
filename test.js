const UA = require('./lib/UA')

console.log(UA)

const NodeWebSocket = require('@meecode/jssip-node-websocket')
const { MediaStream } = require('@roamhq/wrtc')

const configuration = {
    uri: 'sip:10000@voiceuat.metechvn.com',
    password: 'Abcd@54321',
    sockets: [new NodeWebSocket('ws://101.99.20.58:7080')],
    session_timers: false,
}


const ua = new UA(configuration)

ua.on('registered', (e) => {
    console.log('registered', e)
})

ua.on('registrationFailed', (e) => {
    console.log('registrationFailed', e)
})

ua.start()

ua.register()

const remoteStream = new MediaStream()

ua.on('newRTCSession', function (data) {
    const session = data.session;
    if (session.direction === 'incoming') {
        console.log('Incoming call from ' + session.remote_identity.uri)
        // Set up audio output when the session is accepted
        
        session.on('accepted', function (e) {
            

            // session.connection.getReceivers().forEach(function (receiver) {
            //     remoteStream.addTrack(receiver.track)
            // })

            // const audioElement = document.getElementById('remoteAudio')
            // audioElement.srcObject = remoteStream
            // audioElement
            //     .play()
            //     .catch((error) =>
            //         console.error('Error playing remote audio:', error)
            //     )

            console.log('Call accepted and audio is playing')
        })

        session.answer({
            mediaStream: remoteStream,
            mediaConstraints: { audio: true, video: false },
            pcConfig: {
                iceServers: [], // specify your ICE servers here if needed
            },
        })
    }
})

console.log('ENNNNn')