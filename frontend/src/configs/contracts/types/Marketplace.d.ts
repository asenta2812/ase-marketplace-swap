/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface MarketplaceInterface extends ethers.utils.Interface {
  functions: {
    "addOrder(uint256,address,uint256)": FunctionFragment;
    "addPaymentToken(address)": FunctionFragment;
    "cancelOrder(uint256)": FunctionFragment;
    "executeOrder(uint256)": FunctionFragment;
    "feeDecimal()": FunctionFragment;
    "feeRate()": FunctionFragment;
    "feeRecipient()": FunctionFragment;
    "isPaymentTokenSupported(address)": FunctionFragment;
    "isSeller(uint256,address)": FunctionFragment;
    "nftContract()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateFeeRate(uint256,uint256)": FunctionFragment;
    "updateFeeRecipient(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addOrder",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addPaymentToken",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelOrder",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "executeOrder",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "feeDecimal",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "feeRate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "feeRecipient",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isPaymentTokenSupported",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isSeller",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "nftContract",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateFeeRate",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateFeeRecipient",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "addOrder", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addPaymentToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "feeDecimal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeRate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPaymentTokenSupported",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isSeller", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nftContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateFeeRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateFeeRecipient",
    data: BytesLike
  ): Result;

  events: {
    "FeeRateUpdated(uint256,uint256)": EventFragment;
    "OrderAdded(uint256,address,uint256,address,uint256)": EventFragment;
    "OrderCancelled(uint256)": EventFragment;
    "OrderMatched(uint256,address,address,uint256,address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FeeRateUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderMatched"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type FeeRateUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber] & { feeDecimal: BigNumber; feeRate: BigNumber }
>;

export type OrderAddedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string, BigNumber] & {
    orderId: BigNumber;
    seller: string;
    tokenID: BigNumber;
    paymentToken: string;
    price: BigNumber;
  }
>;

export type OrderCancelledEvent = TypedEvent<
  [BigNumber] & { orderId: BigNumber }
>;

