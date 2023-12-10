import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  CompanyAdded,
  EcosystemUpdated,
  Exclude,
  Include,
  IncludeeStatusUpdate
} from "../generated/Contract/Contract"

export function createCompanyAddedEvent(
  walletAddress: Address,
  name: string
): CompanyAdded {
  let companyAddedEvent = changetype<CompanyAdded>(newMockEvent())

  companyAddedEvent.parameters = new Array()

  companyAddedEvent.parameters.push(
    new ethereum.EventParam(
      "walletAddress",
      ethereum.Value.fromAddress(walletAddress)
    )
  )
  companyAddedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return companyAddedEvent
}

export function createEcosystemUpdatedEvent(
  company1: Address,
  company2: Address,
  isPartnership: boolean
): EcosystemUpdated {
  let ecosystemUpdatedEvent = changetype<EcosystemUpdated>(newMockEvent())

  ecosystemUpdatedEvent.parameters = new Array()

  ecosystemUpdatedEvent.parameters.push(
    new ethereum.EventParam("company1", ethereum.Value.fromAddress(company1))
  )
  ecosystemUpdatedEvent.parameters.push(
    new ethereum.EventParam("company2", ethereum.Value.fromAddress(company2))
  )
  ecosystemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "isPartnership",
      ethereum.Value.fromBoolean(isPartnership)
    )
  )

  return ecosystemUpdatedEvent
}

export function createExcludeEvent(
  includer: Address,
  includee: Address
): Exclude {
  let excludeEvent = changetype<Exclude>(newMockEvent())

  excludeEvent.parameters = new Array()

  excludeEvent.parameters.push(
    new ethereum.EventParam("includer", ethereum.Value.fromAddress(includer))
  )
  excludeEvent.parameters.push(
    new ethereum.EventParam("includee", ethereum.Value.fromAddress(includee))
  )

  return excludeEvent
}

export function createIncludeEvent(
  includer: Address,
  includee: Address
): Include {
  let includeEvent = changetype<Include>(newMockEvent())

  includeEvent.parameters = new Array()

  includeEvent.parameters.push(
    new ethereum.EventParam("includer", ethereum.Value.fromAddress(includer))
  )
  includeEvent.parameters.push(
    new ethereum.EventParam("includee", ethereum.Value.fromAddress(includee))
  )

  return includeEvent
}

export function createIncludeeStatusUpdateEvent(
  observer: Address,
  includedCompany: Address,
  otherParty: Address,
  included: boolean
): IncludeeStatusUpdate {
  let includeeStatusUpdateEvent = changetype<IncludeeStatusUpdate>(
    newMockEvent()
  )

  includeeStatusUpdateEvent.parameters = new Array()

  includeeStatusUpdateEvent.parameters.push(
    new ethereum.EventParam("observer", ethereum.Value.fromAddress(observer))
  )
  includeeStatusUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "includedCompany",
      ethereum.Value.fromAddress(includedCompany)
    )
  )
  includeeStatusUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "otherParty",
      ethereum.Value.fromAddress(otherParty)
    )
  )
  includeeStatusUpdateEvent.parameters.push(
    new ethereum.EventParam("included", ethereum.Value.fromBoolean(included))
  )

  return includeeStatusUpdateEvent
}
