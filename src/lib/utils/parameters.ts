import { KeyValue } from '../models/awsEvent';
interface InputAggregateParameters {
  readonly queryStringParameters?: KeyValue<string>;
  readonly multiValueQueryStringParameters?: KeyValue<ReadonlyArray<string>>;
}
export function aggregateParameters(
  input: InputAggregateParameters
): KeyValue<string | ReadonlyArray<string>> | void {
  const { queryStringParameters, multiValueQueryStringParameters } = {
    multiValueQueryStringParameters: undefined,
    queryStringParameters: undefined,
    ...input
  };
  return queryStringParameters || multiValueQueryStringParameters
    ? { ...queryStringParameters, ...multiValueQueryStringParameters }
    : undefined;
}
