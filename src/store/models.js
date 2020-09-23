import _ from 'underscore'

export const inboundData = {
    state: {},
    reducers: {
        update(state, value) {
            return _.extend({}, state, value);
        }
    }
};

export const outboundEvent = {
    state: {},
    reducers: {
        send(state, value) {
            //updates the state with the inbound event data.
            console.log('redux send value: ' + JSON.stringify(value));
            return _.extend({}, state, {[value.key]: value});
        }
    }
};

export const songsList = {
    state: [],
    reducers: {
        update(state, value) {
            const list = _.extend([], state, value);
            console.log(list);
            return list;
        }
    }
};

export const songFolders = {
    state: [],
    reducers: {
        add(state, value) {
            let newState = [];
            newState.push(value)
            return state.concat(newState)
        },
        update(state, value) {
            return state
                //an empty folder with the updated uuid exists, override with the folder data
                .map(folder => {
                    if (folder.uuid === value.uuid) {
                        return value
                    }
                    return folder
                })
                //reduce duplicates
                .reduce((accumulator, current) => {
                        return accumulator.some(x => x.dirName.toLowerCase() === current.dirName.toLowerCase()) ? accumulator : [...accumulator, current]
                    }, []
                )
        },
        //value == uuid
        remove(state,value){
            return state.filter(folder=>{
                return folder.uuid !== value;
            })
        }
    }
}

function uniqueBy(arr, prop) {
    return arr.reduce((a, d) => {
        if (!a.includes(d[prop])) {
            a.push(d[prop]);
        }
        return a;
    }, []);
}

export const songDownloadRequest = {
    state: {
        currentVideo: {}
    },
    reducers: {
        update(state, value) {
            // state.downloadedVideos.push(value)
            state.currentVideo = value

            return state;
        },
    }
};


export const downloadedSongs = {
    state: {},
    reducers: {
        update(state, value) {

            console.log("state before: " + JSON.stringify(state));
            if (!state[value.folderName]) {
                state[value.folderName] = []
            }

            state[value.folderName].push(value)
            console.log("state after: " + JSON.stringify(state));
            return state;
        },
    }
};

export const getInfoTrigger = {
    state: {},
    reducers: {
        update(state, value) {

            // state[value] = true;
            // console.log("state after: " + JSON.stringify(state));
            // return state;
            const list = _.extend([], state, value);
            console.log(list);
            return list;

        },
    }
};

export const downloadSongsProgress = {
    state: {},
    reducers: {
        update(state, value) {
            const list = _.extend([], state, value);
            console.log(list);
            return list;
        }
    }
};


//
// export const database = {
//     state: {},
//     reducers: {
//         insert(state, value) {
//             return _.extend({}, state, { [value.key]: value });
//             //updates the state with the inbound event data.
//             // console.log('redux send value: '+JSON.stringify(value));
//             // return _.extend({}, state, { [value.key]: value });
//         }
//     }
// };

//
// export const songDownloads = {
//     state: { },
//     reducers: {
//         request(state, value) {
//             return _.extend({}, state, value);
//         }
//     }
// };


export const foldersPopupVisible = {
    state: false,
    reducers: {
        toggle(state, value) {
            // return state.startDisabled = !state;
            // state = value;
            return !state;
            // return !state;
        }
    }
};

export const songsListPopup = {
    state: false,
    reducers: {
        toggle(state, value) {
            // return state.startDisabled = !state;
            // state = value;
            return !state;
            // return !state;
        }
    }
};

export const playerPopupVisible = {
    state: false,
    reducers: {
        toggle(state, value) {
            // return state.startDisabled = !state;
            // state = value;
            return !state;
            // return !state;
        }
    }
};


export const playerSongData = {
    state: {},
    reducers: {
        update(state, value) {
            // state.downloadedVideos.push(value)
            state = value

            return state;
        },
        updateSongIndex(state,value){
            state.songIndex = value;
            return state;
        }
    }
};

export const songsListPopupData = {
    state: {},
    reducers: {
        update(state, value) {
            // state.downloadedVideos.push(value)
            state = value

            return state;
        },
    }
};
//

//

// export const songListScreen = {
//     state: {
//         isVisible: false,
//         songTitle: ''
//     },
//     reducers: {
//         toggle(state, value) {
//             // return state.startDisabled = !state;
//             // state = value;
//             return {
//                 isVisible: value.isVisible,//!state.isVisible,
//                 songTitle: value.songTitle
//             };
//             // return !state;
//         }
//     }
// };

const setUSerName = () => {
    const {username, clientId} = this.state;
    return {
        type: "set-username",
        clientId: clientId,
        username: username,
        date: Date.now()
    };
};

const getObjectsDiff = (base, object) => {

    function changes(base, object) {
        return _.transform(object, function (result, value, key) {
            if (!_.isEqual(value, base[key])) {
                result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
            }
        });
    }

    return changes(base, object);
}
