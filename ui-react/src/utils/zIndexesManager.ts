const maxZIndexUsedByReactBootstrap = 10000;

type ZIndexLayers = 'modal' | 'offcanvas';

let zIndexes: Record<ZIndexLayers, number>;

const makeZIndexes = (layers: ZIndexLayers[]) => {
  return layers.reduce((prevValue, layerName, index) => {
    prevValue[layerName] = (index + 1) * maxZIndexUsedByReactBootstrap;
    return prevValue;
  }, {} as Record<ZIndexLayers, number>);
};

export const getZIndexes = () => {
  if (!zIndexes) {
    zIndexes = makeZIndexes(['modal', 'offcanvas']);
  }

  return zIndexes;
};
