# Setup Instructions

## Prerequites

- install aws-sam-cli [install instructions](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
  
## Steps

1. sam init
1. Which template source -- 1 - AWS Quick Start...
1. Choose an AWS Quick Start -- 1 - Hello World...
1. Use the most popular runtime -- N
1. Which runtime would... -- 12 - nodejs18.x
1. What package type... -- 1 - Zip
1. Select your starter template -- 2 - Hellow World Example TypeScript
1. Would you like to enable X-Ray... -- y
1. Would you like to enable monitoring using... -- y
1. Project name -- snowflake-lambda

```bash
cd snowflake-lambda/hello-world
yarn
yarn add snowflake-sdk
yarn add -D @types/snowflake-sdk
```

Add the following code to the app.ts file:

```typescript
const connection = snowflake.createConnection({
    account: 'account',
    username: 'username',
    password: 'password',
    database: 'database',
    schema: 'schema',
    warehouse: 'warehouse',
});
connection.connect(function (err, conn) {
    if (err) {
        console.error('Unable to connect: ' + err.message);
    } else {
        console.log('Successfully connected to Snowflake.');
        // Optional: store the connection ID.
        // connection_ID = conn.getId()
        console.log('conn.getId(): ', conn.getId());
    }
});
```

Replace connection parameters

Build and run:
`sam build && sam local start-api`

## Error

```bash
Mounting /Users/rondyck/Projects/SavvieMVP/testapi/snowflake-lambda/.aws-sam/build/HelloWorldFunction as /var/task:ro,delegated inside runtime container
START RequestId: 8f1f3ec3-58b0-4fff-a419-9c1ebea6f006 Version: $LATEST

<--- Last few GCs --->

[14:0x5581f876d2c0]      964 ms: Scavenge (reduce) 112.4 (123.3) -> 112.5 (117.0) MB, 3.7 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure; 
[14:0x5581f876d2c0]     1008 ms: Mark-sweep (reduce) 122.5 (126.3) -> 122.0 (124.0) MB, 29.3 / 0.0 ms  (+ 6.5 ms in 76 steps since start of marking, biggest step 6.3 ms, walltime since start of marking 97 ms) (average mu = 0.839, current mu = 0.839) alloc

<--- JS stacktrace --->

FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
 1: 0x5581f386d7c3 node::Abort() [/var/lang/bin/node]
 2: 0x5581f373db32  [/var/lang/bin/node]
 3: 0x5581f3a9290d v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [/var/lang/bin/node]
 4: 0x5581f3a92c12 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [/var/lang/bin/node]
 5: 0x5581f3ccf8e8  [/var/lang/bin/node]
 6: 0x5581f3ce24df v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [/var/lang/bin/node]
 7: 0x5581f3cb4232 v8::internal::HeapAllocator::AllocateRawWithLightRetrySlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [/var/lang/bin/node]
 8: 0x5581f3cb5513 v8::internal::HeapAllocator::AllocateRawWithRetryOrFailSlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [/var/lang/bin/node]
 9: 0x5581f3c8f3ce v8::internal::Factory::AllocateRaw(int, v8::internal::AllocationType, v8::internal::AllocationAlignment) [/var/lang/bin/node]
10: 0x5581f3c85cfb v8::internal::FactoryBase<v8::internal::Factory>::AllocateRawArray(int, v8::internal::AllocationType) [/var/lang/bin/node]
11: 0x5581f3c85ec3 v8::internal::FactoryBase<v8::internal::Factory>::NewFixedArrayWithFiller(v8::internal::Handle<v8::internal::Map>, int, v8::internal::Handle<v8::internal::Oddball>, v8::internal::AllocationType) [/var/lang/bin/node]
12: 0x5581f3c9d6dd v8::internal::Factory::NewJSArrayStorage(v8::internal::ElementsKind, int, v8::internal::ArrayStorageAllocationMode) [/var/lang/bin/node]
13: 0x5581f3c9d80e v8::internal::Factory::NewJSArray(v8::internal::ElementsKind, int, int, v8::internal::ArrayStorageAllocationMode, v8::internal::AllocationType) [/var/lang/bin/node]
14: 0x5581f3e13c91 v8::internal::JsonParser<unsigned short>::BuildJsonArray(v8::internal::JsonParser<unsigned short>::JsonContinuation const&, v8::base::SmallVector<v8::internal::Handle<v8::internal::Object>, 16ul, std::allocator<v8::internal::Handle<v8::internal::Object> > > const&) [/var/lang/bin/node]
15: 0x5581f3e1ca49 v8::internal::JsonParser<unsigned short>::ParseJsonValue() [/var/lang/bin/node]
16: 0x5581f3e1d292 v8::internal::JsonParser<unsigned short>::ParseJson() [/var/lang/bin/node]
17: 0x5581f3b364f6 v8::internal::Builtin_JsonParse(int, unsigned long*, v8::internal::Isolate*) [/var/lang/bin/node]
18: 0x5581f45e2439  [/var/lang/bin/node]
23 Jan 2023 16:34:16,330 [ERROR] (rapid) Init failed error=Runtime exited with error: signal: aborted InvokeID=
```
