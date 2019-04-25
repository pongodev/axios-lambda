// tslint:disable:no-expression-statement
import test from 'ava';
import { extractHeadersFromEvent } from './headers';

test('when the function receives a null object, it returns an empty object', t => {
  const input: any = null;
  t.deepEqual(extractHeadersFromEvent(input), {});
});
test('when headers and multiValueHeaders are not provided, it returns an empty object', t => {
  t.deepEqual(extractHeadersFromEvent({}), {});
});
test('when headers exist, it returns all headers', t => {
  const headers = {
    headerName1: 'headerValue1',
    headerName2: 'headerValue2',
    headerName3: 'headerValue3'
  };
  const expectedResult = { ...headers };
  const result = extractHeadersFromEvent({
    headers: { ...headers }
  });
  t.deepEqual(result, expectedResult);
});
test('when multiValueHeaders exist, it returns all headers', t => {
  const expectedResult = {
    headerName1: 'headerValue1_1, headerValue1_2, headerValue1_3',
    headerName2: '',
    headerName3: 'headerValue3_1'
  };
  const multiValueHeaders = {
    headerName1: ['headerValue1_1', 'headerValue1_2', 'headerValue1_3'],
    headerName2: [],
    headerName3: ['headerValue3_1']
  };
  const result = extractHeadersFromEvent({
    multiValueHeaders: { ...multiValueHeaders }
  });
  t.deepEqual(result, expectedResult);
});
test('when headers and multiValueHeaders exist, it returns all headers', t => {
  const headers = {
    headerName1: 'headerValue1',
    headerName2: 'headerValue2',
    headerName3: 'headerValue3'
  };
  const multiValueHeaders = {
    headerName4: ['headerValue1_1', 'headerValue1_2', 'headerValue1_3'],
    headerName5: [],
    headerName6: ['headerValue3_1']
  };
  const expectedResult = {
    headerName1: 'headerValue1',
    headerName2: 'headerValue2',
    headerName3: 'headerValue3',
    headerName4: 'headerValue1_1, headerValue1_2, headerValue1_3',
    headerName5: '',
    headerName6: 'headerValue3_1'
  };
  const result = extractHeadersFromEvent({
    headers: { ...headers },
    multiValueHeaders: { ...multiValueHeaders }
  });
  t.deepEqual(result, expectedResult);
});
