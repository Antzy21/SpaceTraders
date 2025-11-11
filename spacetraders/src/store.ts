import { reactive } from 'vue'
import type { Ship } from './types/ship'
import type { System } from './types/Location/system'
import { getContracts, getMarket, getMyShips, getShipyard, getSystem, getSystemWaypoints, getWaypoint } from './api'
import type { Contract } from './types/contract'
import type { Waypoint } from './types/Location/waypoint'
import type { Market } from './types/market'
import type { Shipyard } from './types/shipyard'

function getSystemSymbolFromWaypointSymbol(waypointSymbol: string): string {
  return `${waypointSymbol.split('-')[0]}-${waypointSymbol.split('-')[1]}`
}

async function loadOrbitals(waypoint: Waypoint) {
  let orbitalWaypoints: Waypoint[] = [];
  for (let i = 0; i < waypoint.orbitals.length; i++) {
    const orbital = waypoint.orbitals[i];
    let orbitalWaypoint = await getWaypoint(store.system.symbol, orbital!.symbol)
    orbitalWaypoints.push(orbitalWaypoint);
  }
  return orbitalWaypoints;
}

async function loadSystemWaypoints(systemSymbol: string, systemWaypointCount: number) {
  let systemWaypoints: Waypoint[] = [];
  for (let index = 0; index < systemWaypointCount; index+=20) {
    let waypointPageList = await getSystemWaypoints(systemSymbol)
    waypointPageList?.forEach(async waypoint => {
      if (waypoint.symbol == "X1-BH98-A1") {
        console.log("loading orbitals");
      }
      waypoint.orbitalWaypoints = await loadOrbitals(waypoint);
      if (waypoint.symbol == "X1-BH98-A1") {
        console.log("orbitals loaded");
      }
      systemWaypoints.push(waypoint);
    });
  }
  return systemWaypoints;
}

export const store = reactive({
  env: { API_BASE_URL: "https://api.spacetraders.io/v2", AGENT_TOKEN: import.meta.env.API_BASE_URL },
  locationSearch: "",
  system: {} as System,
  markets: [] as Market[],
  shipyards: [] as Shipyard[],
  myShips: [] as Ship[],
  myContracts: [] as Contract[],
  loadShips() {
    getMyShips().then(response => {
        this.myShips = response
    })
  },
  loadContracts() {
    getContracts().then(response => {
        this.myContracts = response
    })
  },
  loadSystem(sectorSymbol: string) {
    getSystem(sectorSymbol).then(response => {
      loadSystemWaypoints(response.symbol, response.waypoints.length)
      .then((waypoints) => {
        response.waypoints = waypoints
      })
      this.system = response;
    })
  },
  async getMarket(waypointSymbol: string) {
    var existingMarket = this.markets.find(m => m.symbol == waypointSymbol)
    if (existingMarket) {
      return existingMarket
    }
    await getMarket(getSystemSymbolFromWaypointSymbol(waypointSymbol), waypointSymbol)
      .then((market) => {
        console.log(market);
        
        store.markets.push(market)
        return market
      })
  },
  async getShipyard(waypointSymbol: string) {
    var existingShipyard = this.shipyards.find(m => m.symbol == waypointSymbol)
    if (existingShipyard) {
      return existingShipyard
    }
    await getShipyard(getSystemSymbolFromWaypointSymbol(waypointSymbol), waypointSymbol)
      .then((shipyard) => {
        store.shipyards.push(shipyard)
        return shipyard
      })
  }
})