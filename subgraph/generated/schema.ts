// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Company extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Company entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Company must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Company", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Company | null {
    return changetype<Company | null>(store.get_in_block("Company", id));
  }

  static load(id: string): Company | null {
    return changetype<Company | null>(store.get("Company", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string | null {
    let value = this.get("name");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set name(value: string | null) {
    if (!value) {
      this.unset("name");
    } else {
      this.set("name", Value.fromString(<string>value));
    }
  }

  get walletAddress(): Bytes {
    let value = this.get("walletAddress");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set walletAddress(value: Bytes) {
    this.set("walletAddress", Value.fromBytes(value));
  }

  get profilePhoto(): string | null {
    let value = this.get("profilePhoto");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set profilePhoto(value: string | null) {
    if (!value) {
      this.unset("profilePhoto");
    } else {
      this.set("profilePhoto", Value.fromString(<string>value));
    }
  }

  get hasToken(): boolean {
    let value = this.get("hasToken");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set hasToken(value: boolean) {
    this.set("hasToken", Value.fromBoolean(value));
  }

  get tokenName(): string | null {
    let value = this.get("tokenName");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set tokenName(value: string | null) {
    if (!value) {
      this.unset("tokenName");
    } else {
      this.set("tokenName", Value.fromString(<string>value));
    }
  }
}

export class Eco extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Eco entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Eco must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Eco", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Eco | null {
    return changetype<Eco | null>(store.get_in_block("Eco", id));
  }

  static load(id: string): Eco | null {
    return changetype<Eco | null>(store.get("Eco", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get company1Address(): Bytes {
    let value = this.get("company1Address");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set company1Address(value: Bytes) {
    this.set("company1Address", Value.fromBytes(value));
  }

  get company2Address(): Bytes {
    let value = this.get("company2Address");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set company2Address(value: Bytes) {
    this.set("company2Address", Value.fromBytes(value));
  }

  get isIncluded(): boolean {
    let value = this.get("isIncluded");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set isIncluded(value: boolean) {
    this.set("isIncluded", Value.fromBoolean(value));
  }
}
