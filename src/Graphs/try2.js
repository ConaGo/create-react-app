import React, {Component} from 'react'
import {ForceGraph2D} from 'react-force-graph'
import {Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Label, Input} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const WIND = 'WIND'
const TIDAL = 'TIDAL'
const SOLAR = 'SOLAR'

const SATURATED = 'SATURATED'
const OVER_SATURATED = 'OVER_SATURATED'
const UNDER_SATURATED = 'UNDER_SATURATED'

export default class Try extends Component {
    constructor(props) {
        super(props)
        this.graph = React.createRef();
        this.myRef = React.createRef();
        this.state = {

            dropdownOpen: false,
            dropdownOpen2: false,
            idCounter: 5,
            source: {},
            drain: {},
            startValue: 0,
            selectedPlant: 'wind',
            wind: 50,
            tidal: 50,
            solar: 50,
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
                    totalDemand: 2500,
                    name: 'Tokyo',
                    isSaturated: false
                },
                {
                    id:13,
                    currentSaturation: 0,
                    totalDemand: 800,
                    name: 'Berlin',
                    isSaturated: false
                },
                {
                    id:14,
                    currentSaturation: 0,
                    totalDemand: 1000,
                    name: 'Berlin',
                    isSaturated: false
                },
                {
                    id:15,
                    currentSaturation: 0,
                    totalDemand: 250,
                    name: 'Berlin',
                    isSaturated: false
                },
                {
                    id:16,
                    currentSaturation: 0,
                    totalDemand: 1000,
                    name: 'Berlin',
                    isSaturated: false
                }
            ],
            plants: [{
                    id:3,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: WIND,
                    connections: [1, 2, 13, 15],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name: 'WIND1'
                },{
                    id:4,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: TIDAL,
                    connections: [1, 2, 16, 13],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WAVE1'
                },
                {
                    id:5,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: TIDAL,
                    connections: [1, 2, 16, 15],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WAVE2'
                },
                {
                    id:6,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: TIDAL,
                    connections: [1, 2, 16,13,14],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WAVE3'
                },
                {
                    id:7,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: TIDAL,
                    connections: [2,16,15],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WAVE4'
                },
                {
                    id:8,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: TIDAL,
                    connections: [1, 13,16],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WAVE5'
                },
                {
                    id:9,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: TIDAL,
                    connections: [1, 2,16],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WAVE6'
                },
                {
                    id:10,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: TIDAL,
                    connections: [15],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WAVE7'
                },
                {
                    id:11,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: TIDAL,
                    connections: [1, 2,13],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WAVE8'
                },
                {
                    id:120,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: SOLAR,
                    connections: [1, 2,14,16],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'SOLAR1'
                },
                {
                    id:121,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: SOLAR,
                    connections: [14,16],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'SOLAR2'
                },
                {
                    id:123,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: SOLAR,
                    connections: [1, 2,14,16],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'SOLAR3'
                },
                {
                    id:124,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: SOLAR,
                    connections: [1, 2,15,13],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'SOLAR4'
                },
                {
                    id:125,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: SOLAR,
                    connections: [14,13],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'SOLAR5'
                },
                {
                    id:126,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: SOLAR,
                    connections: [14,13],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'SOLAR6'
                },
                {
                    id:127,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: SOLAR,
                    connections: [1, 2,15,13],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'SOLAR7'
                },
                {
                    id:128,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: SOLAR,
                    connections: [,14,13],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'SOLAR8'
                },
                {
                    id:129,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: SOLAR,
                    connections: [1, 2,14,13],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'SOLAR9'
                },
                {
                    id:130,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: SOLAR,
                    connections: [ 2,14,16],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'SOLAR10'
                },
                {
                    id:131,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: WIND,
                    connections: [1, 2,13,16],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WIND2'
                },
                {
                    id:132,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: WIND,
                    connections: [1, 2,13,16],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WIND3'
                },
                {
                    id:133,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: WIND,
                    connections: [1, 2,13,15],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WIND4'
                },
                {
                    id:134,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: WIND,
                    connections: [1, 2,13,15,16],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WIND5'
                },
                {
                    id:135,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: WIND,
                    connections: [1, 2,14],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WIND6'
                },
                {
                    id:136,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: WIND,
                    connections: [1,14,16],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WIND7'
                },
                {
                    id:137,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: WIND,
                    connections: [14,15,16],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WIND8'
                },
                {
                    id:138,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: WIND,
                    connections: [14,16,13],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WIND9'
                },
                {
                    id:139,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: WIND,
                    connections: [ 14,15],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WIND10'
                },
                {
                    id:140,
                    production:0,
                    isEmpty: false,
                    multiplier: 1,
                    type: WIND,
                    connections: [1,14,15],
                    previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                    name:  'WIND11'
                }
            ],
            data: {
                nodes: [
                    {
                        'id': 'id1',
                        'name': 'name1',
                        'val': 1,
                        isCity: false,
                        color: 'red',
                    },
                    {
                        'id': 'id2',
                        'name': 'name2',
                        'val': 0.5,
                        isCity: true,
                    },
                ],
                links: [
                    {
                        source: 'id1',
                        target: 'id2'
                    },
                ]
            },
        }
        this.handleAddNode = this.handleAddNode.bind(this)
        this.handleAddEdge = this.handleAddEdge.bind(this)
        this.toggleDropDown = this.toggleDropDown.bind(this)
        this.toggleDropDown2 = this.toggleDropDown2.bind(this)
        this.handleSetSource = this.handleSetSource.bind(this)
        this.handlePlantChange = this.handlePlantChange.bind(this)
        this.handleStartValueChange = this.handleStartValueChange.bind(this)
        this.handleTidalValueChange = this.handleTidalValueChange.bind(this)
        this.handleSolarValueChange = this.handleSolarValueChange.bind(this)
        this.handleWindValueChange = this.handleWindValueChange.bind(this)
        this.handleTurn = this.handleTurn.bind(this)
        this.formatData = this.formatData.bind(this)
    }
    componentWillMount(){
        const node = this.myRef.current
        console.log(node)   
        this.formatData()
        

    }
    handleAddNode(isCity) {
        console.log(isCity,this.state.drain.isCity+'isCitydrain')
        var type
        if (isCity) {
            type = 'black'
        } else {
            switch (this.state.selectedPlant) {
                case 'wind':
                    type = WIND
                    break
                case 'tidal':
                    type = TIDAL
                    break
                case 'solar':
                    type = SOLAR
                    break
                default:
            }
        }
            let id = this.state.idCounter
            if(isCity && Object.keys(this.state.source).length){
                this.setState(prevState => ({
                cities:[
                    ...prevState.cities,
                    {   
                        id:id,
                        currentSaturation: 0,
                        name: 'City' + id,
                        totalDemand: this.state.startValue * 3,
                        isSaturated: false
                    }
                ],    
                idCounter: prevState.idCounter + 1,      
            }))
            }else if (!isCity && Object.keys(this.state.drain).length){
                this.setState(prevState => ({
                    plants:[
                        ...prevState.plants,
                        {   
                            id:id,
                            production: 0,
                            multiplier: 1,
                            name: 'PowerPLant' + id,
                            type: type,
                            previousDecisions: [UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED, UNDER_SATURATED],
                            connections:[this.state.drain.id],
                            isEmpty: false
                        }
                    ],
                    idCounter: prevState.idCounter + 1,                 
                }))
            }
       this.formatData()
       console.log(this.state.data.links)
    }
    handleAddEdge() {
        if(Object.keys(this.state.source).length && Object.keys(this.state.drain).length){
        const source = this.state.source
        const drain = this.state.drain
        let plants = this.state.plants.filter(e=>e.id !== source.id)
        let plant = this.state.plants.filter(e=>e.id === source.id)
        if(plant.length<2){
            plant = plant.pop()
            console.log(plant)
            plant.connections.push(drain.id)
            plants.push(plant)
            console.log(plant+"solo")
            // console.log(plants)
            
                console.log(plants)
                this.setState({
                    plants:plants
                })
            }
        }
        this.formatData()
        // this.setState(prevState=>{
        //     //plants[source.id].connections[drain.id]:0
                
        //     }
        // })
    }
    handleSetSource(source) {
        console.log(source)
        this.setState({
            source: source
        })
    }
    handleSetDrain(drain) {
        console.log(drain)
        this.setState({
            drain: drain
        })
    }
    toggleDropDown() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }
    toggleDropDown2() {
        this.setState(prevState => ({
            dropdownOpen2: !prevState.dropdownOpen2
        }))
    }
    handleStartValueChange(event) {
        this.setState({startValue: event.target.value})
    }
    handleTidalValueChange(event) {
        this.setState({tidal: event.target.value})
    }
    handleSolarValueChange(event) {
        this.setState({solar: event.target.value})
    }
    handleWindValueChange(event) {
        this.setState({wind: event.target.value})
    }
    handlePlantChange = changeEvent => {
        this.setState({
            selectedPlant: changeEvent.target.value
        })
    }
    handleTurn() {
        let nodes = this.state.data.nodes
        // const cities = nodes.filter(e => e.isCity)
        // console.log(cities)
        const powerPlants = nodes.filter(e => !e.isCity)
        const links = this.state.data.links

        let cities = [...this.state.cities]
        let plants = [...this.state.plants]

        // recalculate base values
        const wind = this.state.wind
        const tidal = this.state.tidal
        const solar = this.state.solar
        console.log(wind,tidal,solar)
        let areAllPlantsEmpty = false
        let areAllCitiesSaturated = false
        for(let p in this.state.plants){
            let plant = plants[p]
            switch(plant.type){
                case WIND: 
                    plant.production = Math.floor(plant.multiplier*wind)
                    break
                case TIDAL:
                    plant.production = Math.floor(plant.multiplier*tidal)
                    break
                default:
                    plant.production = Math.floor(plant.multiplier*solar)
            }
        }
        let breaker = 0
        while(!areAllPlantsEmpty && !areAllCitiesSaturated && breaker<150){
            breaker++
            for(let p in plants){
                //console.log('looking at '+plants[p].name + ' with production of ' + plants[p].production)
                if(plants[p].isEmpty){
                    //console.log('plant empty '+ plants[p].name)
                    continue
                }
                    
                for(let c in plants[p].connections){
                    let drainID = plants[p].connections[c]
                    let city
                    let citiesTemp
                    
                    citiesTemp = cities.filter(e=>e.id !== drainID)
                    city = cities.filter(e=>e.id === drainID)
                    
                    if(city[0].isSaturated ){
                        //console.log('city saturated '+ city.name)
                        continue
                    }   
                    else{
                        
                        if(plants[p].production <=0){
                            console.log('plant empty '+ plants[p].name)
                            plants[p].isEmpty = true
                            
                        }else{
                            city[0].currentSaturation +=10
                            plants[p].production -= 10    
                        }
                            
                        if(city[0].currentSaturation >= city[0].totalDemand){
                            console.log('city full '+ city.name)
                            city[0].isSaturated = true
                        }
                        
                    }
                    citiesTemp = citiesTemp.concat(city)
                    cities = [...citiesTemp]
                }
            }
            areAllPlantsEmpty = true
            for(let p in plants)              
                if(!plants[p].isEmpty)
                    areAllPlantsEmpty = false
            areAllCitiesSaturated = true
            for(let c in cities)
                if(!cities[c].isSaturated)
                    areAllCitiesSaturated = false
        }
        for(let c in cities){

            console.log(cities[c].name + " Saturated with " + cities[c].currentSaturation + " from " + cities[c].totalDemand)
        }
        for(let p in plants){
            let saturated = true 
            console.log('calculating ' + plants[p].name + ' Subnet...')
            for(let c in plants[p].connections){
                let drainID = plants[p].connections[c]
                
                let city = cities.filter(e=>e.id === drainID)

                if(!city[0].isSaturated){
                   saturated = false 
                }
            }
            
            plants[p].previousDecisions.pop()
            
            
            if(saturated){
                
                plants[p].previousDecisions.unshift(OVER_SATURATED)
                console.log(OVER_SATURATED)
            }else{
                plants[p].previousDecisions.unshift(UNDER_SATURATED)
                console.log(UNDER_SATURATED)
            }

            let decisionCounter = 0
            
            for(let e in plants[p].previousDecisions){
                
                switch(plants[p].previousDecisions[e]){
                    case SATURATED:
                        decisionCounter += 2
                       
                        break
                    case OVER_SATURATED:
                        
                        decisionCounter = decisionCounter++
                        break
                    default:
                        decisionCounter -= 2
                }
                
                
            }
            
            if(decisionCounter >= 9){
                    //DECREASE
                    console.log('Decreasing Capacity')
                    plants[p].multiplier -= 0.1
                }    
                else if(decisionCounter>=5){
                    //DO NOTHING
                    plants[p].previousDecisions.shift()
                    plants[p].previousDecisions.unshift(SATURATED)   
                }else{
                    console.log('Increasing Capacity')
                    plants[p].multiplier += 0.1
                }
            const wind = 50 +this.getRandomInt(90)
            const tidal = 50 +this.getRandomInt(60)
            const solar = 50 +this.getRandomInt(70)
            this.setState({
                tidal:tidal,
                wind:wind,
                solar:solar,
                cities: cities,
                plants: plants
            })
            
        }    
            

        //  areAllPlantsEmpty = false => plants.filter(p.energyLeft).length === 0
        //  areAllCitiesSaturated = false => cities.filter(!c.isSaturated).length === 0
        //  iterate over plants as areAllPlantsEmpty || areAllCitiesSaturated
        //      calculate plant_energy (floored value)
        //      iterate over connections
        //          if saturationRatio < 1 then move '10' plant_energy to city
        //          else city.isSaturated = true
        //      if plant_energy <= 0 then plant.energyLeft = false

        //  iterate over plants
        //      calculate sub-net saturation
        //      plant.previousDecisions is
            //      if saturationRation < 1 then UNDER_SATURATED
            //      if saturationRation === 1 then SATURATED
            //      if saturationRation > 1 then OVER_SATURATED
        //

        //  === decision making ===
        //  iterate over plants
        //      if previousDecisions.filter(v === UNDER_SATURATED).length > 0 then increase plant.multiplier by 0.1
        //      else if previousDecisions.filter(v === OVER_SATURATED).length === 5 then decrease plant.multiplier by 0.1
        //
        this.formatData()
    }
    getRandomInt(range) {
        return Math.floor(Math.random() * (range)) - (range / 2)
    }
    formatData() {
        let nodes = []
        let links = []
        this.state.cities.map(e => {
            e.isSaturated = false
            e.currentSaturation = 0
            nodes.push({
                id:e.id,
                name:e.name,
                val:e.totalDemand/200,
                isCity:true,
                color:'black'
            })
        })
        let color
        this.state.plants.map(e =>{
            e.production = 0
            e.isEmpty = false
            switch(e.type){
                case WIND:
                    color = 'grey'
                    break
                case TIDAL:
                    color = 'blue'
                    break;
                default:
                    color = 'yellow'
            }
            e.connections.map(c=>{
                links.push({
                    source:e.id,
                    target:c
                })
            })
            nodes.push({
                name:'Plant'+e.id,
                id:e.id,
                val:e.multiplier,
                isCity:false,
                color:color
            })
        })
        this.setState({
            data:{
                nodes: nodes,
                links: links
            }
        })
        // setTimeout(function(){
        //     console.log(nodes)//do what you need here
        //     console.log(links)
        // }, 1);
        
    }
    render() {
        const data = this.state.data
        const sourceName = this.state.source.name
        const drainName = this.state.drain.name
        const startValue = this.state.startValue
        const tidalValue = this.state.tidalValue
        const solarValue = this.state.solarValue
        const windValue = this.state.windValue

        return (
            <div>
                <Button onClick={() => this.handleAddNode(true)}>add a City</Button>
                <Button onClick={() => this.handleAddNode(false)}>add a Power Plant</Button>
                <Button onClick={() => this.handleTurn()}>One Turn</Button>
                <Button onClick={() => this.handleAddEdge()}>Add Connection</Button>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                    <DropdownToggle caret>
                        <p>Connection Drain</p>
                        {drainName}
                    </DropdownToggle>
                    <DropdownMenu>

                        {this.state.data.nodes.filter((item)=>item.isCity).map((item, i) => <DropdownItem key={i}
                                                                              onClick={() => this.handleSetDrain(item, i)}>{item.name}</DropdownItem>)}

                    </DropdownMenu>
                </Dropdown>
                <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggleDropDown2}>
                    <DropdownToggle caret>
                        <p>Connection Source</p>
                        {sourceName}
                    </DropdownToggle>
                    <DropdownMenu>

                        {this.state.data.nodes.filter((item)=>!item.isCity).map((item, i) => <DropdownItem key={i}
                                                                              onClick={() => this.handleSetSource(item, i)}>{item.name}</DropdownItem>)}

                    </DropdownMenu>
                </Dropdown>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label>Starting Value: {startValue}</label>
                    <input type="range" max="100" step="1" value={this.state.startValue}
                           onChange={this.handleStartValueChange}></input>
                    <label>Wave Value: {tidalValue}</label>
                    <input type="range" max="100" step="1" value={this.state.tidal}
                           onChange={this.handleTidalValueChange}></input>
                    <label>Solar Value: {solarValue}</label>
                    <input type="range" max="100" step="1" value={this.state.solar}
                           onChange={this.handleSolarValueChange}></input>
                    <label>Wind Value: {windValue}</label>
                    <input type="range" max="100" step="1" value={this.state.wind}
                           onChange={this.handleWindValueChange}></input>
                </div>

                <div>
                    <FormGroup tag="fieldset">
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1"
                                       value={'tidal'}
                                       checked={this.state.selectedPlant === 'tidal'}
                                       onChange={this.handlePlantChange}
                                />{' '}
                                Wave
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1"
                                       value={'solar'}
                                       checked={this.state.selectedPlant === 'solar'}
                                       onChange={this.handlePlantChange}
                                />{' '}
                                Solar
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1"
                                       value={'wind'}
                                       checked={this.state.selectedPlant === 'wind'}
                                       onChange={this.handlePlantChange}
                                />{' '}
                                Wind
                            </Label>
                        </FormGroup>
                    </FormGroup>
                </div>
                <ForceGraph2D ref={this.graphRef} graphData={data}></ForceGraph2D>

            </div>

        )
    }
}