// tslint:disable:no-expression-statement
// tslint:disable: no-let
// tslint:disable: no-object-mutation
import test from 'ava';
import moxios from 'moxios';
import { axiosLambda, OptionalAxiosLambdaConfiguration } from './axiosLambda';
import { AwsEvent } from './models/awsEvent';
let event: AwsEvent;
let url: string;
let config: OptionalAxiosLambdaConfiguration;
test.serial.beforeEach(() => {
  event = {} as any;
  url = null as any;
  config = {};
  moxios.install();
});
test.serial('when event is not provided', async t => {
  await t.throwsAsync(
    async () => {
      return axiosLambda(event, url, config);
    },
    { instanceOf: TypeError }
  );
});
test.serial('when an url and method are provided', async t => {
  url = 'http://axioslambda.com';
  const data = { a: 'asd' };
  moxios.stubRequest(url, { responseText: { ...data } as any, status: 200 });
  event = { ...event, httpMethod: 'get' };
  const result = await axiosLambda(event, url, config);
  t.deepEqual(result.data, data);
});
test.serial(
  'when an we send an url and method, it calls correctly the axios',
  async t => {
    url = 'http://axioslambda.com';
    const data = { a: 'asd' };
    moxios.stubRequest(url, { responseText: { ...data } as any, status: 200 });
    event = { ...event, httpMethod: 'get' };
    const result = await axiosLambda(event, url, config);
    const request = moxios.requests.mostRecent();
    t.is(request.url, url);
    t.is(request.config.method, 'get');
    t.deepEqual(result.data, data);
  }
);
test.serial(
  'when an we send all arguments, it calls correctly the axios',
  async t => {
    url = 'https://axioslambda.com';
    const body = "{ 'a': 'b' }";
    const headers = { 'X-Authorization': 'Bearer ABC' };
    const multiValueHeaders = { Names: ['Jose', 'Alex'] };
    const queryStringParameters = {
      multivalueName1: 'me',
      name1: 'me'
    };
    const multiValueQueryStringParameters = {
      multivalueName2: ['you', 'me'],
      name2: ['me']
    };
    event = {
      ...event,
      body,
      headers,
      httpMethod: 'post',
      multiValueHeaders,
      multiValueQueryStringParameters,
      queryStringParameters
    };
    const host = 'axioslambda.com';
    config = { ...config, host };
    const data = { a: 'asd' };
    moxios.stubRequest(
      'https://axioslambda.com?multivalueName1=me&name1=me&multivalueName2[]=you&multivalueName2[]=me&name2[]=me',
      {
        responseText: { ...data } as any,
        status: 200
      }
    );
    const promise = axiosLambda(event, url, config);
    t.notThrowsAsync(promise);
    const result = await promise;
    const request = moxios.requests.mostRecent();
    t.truthy(request.config.httpsAgent);
    t.is(
      request.url,
      'https://axioslambda.com?multivalueName1=me&name1=me&multivalueName2[]=you&multivalueName2[]=me&name2[]=me'
    );
    t.is(request.config.method, 'post');
    t.is(request.config.headers['X-Authorization'], 'Bearer ABC');
    t.is(request.config.headers.Names, 'Jose, Alex');
    t.is(request.config.headers.HOST, host);
    t.deepEqual(result.data, data);
    t.pass();
  }
);
test.serial.afterEach(() => {
  moxios.uninstall();
});
