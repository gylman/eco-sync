import { ByteArray, crypto } from "@graphprotocol/graph-ts";
import { CompanyAdded, EcosystemUpdated } from "../generated/Contract/Contract";
import { Company, Eco } from "../generated/schema";

export function handleCompanyAdded(event: CompanyAdded): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let company = Company.load(event.transaction.from.toHexString());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!company) {
    company = new Company(event.transaction.from.toHexString());
  }

  company.name = event.params.name;
  company.walletAddress = event.params.walletAddress;
  company.profilePhoto = event.params.profilePhoto;
  company.tokenName = event.params.tokenName;
  company.description = event.params.description;
  company.includeCount = 0;
  company.includedByCount = 0;

  company.save();
}

export function handleEcosystemUpdated(event: EcosystemUpdated): void {
  let id = crypto
    .keccak256(
      ByteArray.fromHexString(event.params.company1.toHexString()).concat(
        ByteArray.fromHexString(event.params.company2.toHexString())
      )
    )
    .toHexString();
  let eco = Eco.load(id);

  if (!eco) {
    eco = new Eco(id);
  }

  eco.company1Address = event.params.company1;
  eco.company2Address = event.params.company2;
  eco.isIncluded = event.params.isPartnership;

  if (event.params.isPartnership) {
    let company1 = Company.load(event.params.company1.toHexString());
    let company2 = Company.load(event.params.company2.toHexString());

    if (company1) {
      company1.includeCount = company1.includeCount + 1;
      company1.save();
    }

    if (company2) {
      company2.includedByCount = company2.includedByCount + 1;
      company2.save();
    }
  } else {
    let company1 = Company.load(event.params.company1.toHexString());
    let company2 = Company.load(event.params.company2.toHexString());

    if (company1) {
      company1.includeCount = company1.includeCount - 1;
      company1.save();
    }

    if (company2) {
      company2.includedByCount = company2.includedByCount - 1;
      company2.save();
    }
  }

  eco.save();
}
