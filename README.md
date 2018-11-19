# marketing.js

[![Build Status](https://dev.azure.com/ricopfaus/marketing.js/_apis/build/status/ryx.marketing.js)](https://dev.azure.com/ricopfaus/marketing.js/_build/latest?definitionId=1)
[![npm version](https://badge.fury.io/js/marketing.js.svg)](https://badge.fury.io/js/marketing.js)

A highly flexible marketingchannel recognition and attribution library. Records a visitor's touchpoints, provides access to the touchpoint history and offers attribution models to operate on the recorded data.

## Usage
Install the library from npm as usual. It has no external dependencies and should work in all modern browsers.

    npm install marketing.js

Load the library in your preferred style, this example uses ES6 imports as they meanwhile tend to be the new de-facto standard. Since the engine alone is pretty useless we load the engine, an attribution model, and some channel handlers in our example.

```javascript
import {
  AttributionEngine,
  LastTouchAttributionModel,
  SearchEngineChannel,
  URLMatchingChannel,
} from 'marketing.js';
```

After that, create a simple `AttributionModel` instance. This is used to decide which channel(s) will get attributed to what amount. For our testcase we use the pretty common "Last Touch Model", which attributes the last touchpoint within a conversion journey.

```javascript
const model = new LastTouchAttributionModel();
```

Then we create the engine and pass our model and the marketing channel configuration. The channel configuration - when seen from a technical perspective - is quite simple and straightforward. It simply defines a set of rules that are executed sequentially to match against certain environment criteria. Nevertheless the entire business logic around marketing channels and attribution handling can be quite complex and requires a bit of background knowledge.

```javascript
const engine = new AttributionEngine(model, [
  new SearchEngineChannel('seo', 'SEO'),
  new URLMatchingChannel('sea', 'SEA (Adwords)', 'adword', 'adword'),
]);
```

However, we are now set up to get the touchpoint for the current page impression ba calling the engine's `execute` method. This looks at URL, query string and referrer (depending on the types of channels in the configuration) and performs the channel recognition. It also adds the recognized `Touchpoint` to the internal list with the touchpoint history.

```javascript
const currentTouchpoint = engine.execute();
console.log(currentTouchpoint.getChannel().getId());
```

Finally, we can query the attributed `Touchpoint`(s) for the visitor based on our chosen `LastTouchAttributionModel` (looks at the single winning channel within the last 30 days). Note that this method returns an array of `AttributionItem` objects because we need to provide a `Touchpoint` and its associate `weight` on the attribution. Also we need any array here, as some attribution models may attribute multiple channels (e.g. "linear" or "time decay" models).

```javascript
const attributionItems = engine.getAttributionItems();
if (attributionItems.length > 0) {
  console.log(attributionItems[0].getTouchpoint().getChannel().getLabel())
}
```

The above code is just a convenience handler to allow calling `AttributionModel.execute` without explictly accessing the model. We could also directly call the `execute` method on the model and pass the engine's touchpoint history instead:

```javascript
const attributionItems = model.execute(engine.getTouchpointHistory());
```

## API
Check the code for inline JSDOC comments
