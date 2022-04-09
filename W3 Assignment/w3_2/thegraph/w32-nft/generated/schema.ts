// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal,
  Address,
} from "@graphprotocol/graph-ts";

export class TransferEntity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
    //event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    this.set("from", Value.fromBytes(Bytes.empty()));
    this.set("to", Value.fromBytes(Bytes.empty()));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("path", Value.fromBytesArray([]));
    this.set("hashPath", Value.fromBytesArray([]));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TransferEntity entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save TransferEntity entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("TransferEntity", id.toString(), this);
    }
  }

  static load(id: string): TransferEntity | null {
    return changetype<TransferEntity | null>(store.get("TransferEntity", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from(): Address {
    let value = this.get("from");
    return value!.toAddress();
  }

  set from(value: Address) {
    this.set("from", Value.fromAddress(value));
  }

  get to(): Address {
    let value = this.get("to");
    return value!.toAddress();
  }

  set to(value: Address) {
    this.set("to", Value.fromAddress(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get path(): Array<Bytes> {
    let value = this.get("path");
    return value!.toBytesArray();
  }

  set path(value: Array<Bytes>) {
    this.set("path", Value.fromBytesArray(value));
  }

  get hashPath(): Array<Bytes> {
    let value = this.get("hashPath");
    return value!.toBytesArray();
  }

  set hashPath(value: Array<Bytes>) {
    this.set("hashPath", Value.fromBytesArray(value));
  }
}
