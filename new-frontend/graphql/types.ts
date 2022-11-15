import { GraphQLResolveInfo } from 'graphql';
import { User as UserModel } from '@prisma/client';
import { GraphQLContext } from '../pages/api/index';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  requestNonce?: Maybe<RequestNonceOutput>;
  verifySignature?: Maybe<VerifySignatureOutput>;
};


export type MutationRequestNonceArgs = {
  input: RequestNonceInput;
};


export type MutationVerifySignatureArgs = {
  input: VerifySignatureInput;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export type RequestNonceInput = {
  address: Scalars['String'];
};

export type RequestNonceOutput = {
  __typename?: 'RequestNonceOutput';
  address: Scalars['String'];
  nonce: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  accessToken?: Maybe<Scalars['String']>;
  address: Scalars['String'];
  avatar: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  nonce?: Maybe<Scalars['Int']>;
};

export type VerifySignatureInput = {
  address: Scalars['String'];
  nonce: Scalars['Int'];
  signature: Scalars['String'];
};

export type VerifySignatureOutput = {
  __typename?: 'VerifySignatureOutput';
  accessToken: Scalars['String'];
  nonce: Scalars['Int'];
};

export type UserAttributesFragment = { __typename?: 'User', name?: string | null, avatar: string, address: string, accessToken?: string | null, nonce?: number | null };

export type RequestNonceMutationVariables = Exact<{
  input: RequestNonceInput;
}>;


export type RequestNonceMutation = { __typename?: 'Mutation', requestNonce?: { __typename?: 'RequestNonceOutput', nonce: number, address: string } | null };

export type VerifySignatureMutationVariables = Exact<{
  input: VerifySignatureInput;
}>;


export type VerifySignatureMutation = { __typename?: 'Mutation', verifySignature?: { __typename?: 'VerifySignatureOutput', accessToken: string, nonce: number } | null };

export type UserQueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQueryQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', name?: string | null, avatar: string, address: string, accessToken?: string | null, nonce?: number | null } | null };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RequestNonceInput: RequestNonceInput;
  RequestNonceOutput: ResolverTypeWrapper<RequestNonceOutput>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<UserModel>;
  VerifySignatureInput: VerifySignatureInput;
  VerifySignatureOutput: ResolverTypeWrapper<VerifySignatureOutput>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  RequestNonceInput: RequestNonceInput;
  RequestNonceOutput: RequestNonceOutput;
  String: Scalars['String'];
  User: UserModel;
  VerifySignatureInput: VerifySignatureInput;
  VerifySignatureOutput: VerifySignatureOutput;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  requestNonce?: Resolver<Maybe<ResolversTypes['RequestNonceOutput']>, ParentType, ContextType, RequireFields<MutationRequestNonceArgs, 'input'>>;
  verifySignature?: Resolver<Maybe<ResolversTypes['VerifySignatureOutput']>, ParentType, ContextType, RequireFields<MutationVerifySignatureArgs, 'input'>>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
};

export type RequestNonceOutputResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['RequestNonceOutput'] = ResolversParentTypes['RequestNonceOutput']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifySignatureOutputResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['VerifySignatureOutput'] = ResolversParentTypes['VerifySignatureOutput']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RequestNonceOutput?: RequestNonceOutputResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VerifySignatureOutput?: VerifySignatureOutputResolvers<ContextType>;
};


export const UserAttributesFragmentDoc = gql`
    fragment userAttributes on User {
  name
  avatar
  address
  accessToken
  nonce
}
    `;
export const RequestNonceDocument = gql`
    mutation RequestNonce($input: RequestNonceInput!) {
  requestNonce(input: $input) {
    nonce
    address
  }
}
    `;
export type RequestNonceMutationFn = Apollo.MutationFunction<RequestNonceMutation, RequestNonceMutationVariables>;

/**
 * __useRequestNonceMutation__
 *
 * To run a mutation, you first call `useRequestNonceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestNonceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestNonceMutation, { data, loading, error }] = useRequestNonceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestNonceMutation(baseOptions?: Apollo.MutationHookOptions<RequestNonceMutation, RequestNonceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestNonceMutation, RequestNonceMutationVariables>(RequestNonceDocument, options);
      }
export type RequestNonceMutationHookResult = ReturnType<typeof useRequestNonceMutation>;
export type RequestNonceMutationResult = Apollo.MutationResult<RequestNonceMutation>;
export type RequestNonceMutationOptions = Apollo.BaseMutationOptions<RequestNonceMutation, RequestNonceMutationVariables>;
export const VerifySignatureDocument = gql`
    mutation VerifySignature($input: VerifySignatureInput!) {
  verifySignature(input: $input) {
    accessToken
    nonce
  }
}
    `;
export type VerifySignatureMutationFn = Apollo.MutationFunction<VerifySignatureMutation, VerifySignatureMutationVariables>;

/**
 * __useVerifySignatureMutation__
 *
 * To run a mutation, you first call `useVerifySignatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifySignatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifySignatureMutation, { data, loading, error }] = useVerifySignatureMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifySignatureMutation(baseOptions?: Apollo.MutationHookOptions<VerifySignatureMutation, VerifySignatureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifySignatureMutation, VerifySignatureMutationVariables>(VerifySignatureDocument, options);
      }
export type VerifySignatureMutationHookResult = ReturnType<typeof useVerifySignatureMutation>;
export type VerifySignatureMutationResult = Apollo.MutationResult<VerifySignatureMutation>;
export type VerifySignatureMutationOptions = Apollo.BaseMutationOptions<VerifySignatureMutation, VerifySignatureMutationVariables>;
export const UserQueryDocument = gql`
    query UserQuery($id: ID!) {
  getUser(id: $id) {
    ...userAttributes
  }
}
    ${UserAttributesFragmentDoc}`;

/**
 * __useUserQueryQuery__
 *
 * To run a query within a React component, call `useUserQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQueryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQueryQuery(baseOptions: Apollo.QueryHookOptions<UserQueryQuery, UserQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQueryQuery, UserQueryQueryVariables>(UserQueryDocument, options);
      }
export function useUserQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQueryQuery, UserQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQueryQuery, UserQueryQueryVariables>(UserQueryDocument, options);
        }
export type UserQueryQueryHookResult = ReturnType<typeof useUserQueryQuery>;
export type UserQueryLazyQueryHookResult = ReturnType<typeof useUserQueryLazyQuery>;
export type UserQueryQueryResult = Apollo.QueryResult<UserQueryQuery, UserQueryQueryVariables>;