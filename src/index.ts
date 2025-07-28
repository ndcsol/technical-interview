#!/usr/bin/env ts-node
import { Temporal } from 'temporal-polyfill'
import { getDuffelFetchClient } from './axios';

async function main(): Promise<void> {
  const origin = process.argv[2];
  const destination = process.argv[3];
  let slices;
  slices = (await getDuffelFetchClient().post('offer_requests', {
    "data": {
      "slices": [
        {
          "origin": origin,
          "destination": destination,
          "departure_date": Temporal.Now.plainDateISO().add({ days: 7 }).toString().replace(/-/g, '-')
        },
        {
          "origin": destination,
          "destination": origin,
          "departure_date": Temporal.Now.plainDateISO().add({ days: 14 }).toString().replace(/-/g, '-')
        }
      ],
      "passengers": [{ "type": "adult" }, { "type": "adult" }, { "age": 1 }],
      "cabin_class": "business"
    }
  })).data.data;
}


if (require.main === module) {
  main();
}