export type OrderMatchedEvent = TypedEvent<
  [BigNumber, string, string, BigNumber, string, BigNumber] & {
    orderId: BigNumber;
    seller: string;
    buyer: string;
    tokenID: BigNumber;
    paymentToken: string;
    price: BigNumber;
  }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export class Marketplace extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MarketplaceInterface;

  functions: {
    addOrder(
      tokenID_: BigNumberish,
      paymentToken_: string,
      price_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addPaymentToken(
      paymentToken_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    cancelOrder(
      orderID_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    executeOrder(
      orderID_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    feeDecimal(overrides?: CallOverrides): Promise<[BigNumber]>;

    feeRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    feeRecipient(overrides?: CallOverrides): Promise<[string]>;

    isPaymentTokenSupported(
      paymentToken_: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isSeller(
      orderID_: BigNumberish,
      seller_: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    nftContract(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateFeeRate(
      feeDecimal_: BigNumberish,
      feeRate_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateFeeRecipient(
      feeRecipient_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addOrder(
    tokenID_: BigNumberish,
    paymentToken_: string,
    price_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addPaymentToken(
    paymentToken_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  cancelOrder(
    orderID_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  executeOrder(
    orderID_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  feeDecimal(overrides?: CallOverrides): Promise<BigNumber>;

  feeRate(overrides?: CallOverrides): Promise<BigNumber>;

  feeRecipient(overrides?: CallOverrides): Promise<string>;

  isPaymentTokenSupported(
    paymentToken_: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isSeller(
    orderID_: BigNumberish,
    seller_: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  nftContract(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateFeeRate(
    feeDecimal_: BigNumberish,
    feeRate_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateFeeRecipient(
    feeRecipient_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addOrder(
      tokenID_: BigNumberish,
      paymentToken_: string,
      price_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    addPaymentToken(
      paymentToken_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    cancelOrder(
      orderID_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    executeOrder(
      orderID_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    feeDecimal(overrides?: CallOverrides): Promise<BigNumber>;

    feeRate(overrides?: CallOverrides): Promise<BigNumber>;

    feeRecipient(overrides?: CallOverrides): Promise<string>;

    isPaymentTokenSupported(
      paymentToken_: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isSeller(
      orderID_: BigNumberish,
      seller_: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    nftContract(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateFeeRate(
      feeDecimal_: BigNumberish,
      feeRate_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateFeeRecipient(
      feeRecipient_: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "FeeRateUpdated(uint256,uint256)"(
      feeDecimal?: null,
      feeRate?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { feeDecimal: BigNumber; feeRate: BigNumber }
    >;

    FeeRateUpdated(
      feeDecimal?: null,
      feeRate?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { feeDecimal: BigNumber; feeRate: BigNumber }
    >;

    "OrderAdded(uint256,address,uint256,address,uint256)"(
      orderId?: BigNumberish | null,
      seller?: string | null,
      tokenID?: BigNumberish | null,
      paymentToken?: null,
      price?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, string, BigNumber],
      {
        orderId: BigNumber;
        seller: string;
        tokenID: BigNumber;
        paymentToken: string;
        price: BigNumber;
      }
    >;

    OrderAdded(
      orderId?: BigNumberish | null,
      seller?: string | null,
      tokenID?: BigNumberish | null,
      paymentToken?: null,
      price?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, string, BigNumber],
      {
        orderId: BigNumber;
        seller: string;
        tokenID: BigNumber;
        paymentToken: string;
        price: BigNumber;
      }
    >;

    "OrderCancelled(uint256)"(
      orderId?: null
    ): TypedEventFilter<[BigNumber], { orderId: BigNumber }>;

    OrderCancelled(
      orderId?: null
    ): TypedEventFilter<[BigNumber], { orderId: BigNumber }>;

    "OrderMatched(uint256,address,address,uint256,address,uint256)"(
      orderId?: BigNumberish | null,
      seller?: string | null,
      buyer?: string | null,
      tokenID?: null,
      paymentToken?: null,
      price?: null
    ): TypedEventFilter<
      [BigNumber, string, string, BigNumber, string, BigNumber],
      {
        orderId: BigNumber;
        seller: string;
        buyer: string;
        tokenID: BigNumber;
        paymentToken: string;
        price: BigNumber;
      }
    >;

    OrderMatched(
      orderId?: BigNumberish | null,
      seller?: string | null,
      buyer?: string | null,
      tokenID?: null,
      paymentToken?: null,
      price?: null
    ): TypedEventFilter<
      [BigNumber, string, string, BigNumber, string, BigNumber],
      {
        orderId: BigNumber;
        seller: string;
        buyer: string;
        tokenID: BigNumber;
        paymentToken: string;
        price: BigNumber;
      }
    >;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    addOrder(
      tokenID_: BigNumberish,
      paymentToken_: string,
      price_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addPaymentToken(
      paymentToken_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    cancelOrder(
      orderID_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    executeOrder(
      orderID_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    feeDecimal(overrides?: CallOverrides): Promise<BigNumber>;

    feeRate(overrides?: CallOverrides): Promise<BigNumber>;

    feeRecipient(overrides?: CallOverrides): Promise<BigNumber>;

    isPaymentTokenSupported(
      paymentToken_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isSeller(
      orderID_: BigNumberish,
      seller_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nftContract(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateFeeRate(
      feeDecimal_: BigNumberish,
      feeRate_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateFeeRecipient(
      feeRecipient_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addOrder(
      tokenID_: BigNumberish,
      paymentToken_: string,
      price_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addPaymentToken(
      paymentToken_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    cancelOrder(
      orderID_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    executeOrder(
      orderID_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    feeDecimal(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feeRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feeRecipient(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isPaymentTokenSupported(
      paymentToken_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isSeller(
      orderID_: BigNumberish,
      seller_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nftContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateFeeRate(
      feeDecimal_: BigNumberish,
      feeRate_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateFeeRecipient(
      feeRecipient_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
