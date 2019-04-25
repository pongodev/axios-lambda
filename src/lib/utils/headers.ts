import { KeyValue } from '../models/awsEvent';
interface InputExtractHeaders {
  readonly headers?: KeyValue<string>;
  readonly multiValueHeaders?: KeyValue<ReadonlyArray<string>>;
}

function extractMultiValueHeaders(
  headers: KeyValue<ReadonlyArray<string>>
): KeyValue<string> {
  return Object.entries(headers).reduce(
    (acc, [k, v]) => ({ ...acc, [k]: v.join(', ') }),
    {}
  );
}
export function extractHeadersFromEvent(
  input: InputExtractHeaders
): KeyValue<string | ReadonlyArray<string>> {
  const { headers, multiValueHeaders } = input
    ? input
    : { headers: undefined, multiValueHeaders: undefined };
  return { ...headers, ...extractMultiValueHeaders(multiValueHeaders || {}) };
}
