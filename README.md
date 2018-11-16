# marketing.js
A highly flexible marketingchannel recognition and attribution library. Records a visitor's touchpoints, provides access to the touchpoint history and offers attribution models to operate on the recorded data.

## Usage
First we create a simple `AttributionModel` instance to be used by the engine. This is used to decide which channel(s) will get attributed to what amount. For our testcase we use the pretty common "Last Touch Model", which attributes the last touchpoint within a conversion journey.

```javascript
const model = new LastTouchAttributionModel();
```

Then we create the engine and pass our model and the marketing channel configuration.

```javascript
const engine = new AttributionEngine.init(model, [
  new SearchEngineChannel('seo', 'SEO'),
  new URLMatchingChannel('sea', 'SEA (Adwords)', 'adword', 'adword'),
]);
```

Now we are set up to get the touchpoint for the current page impression. This looks at URL, query string and referrer - depending on the types of channels in the configuration. It also adds the recognized `Touchpoint` to the internal list with the touchpoint history.

```javascript
const currentTouchpoint = engine.execute();
console.log(currentTouchpoint.getChannel().getId());
```

Finally, we can query the attributed `Touchpoint`(s) for the visitor based on our `AttributionModel` (looks at the last 30 days). Note that this method returns an array of `AttributionItem` objects because we need to provide a touchpoint and its associate `weight` on the attribution. Also we need any array here, as some attribution models may attribute multiple channels (e.g. "linear" or "time decay" models).

```javascript
const attributionItems = engine.getAttributionItems();
if (attributionItems.length > 0) {
  console.log(attributionItems[0].getTouchpoint().getChannel().getLabel())
}
```

## API
Check the code for inline JSDOC comments
