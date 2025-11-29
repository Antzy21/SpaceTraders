import { apiGet, apiPost } from './apiBase.ts'
import type { Agent } from './types/agent.ts'
import type { Contract } from './types/contract.ts'
import type { ExtractionResponse } from './types/extractionResponse.ts'
import type { Market } from './types/market.ts'
import type { Resource } from './types/resource.ts'
import type { Ship } from './types/ship.ts'
import type { Shipyard } from './types/shipyard.ts'
import type { System } from './types/Location/system.ts'
import type { Waypoint } from './types/Location/waypoint.ts'

export async function getMyAgent(): Promise<Agent> {
  return await apiGet(`/my/agent`)
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function getMyShips(): Promise<Ship[]> {
  return await apiGet(`/my/ships`)
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function getWaypoint(sectorSymbol: string, waypointSymbol: string): Promise<Waypoint> {
  return await apiGet(`/systems/${sectorSymbol}/waypoints/${waypointSymbol}`)
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function getSystem(sectorSymbol: string): Promise<System> {
  return await apiGet(`/systems/${sectorSymbol}`)
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function getSystemWaypoints(sectorSymbol: string): Promise<Waypoint[]> {
  return await apiGet(`/systems/${sectorSymbol}/waypoints?limit=20`)
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function getContracts(): Promise<Contract[]> {
  return apiGet("/my/contracts")
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function acceptContract(contractId: string): Promise<void> {
  await apiPost(`/my/contracts/${contractId}/accept`)
    .then(response => response.json())
}

export async function fulfillContract(contractId: string): Promise<void> {
  await apiPost(`/my/contracts/${contractId}/fulfill`)
    .then(response => response.json())
}

export async function negotiateContract(shipSymbol: string): Promise<void> {
  await apiPost(`/my/ships/${shipSymbol}/negotiate/fulfill`)
    .then(response => response.json())
}

export async function getShipyard(systemSymbol: string, waypointSymbol: string): Promise<Shipyard> {
  return await apiGet(`/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`)
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function getMarket(systemSymbol: string, waypointSymbol: string): Promise<Market> {
  return await apiGet(`/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`)
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function buyShip(shipyardWaypoint: string, shipType: string): Promise<any> {
  return await apiPost(`/my/ships`, {
      "shipType": shipType,
      "waypointSymbol": shipyardWaypoint
    })
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function navigateShipToWaypoint(shipSymbol: string, waypointSymbol: string): Promise<any> {
  return await apiPost(`/my/ships/${shipSymbol}/navigate`, {
      "waypointSymbol": waypointSymbol
    })
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function dockShip(shipSymbol: string): Promise<any> {
  return await apiPost(`/my/ships/${shipSymbol}/dock`)
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function orbitShip(shipSymbol: string): Promise<any> {
  return await apiPost(`/my/ships/${shipSymbol}/orbit`)
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function refuelShip(shipSymbol: string): Promise<any> {
  return await apiPost(`/my/ships/${shipSymbol}/refuel`)
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function jettisonGoods(shipSymbol: string, goods: Resource, units?: number): Promise<any> {
  return await apiPost(`/my/ships/${shipSymbol}/jettison`, {
      "symbol": goods.symbol,
      "units": units ?? goods.units
    })
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function extractShip(shipSymbol: string): Promise<ExtractionResponse> {
  return await apiPost(`/my/ships/${shipSymbol}/extract`)
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function sellGoods(shipSymbol: string, goods: Resource, units?: number): Promise<any> {
  return await apiPost(`/my/ships/${shipSymbol}/sell`, {
      "symbol": goods.symbol,
      "units": units ?? goods.units
    })
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function transferCargo(fromShipSymbol: string, toShipSymbol: string, goods: Resource, units?: number): Promise<any> {
  return await apiPost(`/my/ships/${fromShipSymbol}/transfer`, {
      "tradeSymbol": goods.symbol,
      "units": units ?? goods.units,
      "shipSymbol": toShipSymbol
    })
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}

export async function deliverCargo(contractId: string, shipSymbol: string, goods: Resource, units?: number): Promise<any> {
  return await apiPost(`/my/contracts/${contractId}/deliver`, {
      "shipSymbol": shipSymbol,
      "tradeSymbol": goods.symbol,
      "units": units ?? goods.units
    })
    .then(response => response.json())
    .then(data => {
      return data.data
    })
}
