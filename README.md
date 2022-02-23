# Time

time object.

## Module

Install
```bash
npm i @bizhermit/time
```

### Example

```ts
import Time, { TimeUtils } from "@bizhermit/time";

const time = new Time();

const average = TimeUtils.average(
    new Time("4:31"),
    new Time("02:03:04"),
    new Time("36:12:40.423"),
    new Time(time),
    new Time(new Date()),
);

console.log(average.format("hh:mm:ss.SSS"));
```