// tslint:disable:no-expression-statement
import test from 'ava';
import { aggregateParameters } from './parameters';
test('when the function receives a null object, it returns undefined', t => {
  const input: any = null;
  t.deepEqual(aggregateParameters(input), undefined);
});
test('when queryStringParameters and multiQueryStringParameters are not provided, it returns undefined', t => {
  t.deepEqual(aggregateParameters({}), undefined);
});
test('when headers exist, it returns all headers', t => {
  const queryStringParameters = {
    multivalueName: 'me',
    name: 'me'
  };
  const expectedResult = { ...queryStringParameters };
  const result = aggregateParameters({
    queryStringParameters: { ...queryStringParameters }
  });
  t.deepEqual(result, expectedResult);
});
test('when multiValueHeaders exist, it returns all headers', t => {
  const expectedResult = {
    multivalueName: ['you', 'me'],
    name: ['me']
  };
  const multiValueQueryStringParameters = {
    multivalueName: ['you', 'me'],
    name: ['me']
  };
  const result = aggregateParameters({
    multiValueQueryStringParameters: { ...multiValueQueryStringParameters }
  });
  t.deepEqual(result, expectedResult);
});
test('when headers and multiValueHeaders exist, it returns all headers', t => {
  const queryStringParameters = {
    multivalueName1: 'me',
    name1: 'me'
  };
  const multiValueQueryStringParameters = {
    multivalueName2: ['you', 'me'],
    name2: ['me']
  };
  const expectedResult = {
    multivalueName1: 'me',
    multivalueName2: ['you', 'me'],
    name1: 'me',
    name2: ['me']
  };
  const result = aggregateParameters({
    multiValueQueryStringParameters: { ...multiValueQueryStringParameters },
    queryStringParameters: { ...queryStringParameters }
  });
  t.deepEqual(result, expectedResult);
});
