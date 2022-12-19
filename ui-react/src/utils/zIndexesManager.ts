const maxZIndexUsedByReactBootsrap = 10000;

type ZIndexLayers = "modal" | "offcanvas";

export let zIndexes: Record<ZIndexLayers, number>;

const makeZIndexes = <T extends ZIndexLayers>(layers: T[]) => {
  return layers.reduce((prevValue, layerName, index) => {
    prevValue[layerName] = (index + 1) * maxZIndexUsedByReactBootsrap;
    return prevValue;
  }, {} as Record<T, number>);
};

export const getZIndexes = () => {
  if (!zIndexes) {
    zIndexes = makeZIndexes(["modal", "offcanvas"]);
  }

  return zIndexes;
};
