export interface KeyValue<T> {
  readonly [key: string]: T;
}
export interface AwsEvent {
  readonly headers: KeyValue<string>;
  readonly multiValueHeaders: KeyValue<ReadonlyArray<string>>;
  readonly httpMethod: string;
  readonly path: string;
  readonly queryStringParameters: KeyValue<string>;
  readonly multiValueQueryStringParameters: KeyValue<ReadonlyArray<string>>;
  readonly body: string;
}
