

const WIND = 'WIND'
const TIDAL = 'TIDAL'
const SOLAR = 'SOLAR'

const SATURATED = 'SATURATED'
const OVER_SATURATED = 'OVER_SATURATED'
const UNDER_SATURATED = 'UNDER_SATURATED'


const data1={


cities: [
    {
        id:1,
        currentSaturation: 0,
        totalDemand: 1500,
        name: 'Berlin',
        isSaturated: false
    }
    ,
    {
        id:2,
        currentSaturation: 0,
        totalDemand: 1500,
        name: 'Tokyo',
        isSaturated: false
    },
    {
        id:3,
        currentSaturation: 0,
        totalDemand: 1500,
        name: 'Berlin',
        isSaturated: false
    },
    {
        id:4,
        currentSaturation: 0,
        totalDemand: 1500,
        name: 'Berlin',
        isSaturated: false
    },
    {
        id:5,
        currentSaturation: 0,
        totalDemand: 1500    ,
        name: 'Berlin',
        isSaturated: false
    },
    {
        id:6,
        currentSaturation: 0,
        totalDemand: 1500,
        name: 'Berlin',
        isSaturated: false
    },
    {
        id:7,
        currentSaturation: 0,
        totalDemand: 1500,
        name: 'Berlin',
        isSaturated: false
    },
    {
        id:8,
        currentSaturation: 0,
        totalDemand: 1500,
        name: 'Berlin',
        isSaturated: false
    },
    {
        id:9,
        currentSaturation: 0,
        totalDemand: 1500,
        name: 'Berlin',
        isSaturated: false
    },
    {
        id:10,
        currentSaturation: 0,
        totalDemand: 1500,
        name: 'Berlin',
        isSaturated: false
    },
    {
        id:11,
        currentSaturation: 0,
        totalDemand: 1500,
        name: 'Berlin',
        isSaturated: false
    }
],
plants: [{
        id:20,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: TIDAL,
        connections: [1],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'WAVE1'
    },
    {
        id:21,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: TIDAL,
        connections: [1],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'WAVE2'
    },
    {
        id:22,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: TIDAL,
        connections: [1],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'WAVE3'
    },
    {
        id:23,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: TIDAL,
        connections: [7,8],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'WAVE4'
    },
    {
        id:30,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: SOLAR,
        connections: [1, 2, 3],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'SOLAR1'
    },
    {
        id:31,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: SOLAR,
        connections: [6],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'SOLAR2'
    },
    {
        id:32,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: SOLAR,
        connections: [6],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'SOLAR3'
    },
    {
        id:33,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: SOLAR,
        connections: [6],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'SOLAR4'
    },
    {
        id:34,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: SOLAR,
        connections: [8, 9],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'SOLAR5'
    },
    {
        id:40,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: WIND,
        connections: [8,7],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'WIND2'
    },
    {
        id:41,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: WIND,
        connections: [5],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'WIND3'
    },
    {
        id:42,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: WIND,
        connections: [5],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'WIND4'
    },
    {
        id:43,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: WIND,
        connections: [5],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'WIND5'
    },
    {
        id:44,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: WIND,
        connections: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'WIND6'
    },
    {
        id:45,
        production:0,
        isEmpty: false,
        multiplier: 1,
        type: WIND,
        connections: [3,4],
        previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
        name:  'WIND7'
    }
]}