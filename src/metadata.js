// vim: ts=2:sw=2
//-----------------------------------------------------------------------------
// metadata.js - convert traits into compatible metadata
//-----------------------------------------------------------------------------

const hashToMetadata = (hash, state) => {

  const {
    seed,
    shape,
    color
  } = hashToTraits(hash);

  //
  // Note traits returned as strings / numbers / bools are all treated slightly
  //  differently by OpenSea.
  //
  // Please refer to their documentation:
  //   https://docs.opensea.io/docs/metadata-standards
  //

  return [{
      trait_type: "Shape",
      value: shape
    }, {
      trait_type: "Color",
      value: color,
    }, { 
      trait_type: "Line Width",
      value: state.width
  }];

};
