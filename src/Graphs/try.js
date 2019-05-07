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
        // Don't call this.setState() here!
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
            cities: {
                1: {
                    currentSaturation: 0,
                    totalDemand: 250,
                    name: 'Berlin'
                }
                ,
                2: {
                    currentSaturation: 0,
                    totalDemand: 250,
                    name: 'Tokyo'
                }
            },
            plants: {
                3: {
                    production:0,
                    multiplier: 1,
                    type: WIND,
                    connections: [{1: 50}],
                    previousDecisions: [SATURATED, OVER_SATURATED, SATURATED, OVER_SATURATED, UNDER_SATURATED],
                },
                4: {
                    production:0,
                    multiplier: 1,
                    type: TIDAL,
                    connections: [{1: 40}, {2: 60}],
                    previousDecisions: [SATURATED, OVER_SATURATED, SATURATED, OVER_SATURATED, SATURATED],
                }
            },
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
                let cities = this.state.cities
                cities[id] = {
                    currentSaturation: 0,
                    name: 'City' + id,
                    totalDemand: this.state.startValue * 3,
                }
                this.setState(prevState => ({
                cities:cities,    
                idCounter: prevState.idCounter + 1,      
            }))
            }else if (!isCity && Object.keys(this.state.drain).length){
                let plants = this.state.plants
                plants[id] = {
                    multiplier: 1,
                    name: 'PowerPLant' + id,
                    type: type,
                    previousDecisions: [SATURATED, OVER_SATURATED, SATURATED, OVER_SATURATED, UNDER_SATURATED],
                    connections:[{[this.state.drain.id]:0}]
                }
                this.setState(prevState => ({
                    plants:plants,
                    idCounter: prevState.idCounter + 1,                 
                }))
            }
       this.formatData()
       console.log(this.state.links)
    }
    handleAddEdge() {
        const source = this.state.source
        const drain = this.state.drain
        console.log(source)
        console.log(drain)
        let plants = this.state.plants
        plants[source.id].connections[0][drain.id] = 0
        if(Object.keys(this.state.source).length && Object.keys(this.state.drain).length){
            console.log(plants)
            this.setState({
                plants:plants
            })
        }
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

        let cities = this.state.cities
        let plants = this.state.plants
        cities[1] ={}
        console.log(cities)
        
        // recalculate base values
        const wind = this.state.wind +this.getRandomInt(40)
        const tidal = this.state.wind +this.getRandomInt(20)
        const solar = this.state.wind +this.getRandomInt(30)
        let areAllPlantsEmpty = false
        let areAllCitiesSaturated = false
        for(let p in this.state.plants){
            console.log(p)                




        }
        // while(!areAllPlantsEmpty || !areAllCitiesSaturated){
        //     for(let p in this.state.plants){
                            




        //     }






        // }
            

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
        let ids = Object.keys(this.state.cities)
        let i = 0
        let e
        for (let nrr in this.state.cities){
            e = this.state.cities[nrr]
            nodes.push({
                id:ids[i++],
                name:e.name,
                val:e.totalDemand/50,
                isCity:true,
                color:'black'
            })
        }
        let color
        let j = 0
        
        ids = Object.keys(this.state.plants)
        for (let nr in this.state.plants){
            e = this.state.plants[nr]
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
            for (let c in e.connections){
               links.push({
                   source: ids[j],
                   target: Object.keys(e.connections[c]).toString()
               }) 
            }  
            nodes.push({
                name:'Plant'+(ids[j]),
                id:ids[j++],
                val:e.multiplier*5,
                isCity:false,
                color:color
            })
            
        }    
        
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
                <p>hallo</p>
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
                                Tidal
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
                <ForceGraph2D graphData={data}></ForceGraph2D>

            </div>

        )
    }
}