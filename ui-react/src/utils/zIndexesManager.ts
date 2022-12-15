
export let zIndexes:any;

const makeZIndexes = (layers: string[]) =>
  layers.reduce((prevValue, layerName, index) => {
     //@ts-ignore
    prevValue[layerName] = (index + 1) * 10000;
    return prevValue;
  }, {});

export const getZIndexes = () => {
  if (!zIndexes) {
    zIndexes = makeZIndexes(["modal", "offcanvas"]);
  }

  return zIndexes;
};
